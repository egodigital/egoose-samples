# egoose-samples :: createMonitoringApiResult()

## Example code

```typescript
import * as egoose from '@egodigital/egoose';

const API_RESULT: egoose.MonitoringApiResult = 
    await egoose.createMonitoringApiResult();

const API_RESULT_WITH_DB_CHECK: egoose.MonitoringApiResult = 
    await egoose.createMonitoringApiResult({
        databaseConnectionChecker: async () => {
            // return (true), if database connection works
            // return (false), if database connection did not work

            // errors / exception will be handled as (false) result
        },
    });
```

| Name | Description | Example |
| ---- | ----------- | ------- |
| `cpu_load` | The CPU usage. | `0.08468244084682441` |
| `database_connected` | Is database connected or not. | `(true)` |
| `disk_space` | The total number of disk space, in bytes. | `67104190464` |
| `disk_space_used` | The disk space in use. | `53995933696` |
| `ram` | The total number of ram, in bytes. | `16673296384` |
| `ram_used` | The amount of ram in use. | `10671677440` |

## Build and run sample

```bash
# install required modules
npm install

# build and run the sample
npm start
```
