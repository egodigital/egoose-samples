# egoose-samples :: OAuth

## Microsoft

First define the following environment variables:

```bash
MICROSOFT_OAUTH_CLIENT_ID=<ID OF THE APPLICATION OR CLIENT>
MICROSOFT_OAUTH_CLIENT_SECRET=<CLIENT SECRET>
MICROSOFT_OAUTH_REDIRECT_URL=<THE REDIRECT URL>
MICROSOFT_OAUTH_TENANT_ID=<ID OF THE TENANT>
```

Then register handler for OAuth:

```typescript
import * as egoose from '@egodigital/egoose';
import * as express from 'express';

(async () => {
    const APP = express();

    // register Express instance
    // for Microsoft OAuth
    egoose.registerForMicrosoftOAuth(APP, {
        onAccessToken: async (token: egoose.MicrosoftOAuthAccessToken) => {
            // authorization was successful
            // return information about the current user
            const ME: false | egoose.MicrosoftMe = await egoose.getMicrosoftMe(token);
            if (ME) {
                //TODO
            }
        },

        // the redirect URI must be something like
        // 'http://localhost:8080/oauth' (s. below)
        redirectPath: '/oauth'
    });

    APP.listen(8080, () => {
        // display login URL
        console.log('Login URL: ' + egoose.getMicrosoftOAuthLoginUrl());
    });
})();
```
