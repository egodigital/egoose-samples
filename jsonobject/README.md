# egoose-samples :: jsonObject()

Demonstrates the use of [jsonObject() function](https://egodigital.github.io/egoose/modules/_apis_validation_.html#jsonobject).

## Example

That example requires the following [npm](https://www.npmjs.com/) modules:

* [express](https://www.npmjs.com/package/express)
* [joi](https://www.npmjs.com/package/joi)

```typescript
import * as egoose from '@egodigital/egoose';
import * as express from 'express';
import * as joi from 'joi';


interface NewUser {
    email?: string;
    password: string;
    username: string;
}

const SCHEMA_NEW_USER = joi.object({
    email: joi.string()
        .optional(),
    password: joi.string()
        .required(),
    username: joi.string()
        .required(),
});


const APP = express();

APP.post('/users',

         // check if input is JSON and fits
         // with schema in 'SCHEMA_NEW_USER'
         egoose.jsonObject( SCHEMA_NEW_USER ),
    
         function(req: express.Request, res: express.Response) {
             // add that point
             // we have a valid
             // JSON object
             // describes in 'NewUser'
             const NEW_USER: NewUser = req.body;
         });

APP.listen(8080);
```
