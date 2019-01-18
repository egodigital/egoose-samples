# egoose-samples :: GUID / UUID

Shows how to generate GUIDs / UUIDs.

## Example code

```typescript
import * as egoose from '@egodigital/egoose';

// version 1
const GUID1_1 = egoose.guid('1');
const GUID1_2 = egoose.guid('v1');

// version 4
const GUID4_1 = egoose.guid();
const GUID4_2 = egoose.guid('4');
const GUID4_3 = egoose.guid('v4');
```

Instead of `guid`, you can use `uuid`.
