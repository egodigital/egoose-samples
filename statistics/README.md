# egoose-samples :: statistics

Examples, that show how to use the statistic framework.

## API

That section shows the implementation of a [statistic provider](https://egodigital.github.io/egoose/classes/_statistics_index_.statisticproviderbase.html), with the registration of an [Express](https://expressjs.com/) API endpoint.

First create a class of a [statistic provider](https://egodigital.github.io/egoose/classes/_statistics_index_.statisticproviderbase.html):

```typescript
import * as egoose from '@egodigital/egoose';

export class MyStatisticProvider extends egoose.StatisticProviderBase {
    protected async loadInner(opts: egoose.StatisticOptions, result: egoose.StatisticResult): Promise<void> {
        // fill 'result' with data
        // 
        // s. https://egodigital.github.io/egoose/interfaces/_statistics_index_.statisticresult.html

        result.rows.push({
            'user': {
                'id': 5979,
                'name': 'Tanja',
                'dob': '1979-09-05',
            },
            'company': {
                'name': 'e.GO Digital',
            }
        }, {
            'user': {
                'id': 23979,
                'name': 'Marcel',
                'dob': '1979-09-23',
            },
            'company': {
                'name': 'e.GO Digital',
            }
        });
    }
}
```

In the next step, implement a factory function, which creates a provider instance by name:

```typescript
/**
 * Creates a statistic provider instance by name.
 * 
 * @param {string} name The name from API endpoint.
 * 
 * @return {egoose.StatisticProvider|false} The instance or (false) if no matching has been found.
 */
export function createStatisticProvider(name: string): egoose.StatisticProvider | false {
    switch (name) {
        case 'mystatistics':
            return new MyStatisticProvider();
    }

    return false;  // no matching found
}
```

Now you are able to register the API endpoint for your [Express](https://expressjs.com/) host instance:

```typescript
//  /stats/:name
egoose.registerStatisticsEndpoint(
    app,  // an Express instance, or a router
    {
        // this is called at first
        // to check if calling client is authorized
        authorizer: async (ctx: egoose.StatisticApiContext) => {
            // ctx => https://egodigital.github.io/egoose/interfaces/_apis_statistics_.statisticapicontext.html

            // (true), if authorized; otherwise (false)
            return true;
        },

        providerDetector: (name: string, ctx: egoose.StatisticApiContext) => {
            // ctx => https://egodigital.github.io/egoose/interfaces/_apis_statistics_.statisticapicontext.html

            return createStatisticProvider(name);
        },
    }
);
```

A GET call of `/stats/mystatistics` would produce a result like that:

```json
{
    "data": {
        "hasMore": false,
        "offset": 0,
        "rows": [{
            "user": {
                "id": 5979,
                "name": "Tanja",
                "dob": "1979-09-05"
            },
            "company": {
                "name": "e.GO Digital GmbH"
            }
        }, {
            "user": {
                "id": 23979,
                "name": "Marcel",
                "dob": "1979-09-23"
            },
            "company": {
                "name": "e.GO Digital GmbH",
            }
        }],
        "totalCount": 2
    },
    "errors": [],
    "success": true
}
```

### MongoDB

If your provider loads its data from a [MongoDB](https://www.mongodb.com/), you can use [MongoDatabaseStatisticProviderBase](https://egodigital.github.io/egoose/classes/_mongo_statistics_.mongodatabasestatisticproviderbase.html) as base class instead:

```typescript
import * as egoose from '@egodigital/egoose';

export class MyStatisticProvider extends statistics.MongoDatabaseStatisticProviderBase {
    protected async loadInner(opts: egoose.StatisticOptions, result: egoose.StatisticResult): Promise<void> {
        // the database instance can be accessed via
        // 'this.database'
        // 
        // s. https://egodigital.github.io/egoose/classes/_mongo_index_.mongodatabase.html
    }
}
```

Add a `db` parameter to your `createStatisticProvider()` function:

```typescript
/**
 * Creates a statistic provider instance by name.
 * 
 * @param {string} name The name from API endpoint.
 * @param {egoose.MongoDatabase} db The database connection.
 * 
 * @return {egoose.StatisticProvider|false} The instance or (false) if no matching has been found.
 */
export function createStatisticProvider(name: string, db: egoose.MongoDatabase): egoose.StatisticProvider | false {
    switch (name) {
        case 'mystatistics':
            return new MyStatisticProvider( db );
    }

    return false;  // no matching found
}
```

To use it with an API endpoint, you have to modify the execution arguments of `registerStatisticsEndpoint()` function:

```typescript
//  /stats/:name
egoose.registerStatisticsEndpoint(
    app,  // an Express instance, or a router
    {
        // this is called at first time
        // to check if calling client is authorized
        authorizer: async (ctx: egoose.StatisticApiContext) => {
            // ctx => https://egodigital.github.io/egoose/interfaces/_apis_statistics_.statisticapicontext.html

            const DB = new egoose.MongoDatabase(
                /* s. https://egodigital.github.io/egoose/interfaces/_mongo_index_.mongodatabaseoptions.html */
            );
            await DB.connect();

            // share database connection, with
            // upcoming callbacks
            ctx.value = DB;
            return true;
        },

        providerDetector: (name: string, ctx: egoose.StatisticApiContext) => {
            // ctx => https://egodigital.github.io/egoose/interfaces/_apis_statistics_.statisticapicontext.html

            return createStatisticProvider(
                name,
                ctx.value,  // contains MongoDatabase instance
            );
        },

        // this is called at last
        afterRequest: async (err, ctx: egoose.StatisticApiContext) => {
            if (err) {
                // an error has been occurred while execution
            }

            const DB: egoose.MongoDatabase = ctx.value;
            if (DB) {
                await DB.disconnect();  // close the connection
            }
        },
    }
);
```
