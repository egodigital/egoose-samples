# egoose-samples :: format() / formatArray()

Demonstrates the use of [format()](https://egodigital.github.io/egoose/modules/_strings_index_.html#format) and [formatArray()](https://egodigital.github.io/egoose/modules/_strings_index_.html#formatarray) functions.

Both functions are similar to [String.format()](https://docs.microsoft.com/en-us/dotnet/api/system.string.format?view=netframework-4.7.2) method of [.NET framework](https://en.wikipedia.org/wiki/.NET_Framework).

## Examples

### format

```typescript
import * as egoose from '@egodigital/egoose';

// "TM+MK = 59.1979+23979"
egoose.format('{1}+{0} = {3}+{2}',
              'MK', 'TM', 23979, 59.1979);

// "TM+mk = 59.1979+23979"
egoose.format('{1:upper}+{0:lower} = {3}+{2}',
              'MK', 'tm', 23979, 59.1979);

// "'TM' ="
egoose.format('{0:surround} = {1:surround}',
              'TM', '');

// " TM"
egoose.format('{0:leading_space}{1:leading_space}',
              'TM', '');

// "TM "
egoose.format('{1:ending_space}{0:ending_space}',
              '', 'TM');

// "TM"
egoose.format('{0:trim}',
              '  TM     ');
```

### formatArray

```typescript
import * as egoose from '@egodigital/egoose';

// "TM+MK = 59.1979+23979"
egoose.formatArray('{1}+{0} = {3}+{2}',
                   [ 'MK', 'TM', 23979, 59.1979 ]);

// "TM+mk = 59.1979+23979"
egoose.formatArray('{1:upper}+{0:lower} = {3}+{2}',
                   [ 'MK', 'tm', 23979, 59.1979 ]);

// "'TM' ="
egoose.formatArray('{0:surround} = {1:surround}',
                   [ 'TM', '' ]);

// " TM"
egoose.formatArray('{0:leading_space}{1:leading_space}',
                   [ 'TM', '' ]);

// "TM "
egoose.formatArray('{1:ending_space}{0:ending_space}',
                   [ '', 'TM' ]);

// "TM"
egoose.formatArray('{0:trim}',
                   [ '  TM     ' ]);
```

## Custom format providers

```typescript
import * as egoose from '@egodigital/egoose';

// register additional providers
// - trim_and_lower
// - trim_and_upper
egoose.registerStringFormatProviders({
    'trim_and_lower': (val: any) => {
        return egoose.toStringSafe(val)
            .trim()  // trim
            .toLowerCase();  // lower
    },

    'trim_and_upper': (val: any) => {
        return egoose.toStringSafe(val)
            .trim()  // trim
            .toUpperCase();  // upper
    },
});

// "tm 5979"
egoose.format('{0:trim_and_lower} {1}',
              '  TM   ', 23979);
// "TM 5979"
egoose.formatArray('{0:trim_and_upper} {1}',
                   [ '  tm   ', 23979 ]);
```
