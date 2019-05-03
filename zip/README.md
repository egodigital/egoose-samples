# egoose-samples :: Zip

Shows the [ZipBuilder](https://egodigital.github.io/egoose/modules/_zip_builder_.html) classes and functions.

## Example

```typescript
import * as egoose from '@egodigital/egoose';
import * as fs from 'fs';

const NEW_ZIP = egoose.buildZip();

// add buffer
NEW_ZIP.addBuffer(
    // no leading '/'!
    'path/in/zip/file.txt',
    // e.g. from a local file
    fs.readFileSync('/local/path/of/file.txt'),
);

// add empty directory
NEW_ZIP.addDir(
    // no leading '/'!
    'path/of/zip/directory'
);

// create a buffer
const DATA: Buffer = await NEW_ZIP.toBuffer();
```
