# egoose-samples :: redis

Shows how to use [cache framework](https://egodigital.github.io/egoose/modules/_cache_index_.html) with [Redis](https://egodigital.github.io/egoose/modules/_cache_redis_.html).

## Code example

### From environment

First, define the following environment variables:

```bash
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

Now you can start using the [RedisCache](https://egodigital.github.io/egoose/classes/_cache_redis_.rediscache.html) class:

```typescript
import * as egoose from '@egodigital/egoose';

const REDIS = egoose.RedisCache.fromEnvironment();

// at the beginning this should be
// the default value (false), because it does not exist
let tm = await REDIS.get('key_tm', false);

await REDIS.set('key_tm', 5979);

// now the value should be 5979
tm = await REDIS.get('key_tm', false);

// save value for 10 seconds
await REDIS.set('key_pz', 'PZSUX', {
    'ttl': 10
});
```

### With constructor

```typescript
import * as egoose from '@egodigital/egoose';

const REDIS = new egoose.RedisCache({
    host: '127.0.0.1',
    port: 6379,
});

// at the beginning this should be
// the default value (false), because it does not exist
let tm = await REDIS.get('key_tm', false);

await REDIS.set('key_tm', '1979-09-05 23:09');

// now the value should be '1979-09-05 23:09'
tm = await REDIS.get('key_tm', false);

// save value for 10 seconds
await REDIS.set('key_pz', 'PZSUX', {
    'ttl': 10
});
```
