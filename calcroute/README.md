# egoose-samples :: calcRoute()

Shows how to use the [calcRoute() function](https://egodigital.github.io/egoose/modules/_geo_index_.html#calcroute).

## Code example

First, define the following environment variables:

```bash
MAPBOX_API_TOKEN=<MAPBOX-API-TOKEN>
```

Now, you can calculate the route from code:

```typescript
import * as egoose from '@egodigital/egoose';

const EGO_DIGITAL = {
    lat: 50.782131,
    lng: 6.047182
};

const EGO_FACTORY_1 = {
    lat: 50.775635,
    lng: 6.132818,
};

const ROUTE = await egoose.calcRoute(
    EGO_DIGITAL,  // from
    EGO_FACTORY_1,  // to
);

console.log(
    ROUTE
);
```
