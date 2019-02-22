# egoose-samples :: calcDistance()

Shows how to use the [calcDistance() function](https://egodigital.github.io/egoose/modules/_geo_index_.html#calcdistance).

## Code example

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

// distance in meters
const DISTANCE = egoose.calcDistance(
    EGO_DIGITAL.lat, EGO_DIGITAL.lng,
    EGO_FACTORY_1.lat, EGO_FACTORY_1.lng,
);
```
