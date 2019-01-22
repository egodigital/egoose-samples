# egoose-samples :: LINQ

How to handle arrays, lists and generator with LINQ-style syntax.

## Examples

```typescript
import * as egoose from '@egodigital/egoose';

let seq = egoose.from([5979, 23979, null, '23979', 1781, 241279]);

let newSeq = seq.where((x) => x !== null)  // remove all elements that are (null)
                .skip(1)  // skip one element (5979)
                .take(3)  // take next remaining 3 elements (23979, 23979, 1781)
                .distinct()  // remove duplicates
                .select((x) => "" + x)  // convert to strings
                .order();  // order by element ascending

// you also can use the
// 'each' and 'forEach' methods
// of the sequence to do the
// following job
for (let item of newSeq) {
    // [0] 1781
    // [1] 23979
    console.log(item);
}
```

### Filters

```typescript
// distinct()
// 1, 2, 4, 3
egoose.from([1, 2, 4, 2, 3])
      .distinct();
// distinctBy()
// "grape", "passionfruit", "banana", "raspberry"
egoose.from(["grape", "passionfruit", "banana", "mango", 
             "orange", "raspberry", "apple", "blueberry"])
          .distinctBy(x => x.length);
 
// except()
// 2.0, 2.1, 2.3, 2.4, 2.5
egoose.from([2.0, 2.1, 2.2, 2.3, 2.4, 2.5])
      .except([2.2]); 
 
// intersect()
// 26, 30
egoose.from([44, 26, 92, 30, 71, 38])
      .intersect([30, 59, 83, 47, 26, 4, 3]);
       
// ofType()
// '5979', 'Tanja'
egoose.from([1, '5979', 2, 'Tanja', 3])
      .ofType('string');  // typeof x === 'string'
          
// union()
// 5, 3, 9, 7, 8, 6, 4, 1, 0
egoose.from([5, 3, 9, 7, 5, 9, 3, 7])
      .union([8, 3, 6, 4, 4, 9, 1, 0]);
          
// where()
// 1, 2, 3
egoose.from([1, 2, 3, 4])
      .where((x) => x < 4);
```

### Sort elements

```typescript
// orderBy(), thenBy()
//
// "apple", "grape", "mango", "banana",
// "orange", "blueberry", "raspberry", "passionfruit"
egoose.from(["grape", "passionfruit", "banana", "mango", 
             "orange", "raspberry", "apple", "blueberry"])
      .orderBy((x) => x.length)  // complement: orderByDescending()
      .thenBy((x) => x);  // complement: thenByDescending()
                          // shorter: then()

// reverse()
// 4, 3, 2, 1
egoose.from([1, 2, 3, 4])
      .reverse();

// rand()
// e.g.: 4, 1, 3, 2
egoose.from([1, 2, 3, 4])
      .rand();  // alt: shuffle()
```

### Take / skip elements

```typescript
// skip()
// 3, 4
egoose.from([0, 1, 2, 3, 4])
      .skip(3);

// skipLast()
// 0, 1, 2, 3
egoose.from([0, 1, 2, 3, 4])
      .skipLast();

// skipWhile()
// 55, 666, 77
egoose.from([22, 33, 44, 55, 666, 77])
      .skipWhile((x) => x < 50);
          
// take()
// 0, 1, 2
egoose.from([0, 1, 2, 3, 4])
      .take(3);

// takeWhile()
// 22, 33, 44
egoose.from([22, 33, 44, 55])
      .takeWhile((x) => x < 50);
```

### Get one element

```typescript
// elementAt()
// 33
egoose.from([11, 22, 33, 44])
      .elementAt(2);
          
// elementAtOrDefault()
// 'TM'
egoose.from([11, 22, 33, 44])
      .elementAtOrDefault(4, 'TM');  // out of range
          
// first()
// 11
egoose.from([11, 22, 33, 44])
      .first();
          
// firstOrDefault()
// 'MK'
egoose.from([])
      .firstOrDefault('MK');
          
// last()
// 44
egoose.from([11, 22, 33, 44])
      .last();
          
// lastOrDefault()
// 'PZ'
egoose.from([])
      .lastOrDefault('PZ');

// single()
// EXCEPTION, because we have more than one element
egoose.from([11, 22, 33, 44])
      .single();
          
// singleOrDefault()
// 11
egoose.from([11])
      .singleOrDefault('YS');
```

All methods with NO `OrDefault` suffix will throw exceptions if no element was found.

You also can use a function as first argument for all of these methods that works as filter / condition:

```typescript
// first()
// 22
egoose.from([11, 22, 33, 44])
      .first((x) => x >= 20);
```

### Accumulators

```typescript
// aggregate()
// " Marcel Joachim Kloubert"
Enumerable.create('Marcel', 'Joachim', 'Kloubert')
          .aggregate((accumulator, item) => {
                         return accumulator += ' ' + item;
                     }, '');

// average()
// 2.5
egoose.from([1, 2, 3, 4])
      .average();

// "M., Tanja"
egoose.from(['M.', 'Tanja'])
      .joinToString(', ');
```

### Minimum / maximum values

```typescript
// max()
// 3
egoose.from([1, 3, 2])
      .max(); 
          
// min()
// 1
egoose.from([2, 3, 1, 2])
      .min();
```

### Joins

```typescript
class Person {
    constructor(name: string) {
        this.name = name;
    }

    public name: string;
}

class Pet {
    constructor(name: string, owner: Person) {
        this.name = name;
        this.owner = owner;
    }

    public name: string;
    public owner: Person;
}

let persons = [
    new Person("Tanja"),
    new Person("Marcel"),
    new Person("Yvonne"),
    new Person("Josefine")
];

let pets = [
    new Pet("Gina", persons[1]),
    new Pet("Schnuffi", persons[1]),
    new Pet("Schnuffel", persons[2]),
    new Pet("WauWau", persons[0]),
    new Pet("Lulu", persons[3]),
    new Pet("Asta", persons[1]),
];

// groupJoin()
// 
// [0] 'Owner: Tanja; Pets: WauWau, Sparky'
// [1] 'Owner: Marcel; Pets: Gina, Schnuffi, Asta'
// [2] 'Owner: Yvonne; Pets: Schnuffel'
// [3] 'Owner: Josefine; Pets: Lulu'
egoose.from(persons)
      .groupJoin(pets,
                 (person) => person.name,
                 (pet) => pet.owner.name,
                 (person, petsOfPerson) => {
                     let petList = petsOfPerson
                         .select(pet => pet.name)
                         .joinToString(', ');
                     
                     return 'Owner: ' + person.name + '; Pets: ' + petList;
                 });

// join()
// 
// [0] 'Owner: Tanja; Pet: WauWau'
// [1] 'Owner: Marcel; Pet: Gina'
// [2] 'Owner: Marcel; Pet: Schnuffi'
// [3] 'Owner: Marcel; Pet: Asta'
// [4] 'Owner: Yvonne; Pet: Schnuffel'
// [5] 'Owner: Josefine; Pet: Lulu'
egoose.from(persons)
      .join(pets,
            (person) => person.name,
            (pet) => pet.owner.name,
            (person, pet) => {
                return 'Owner: ' + person.name + '; Pet: ' + pet.name;
            });
```

### Groupings

```typescript
// groupBy()
egoose.from(["grape", "passionfruit", "blueberry",
             "apple", "banana"])
      .groupBy(fruit => fruit[0].toLowerCase())
      .each((grouping) => {
          // grouping[0].key = 'g'
          // grouping[0][0] = 'grape'
        
          // grouping[1].key = 'p'
          // grouping[1][0] = 'passionfruit'
        
          // grouping[2].key = 'b'
          // grouping[2][0] = 'blueberry'
          // grouping[2][1] = 'banana'
        
          // grouping[3].key = 'a'
          // grouping[3][0] = 'apple'
      });
```

### Projection

```typescript
// flatten()
// 1, (false), 3, 44, '555', 66.6, (true)
egoose.from( [ [ 1, false, 3 ], 44, [ '555', 66.6, true ] ] )
      .flatten();

// select()
// "MARCEL", "KLOUBERT"
egoose.from(["Marcel", "Kloubert"])
      .select(x => x.toUpperCase());
          
// selectMany()
// 1, 10, 100, 2, 20, 200, 3, 30, 300
egoose.from([1, 2, 3])
      .selectMany(x => [ x, x * 10, x * 100 ]);

// zip()
// "Marcel Kloubert", "Bill Gates", "Albert Einstein"
egoose.from(['Marcel', 'Bill', 'Albert'])
      .zip(['Kloubert', 'Gates', 'Einstein', 'Adenauer'],
           (firstName, lastName) => {
               return `${firstName} ${lastName}`;
           });
```

### Checks / conditions

```typescript
// all()
// (false)
egoose.from([1, 2, '3', 4])
      .all((x) => typeof x !== "string");

// any()
// (true)
egoose.from([1, 2, '3', 4])
      .any((x) => typeof x === "string");

// contains()
// (true)
egoose.from([1, 2, '3'])
      .contains(3);

// not()
// 1, 2, 4
egoose.from([1, 2, '3', 4])
      .not((x) => typeof x === "string");
 
// sequenceEqual()
// (false)         
egoose.from([1, 2, 3])
      .sequenceEqual([1, 3, 2]);
```

### Conversions

```typescript
// toArray()
let jsArray = egoose.from([1, 2, 3, 4])
                    .toArray();
  
// toObject()
let obj = egoose.from([1, 2, 3, 4])
                .toObject((item, index) => "item" + index);  

// toLookup()
// 
// lookup['A'][0] = 'Albert'
// lookup['B'][0] = 'Bill'
// lookup['B'][1] = 'barney'
// lookup['K'][0] = 'Konrad'
// lookup['M'][0] = 'Marcel'
let lookup = egoose.from(['Bill', 'Marcel', 'barney', 'Albert', 'Konrad'])
                   .toLookup(x => x[0].toUpperCase());
```

### Count

```typescript
// 3
egoose.from([0, 1, 2])
      .count();  // a second call will return 0
                 // if reset() method is not called
          
// 2
egoose.from([0, 1, 2])
      .count((x) => x > 0);

// 4
egoose.from([11, 22, 33, 44])
      .length();  // a second call will return
                  // the same value, because we have an array
                  // based sequence here
                  //
                  // a generator based sequence will behave as count()

// (false)
egoose.from([111, 222, 333])
      .isEmpty();
```

### Math

```typescript
// abs()
// 1, 22.57, 444, NaN, -333.85, NaN
egoose.from([-1, 22.57, 444, true, -333.85, false])
      .abs();

// ceil()
// -1, 23, 444, NaN, -333, NaN
egoose.from([-1, 22.47, 444, null, -333.85, false])
      .ceil();

// cos()
// 0.004, -0.99996, -0.01
egoose.from([11, 22, 33])
      .cos();  // complement: arcCos()

// cosH()
// 29937.07, 1792456423.07, 107321789892958.03
egoose.from([11, 22, 33])
      .cosH();  // complement: arcCosH()

// exp()
// 2.72, 7.39, 20.09
egoose.from([1, 2, 3])
      .exp();

// floor()
// -1, 23, 444, NaN, -334, NaN
egoose.from([-1, 22.47, 444.0, undefined, -333.85, true])
      .floor();

// log()
// 0, 1, 2, 3, 4
egoose.from([1, 2, 4, 8, 16])
      .log(2);

// pow()
// 1, 4, 9, 16
egoose.from([1, 2, 3, 4])
      .pow(2);

// product()
// 24
egoose.from([1, 2, 3, 4])
      .product();

// root()
// 1, 2, 3, 4
egoose.from([1, 8, 27, 64])
      .root(3);

// round()
// -1, 23, 444, NaN, -334, 2, NaN
egoose.from([-1, 22.47, 444.0, undefined, -333.85, 1.5, true])
      .round();

// sin()
// 0.84, 0.91, 0.14
egoose.from([1, 2, 3])
      .sin();  // complement: arcSin()

// sinH()
// 1.18, 3.63, 10.02
egoose.from([1, 2, 3)]
      .sinH();  // complement: arcSinH()

// sqrt()
// 1, 2, 3, 4
egoose.from([1, 4, 9, 16])
      .sqrt();

// sum()
// 10
egoose.from([1, 2, 3, 4])
      .sum();

// tan()
// 1.72, -1.76, -0.01
egoose.from([111, 222, 333])
      .tan();  // complement: arcTan()

// tanH()
// 0, 0.46, -0.76
egoose.from([0, 0.5, -1])
      .tanH();  // complement: arcTanH()
```

### More

#### assert

```typescript
let seq1 = egoose.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
seq1.assert((x) => {
    return x % 2 !== 1;
});  // will throw an exception
     // at second element (1)

let seq2 = egoose.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
seq2.assertAll((x) => {
    return x % 2 !== 1;
});  // will throw an aggregated exception
     // at the end
     // for all odd values
```

#### chunk

```typescript
let seq = egoose.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
for (let chunk of seq.chunk(3)) {
    // [0] => [0, 1, 2]
    // [1] => [3, 4, 5]
    // [2] => [6, 7, 8]
    // [3] => [9]
}
```

#### clone

```typescript
let father = egoose.from([0, 1, 2]);

// create 3 clones of 'father'
for (let child of father.clone(3)) {
    //TODO
}

// alt: father.clone().take(3)
```

#### concat / concatArray

```typescript
// 0, 1, 2, 'PZ', 'TM', 'MK'
egoose.from([0, 1, 2])
      .concat(['PZ'], ['TM', 'MK']);  // alt: append()

// 0, 111, 222, 'pz', 'tm', 'mk'
egoose.from([0, 111, 222])
      .concatArray([ [ 'pz', 'tm' ], [ 'mk' ] ]);  // alt: appendArray()
```

#### consume

```typescript
function createIteratorAndStorage(size) {
    let storage = [];

    return {
        iterator: makeIterator(size, storage),
        storage: storage,
    };
}

function *makeIterator(size, storage) {
    for (let i = 0; i < size; i++) {
        yield i;

        storage.push(i);
    }
}

const OBJ = createIteratorAndStorage(100);

const SEQ = egoose.from(OBJ.iterator);
SEQ.consume();  // enumerates the 'iterator' in OBJ
                // and fills the 'storage' in OBJ
```

#### defaultIfEmpty / defaultArrayIfEmpty 

```typescript
// 0, 1, 2
egoose.from([0, 1, 2])
      .defaultIfEmpty('PZ', 'TM', 'MK');
          
// 'PZ', 'TM', 'MK'
egoose.from([])
      .defaultIfEmpty('PZ', 'TM', 'MK');

// 0, 11, 22
egoose.from([0, 11, 22])
      .defaultArrayIfEmpty(['pz', 'tm', 'mk']);
// alt: defaultSequenceIfEmpty()

// 'pz', 'tm', 'mk'
egoose.from([])
      .defaultArrayIfEmpty(['pz', 'tm', 'mk']);
```

#### forAll

```typescript
let arr = [];

try {
    // alt: eachAll()
    egoose.from([0, 1, 2, 3, 4]).forAll(x => {
        if (x % 2 === 0) {
            throw 'Error in value ' + x;
        }

        arr.push(x);
    });
}
catch (e) {
    // access the list of errors by
    // 'e.errors'

    // e.errors[0] = 'Error in value 0';
    // e.errors[1] = 'Error in value 2';
    // e.errors[2] = 'Error in value 3';
}

// arr[0] === 1
// arr[1] === 3
// arr[2] === 5
```

#### intersperse / intersperseArray

```typescript
// 0, '-', 1, '-', 2
egoose.from([0, 3])
      .intersperse('-');

// -- or --
egoose.from([0, 3])
      .intersperseArray( ['-'] );
```

#### pipe

```typescript
let arr1 = [];
let arr2 = [];

let seq = egoose.from([1, 2, 3]).pipe((x) => {
    arr1.push(x * 10);
});
for (let item of seq) {
    arr2.push(item);
}

// arr1 = [10, 20, 30]
// arr2 = [1, 2, 3]
```

#### prepend / prependArray

```typescript
// 'PZ', 'TM', 'MK', 0, 1, 2
egoose.from([0, 1, 2])
      .prepend(['PZ'], ['TM', 'MK']);

// 'pz', 'tm', 'mk', 0, 111, 222
egoose.from([0, 111, 222])
      .prependArray([ [ 'pz', 'tm' ], [ 'mk' ] ]);
```

#### reset

```typescript
let seq = egoose.from([0, 1, 2]);

seq.each(x => {
             console.log(x);
         });

seq.reset()
   .each(x => {
             console.log(x * 2);
         });
```

#### trace

```typescript
// write items via 'console.trace()'
egoose.from([0, 1, 2])
      .trace();

// with formatter
egoose.from([1.2, 2.3, 3.45])
      .trace(x => 'Item: ' + x);
```
