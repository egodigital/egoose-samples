# egoose-samples :: addressToGeoCoordinates()

Shows how to use the [addressToGeoCoordinates() function](https://egodigital.github.io/egoose/modules/_geo_index_.html#addresstogeocoordinates).

## Code example

First, define the following environment variables:

```bash
GOOGLE_API_KEY=<GOOGLE-API-TOKEN>
```

Now, you can get the coordinates from an address location:

```typescript
import * as egoose from '@egodigital/egoose';

const GEO = await egoose.addressToGeoCoordinates(
    "Campus-Boulevard 30 52074 Aachen"
);

if (GEO) {
    console.log('Latitude : ' + GEO.lat);
    console.log('Longitude: ' + GEO.lng);
} else {
    console.warning('No coordinates found.');
}
```
