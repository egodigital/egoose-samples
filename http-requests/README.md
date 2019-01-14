# egoose-samples :: HTTP requests

## Example code

```typescript
import * as egoose from '@egodigital/egoose';

// GET
const GET_RESPONSE = await egoose.GET('https://example.com');

// POST
const POST_RESPONSE = await egoose.POST('https://example.com', {
    body: 'Can be a string, stream or buffer',
    encoding: 'utf8',
    headers: {
        'Authorization': 'Bearer bWs6dG0=',
        'X-TM': '1979-09-05 23:09',
    },  // optional headers
    timeout: 5000,  // optional
});

// PUT
const PUT_RESPONSE = await egoose.PUT('https://example.com/users/23979/about', {
    body: new Buffer('Lorem ispum', 'utf8'),
});

// PATCH
const PATCH_RESPONSE = await egoose.PATCH('https://example.com/users/5979', {
    body: JSON.stringify({
        username: 'TM',
    }),
    encoding: 'utf8',
});

// DELETE
const DELETE_RESPONSE = await egoose.DELETE('https://example.com/users/19861222');

// also available:
// - egoose.CONNECT()
// - egoose.HEAD()
// - egoose.OPTIONS()
```

All `*_RESPONSE` objects implement the [HttpResponse interface](https://egodigital.github.io/egoose/interfaces/_http_index_.httpresponse.html).

## Build and run sample

```bash
# install required modules
npm install

# build and run the sample
npm start
```
