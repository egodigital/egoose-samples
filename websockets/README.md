# egoose-samples :: WebSockets

Examples, that show how to use the [WebSockets](https://egodigital.github.io/egoose/modules/_http_websockets_.html) framework.

## Run a host

```typescript
import * as egoose from '@egodigital/egoose';

// run on port 5979
const HOST = new egoose.WebSocketHost({
    port: 5979,
});

HOST.on('error', (err) => {
    console.error(err);
});

HOST.on('connection', (client: egoose.WebSocketClient) => {
    // a connection with a client has been ESTABLISHED

    client.on('error', (err) => {
        console.error(err);
    });

    client.on('close', () => {
        // client has closed the connection
        // with our host
    });

    client.on('message', (msg: egoose.WebSocketMessage) => {
        // client has send a message of type 'echo'
        if ('echo' === msg.type) {
            // send the 'data' back to client
            // as type 'echo.back'
            client.send('echo.back', msg.data).then(() => {
                // data send
            }).catch(err => {
                console.error(err);
            });
        }
    });
});

await HOST.start();
```

If a remote client wants to send data to a host or receive data from it, it has to handle the data as JSON strings of objects, implementing the [WebSocketMessage](https://egodigital.github.io/egoose/interfaces/_http_websockets_.websocketmessage.html) interface.
