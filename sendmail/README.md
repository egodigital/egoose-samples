# egoose-samples :: sendMail()

Shows how to use the [sendMail() function](https://egodigital.github.io/egoose/modules/_mail_index_.html#sendmail).

## Code example

First, define the following environment variables:

```bash
```

Now, you can send a mail from code:

```typescript
import * as egoose from '@egodigital/egoose';

// send plain text
await egoose.sendMail({
    subject: 'A test mail',
    body: 'Lorem ispum',

    to: 'test@example.com',
});

// send HTML
await egoose.sendMail({
    format: egoose.MailFormat.HTML,

    subject: 'A HTML test mail',
    body: '<h1>Lorem ipsum</h1>',

    to: 'test@example.com',
});
```
