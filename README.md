[![Build Status](https://travis-ci.org/elycruz/sjljs.png)](https://travis-ci.org/elycruz/sjljs) 
[![GitHub version](https://badge.fury.io/gh/elycruz%2Fsjljs.svg)](http://badge.fury.io/gh/elycruz%2Fsjljs) 
[![NPM version](https://badge.fury.io/js/sjljs.svg)](http://badge.fury.io/js/sjljs)
[![Dependencies](https://david-dm.org/elycruz/sjljs.png)](https://david-dm.org/elycruz/sjljs)
sjljs
=====

A library for building applications and building libraries from the ground up. 

Not meant to replace popular libraries (Backbone, Underscore, Jquery etc.)
only meant as a supplement to them.

**Note** 
Version 0.5+ removes some backward compatability.  Namely 
all classes that were included on `sjl` before our now included 
via a `sjl.package` and it's alias `sjl.ns`;  E.g.,
`sjl.Extendable` is now accessible via `sjl.ns.Extendable`
 Also all classes that were available in the root level are 
now available in the `sjl.ns.stdlib` package.

See release notes for release 0.5.0.

## Sections in Readme:
- [Components Included](#components-included)
- [Tests](#tests)
- [Requirements](#requirements)
- [Supported Browsers](#supported-browsers)
- [Todos](#todos)
- [Notes](#notes)
- [License](#license)
- [Changelogs](#changelogs)

## Components included:
- [Classes/Constructors](#classesconstructors)
- [Utilities](#utilities)
- [Set Functions](#set-functions)
- [OOP Util Functions](#oop-util-functions)
- [Composition Helpers](#composition-helpers)

### Classes/Constructors

##### sjl.ns.stdlib.Attributable(attributes {Object|undefined}) :sjl.ns.stdlib.Attributable
A base attributable constructor which has two methods `attr` and `attrs`
(for setting and getting multiple attributes jquery style).

##### sjl.ns.stdlib.Iterator(values {Array<*>|undefined}, pointer {Number|undefined}) :sjl.ns.stdlib.Iterator
A simple iterator constructor which implements the es6 iterator and
the php `Iterator` classes.

##### sjl.ns.stdlib.ObjectIterator(object {Object}, pointer {Number|undefined}) :sjl.ns.stdlib.ObjectIterator
One of two constructors calls available for `ObjectIterator`.
See next section for description object and alternate constructor call.

##### sjl.ns.stdlib.ObjectIterator(keys{Array<*>, values {Array<*>|undefined}, pointer {Number|undefined}) :sjl.ns.stdlib.ObjectIterator
An object iterator;  Iterates similarly to Iterator but takes a set of
keys and values on construction. Implements the es6 iterator and the php
`Iterator` classes.

##### sjl.ns.stdlib.Extendable(constructor {String|Function}, methods {Object|undefined}, statics {Object|undefined}) :sjl.Extendable
A base extendable constructor with a static `extend` method that allows
 you to easily extend constructors/classes; E.g.,

```
// SomeConstructor.js
// Using node, requirejs, browserify or some 
// other AMD/UMD helper (here we'll use nodejs)

var SomeConstructor = function SomeConstructor () {};

// Make `SomeConstructor` extendable
module.exports = sjl.ns.stdlib.Extendable.extend(SomeConstructor, {
     someMethod: function () {
         // Do something here
     }
 },
 {
     someStaticMethod: function () {
         // Do something here
     }
 });

// SomeOtherSubClass.js

// Bring in 'SomeOtherConstructor'
var SomeOtherConstructor = require('SomeOtherConstructor'),
    SomeOtherSubClass = function SomeOtherSubClass () {
        SomeOtherConstructor.apply(this, arguments);
    };

// Inherits statics and prototype of SomeOtherConstructor and 
// is also extendable via the static method `extend` 
module.exports = SomeOtherConstructor.extend(SomeOtherSubClass, {
        // methods
    });
```

##### sjl.ns.stdlib.SjlSet(Array<*>) :sjl.ns.stdlib.SjlSet
A set object that acts just like the es6 `Set` object with two additional convenience methods.
- `addFromArray(Array<*>) :sjl.ns.stdlib.SjlSet`
- `iterator() :iterable`

##### sjl.ns.stdlib.SjlMap(Array<Array>) :sjl.ns.stdlib.SjlMap
A map that acts just like the es6 `Map` object with two additional convenience methods:
- `addFromArray(Array<*>) :sjl.ns.stdlib.SjlMap`
- `iterator() :iterable`

##### sjl.ns.stdlib.Optionable(...obj {Object|undefined}) :sjl.Optionable
A simple Optionable class with `set`, `get`, `merge`, and `has` methods meant to be similiar to Backbone's Model constructor
but with some enhanced methods on it and without the ajax stuff (barebones object).

###### has (value {String}) :Boolean
Takes a regular string or a namespaced string to find out if value exists on the Optionable's object `options` object.

###### get (key {String}) :{null|*}
Takes a regular string or a namespaced one ('hello.world.some.key') and pulls out the value from Optionable's `options` object.
  Returns null if `key` cannot be found on Optionable.
 
###### set (key {String}, value {*}) :Optionable
Takes a key and a value param or an object (sets multiple key value pairs in this case).  
Key value can be a namespaced string.  Also if first value is an object then set uses `sjl.setValueOnObj` 
(see description of this method above) to set values on this Optionable.
    
###### merge (obj {Object}, ...obj {Object|undefined}, useLegacySetterAndGetters {Boolean|undefined}) :Optionable
Merges all `Object`s passed into it to Optionable's `options` object recursively (deeply).  If last param in arguments is a Boolean
    then checks, extracts this boolean and passes it on to `sjl.extend` (in an attempt to invoke `extend`'s 
    useLegacyGettersAndSetters` feature if the boolean is true and not invoke the feature to do the merge if the
     boolean is false).

### Utilities:

##### sjl.argsToArray(arguments {Arguments}) :Array
Converts arguments to an array;  E.g., 
`sjl.argsToArray(arguments);` -> returns arguments as an array.

##### sjl.restArgs(arguments {Arguments}, start {Number|undefined}, end {Number|undefined}) :Array
Returns the rest of the arguments from the given `start` to `end` (optional) positions, E.g.,
```
function someFunction (arg1, arg2, arg3) {
    // Will give us everything after `arg2`
    var otherArgs = sjl.restArgs(arguments, 2);
}

// This function will call will give us the array
// ['value3', 'value4', 'value5'] within `otherArgs`
someFunction ('value1', 'value2', 'valu3', 'value4', 'value5'); 
```

##### ~~sjl.hasMethod (method) :Boolean~~
This function has been removed in sjljs-0.5.7.
Use `sjl.issetAndOfType(obj[method], 'Function')` instead.

##### sjl.camelCase(str {String}, ucaseFirst {Boolean|undefined}) :String
Camel Cases a string;  
`sjl.camelCase('hello-world', boolean);` -> returns "helloWorld" if `boolean` is `false`
 else returns "HelloWorld" if `boolean` is `true`

##### sjl.classOf(obj {*}) :String
Gives you a String representation of the class of value;  E.g., 
```
sjl.classOf("hello") === 'String' // true
sjl.classOf(new Map()) === 'Map'  // true
// etc.
```

##### sjl.classOfIs(obj {*}, classTypeStr {String}) :Boolean
Checks whether `obj` is of `classTypeStr` passed in;  E.g.,
```
sjl.classOfIs(0, 'Number') // true.  Matches 'Number'.
sjl.classOfIs([], 'Array') === true  // true
sjl.classOfIs([], 'Array') // true.  Matches 'Array'.
```

##### sjl.empty(value {*}) :Boolean
Opinionated `empty` check.  Checks if `false`, `0`, `null`, `undefined`,
empty array, or empty object is true for passed in object.
```
sjl.empty(false); // true
sjl.empty(true);  // false
sjl.empty(0, false, null, undefined, [], {});    // true
sjl.empty(1, true, {prop: 'value'}, ['value']);  // false
```

##### sjl.extractBoolFromArrayEnd(list {Array}) :Boolean
Pops a boolean off of the end of an array and returns it.  
If no boolean is found there returns `false`.

##### sjl.extractBoolFromArrayStart(list {Array}) :Boolean
Shifts a boolean off of the beginning of an array and returns it.  
If no boolean is found at there returns `false`.

##### sjl.isset(value {*}) :Boolean
Checks to see if value is not `null` or `undefined` and returns true if it is.
```
// Note `someUndefinedValue` must be declared somewhere (E.g., as a function parameter etc.) or you'll
// get a javascript error for trying to access a doubly undefined and undeclared variable.
// You're allowed to check for undefined properties on objects via `sjl.isset` because objects
// are passed in by reference and you can check for properties on them via `typeof` without causing
// any javascript errors but when checking for a local variable that exists on it's own you will get a javascript
// for trying to access an undefined property.

function hello (someUndefinedValue) {
    return sjl.isset(someUndefinedValue);
}

hello(); // returns `false`

sjl.isset(null) // false.  `null` is not a set value.

// `Error` is thrown before `sjl.isset` recieves the `helloWorld` variable because
// `helloWorld` isn't declared anywhere.
sjl.isset(helloWorld);

```

##### sjl.issetAndOfType(value {*}, type {String|Array<String>}, type {String}) :Boolean
Checks to see if a value is set and is of given type.  E.g.,
```
sjl.issetAndOfType(someFunctionValue, 'Function')
// true.  Value is set and is of type of function.
 
sjl.issetAndOfType(someUndefinedValue, 'Function')
// false.  Value is not set.

sjl.issetAndOfType(someNumberValue, 'Number')
// true.  Matches type 'Number'.

sjl.issetAndOfType(someNumberValue, 'Number'])
// true.  Matches type 'Number'.
```

##### ~~sjl.issetObjKey (obj {*}, key {String}) :Boolean~~
This method was removed in sjljs-0.5.7.  For the same functionality use
 `sjl.isset(obj[key])` or `sjl.issetAndOfType(obj.key, 'SomeTypeName')` where key
 is the property key you want to check.

##### ~~issetObjKeyAndOfType (obj {*}, key {String}, type {String}) :Boolean~~
This method was removed in version 0.5.7.  For the same functionality use
 `sjl.issetAndOfType(obj[key], 'SomeTypeNameHere')` or `sjl.issetAndOfType(obj.key, 'SomeTypeNameHere')` where key
 is the property key want to check.

##### sjl.lcaseFirst(str {String}) :String
Lowercases the first character of a string;  E.g., 
`sjl.lcaseFirst ('Hello')` returns 'hello'.

##### sjl.namespace(key {String}, objToSearch {Object}, valueToSet {*|undefined}) :objToSearch
For getting and setting values on hash objects (allows deep searching by namespace string (`'all.your.base'`
 finds or sets `{all: {your: {base: ...}}}`).

##### ~~sjl.isEmptyObjKey(obj {Object}, key {String}, type {String|undefined}) :Boolean~~
This method is removed in sjljs-0.5.7.

##### sjl.isEmptyOrNotOfType(value{*}, type {String|undefined}) :Boolean

```
sjl.isEmptyNotOfType(({hello: 'world'}).hello);
// false.  Found key is not empty.

sjl.isEmptyOrNotOfType(({hello: 100}).hello);
// false.  Found key is not empty.

sjl.isEmptyOrNotOfType(({hello: 'world'}).hello, 'Number');
// true.  Found key is not empty but is not of given type(s). 

sjl.isEmptyOrNotOfType(({hello: 'world'}).hello, 'String');
// false.  Found key is not empty and is of given type.
```

##### sjl.jsonClone (obj {*}) :*
Clones an object using the JSON object.  E.g.,
```
// Does this `JSON.parse(JSON.stringify(obj));`

var obj = {hello: 'ola', world: 'mundo'};
sjl.jsonClone(obj); 
// Returns an object with the same properties as
// `obj` but the object is completely unique
```

##### sjl.clone (obj {*}) :*
Returns a new object with the properties from `obj`.

##### sjl.ucaseFirst(str {String}) :String
Uppercases the first character of a string;  E.g., `sjl.ucaseFirst('hello');`  returns 'Hello'.

##### sjl.implode(list {Array|Set|SjlSet}, separator {String}) :String
Implodes an `Array`, `Set`, or `SjlSet` into a string using `separator`.
calls `join` with `separator` on value if it is an array.

##### sjl.searchObj(nsString {String}, objToSearch {*}) :{Null|*}
Searches object using a namespace string and if final property in namespace
string chain is found then returns that properties value else 
it returns null.

##### sjl.createTopLevelPackage (obj {Object}, packageKey {String|undefined}, altFuncKey {String|undefined}, dirPath {String|undefined}) :obj
Creates a top level `package` on an object that allows you to set members on it which become un-overwrittable (members can be edited but not overwritten)
 when working on the frontend and when the library is being used within nodejs, this function creates a lazy loader 
 for loading class member *.js and *.json files;  E.g.,

(ignore whitespace formatting for examples (trying to make examples fit without
  having the browsers generate scrollbars on github))

```
// FRONTEND USAGE
// -------------------------------------------------

// -------------------------------------------------
// somePackage/myObject.js
// -------------------------------------------------
// Create top level frontend package
var myObject = Object.defineProperty(window, 'myObject', {});

// Create top level package functionality on `myObject`
// (note this method also returns passed in object
sjl.createTopLevelPackage(myObject, 'package', 'ns');

// -------------------------------------------------
// somePackage/someClass.js
// -------------------------------------------------
(function () {
    // Declare some class
    function SomeClass () {};
    
    // Export some class
    window.myObject.package('somePackage.SomeClass', SomeClass);
}());

// -------------------------------------------------
// somePackage/someProcess.js 
// -------------------------------------------------
var SomeClass = myObject.package.somePackage.SomeClass;
// you case use the alias for package
// here as well, in this case it is `ns`

```

```
// NODEJS USAGE
// -------------------------------------------------

// -------------------------------------------------
// somePackage/myObject.js
// -------------------------------------------------
// Create top level frontend package
var myObject = Object.defineProperty(window, 'myObject', {});

// Create top level package functionality on `myObject`
// (note this method also returns passed in object)
sjl.createTopLevelPackage(myObject, 'package', 'ns', __dirname);

// -------------------------------------------------
// somePackage/someClass.js
// -------------------------------------------------
(function () {
    // Include your object
    var myObject = require('somePackage/myObject.js');

    // Declare some class
    function SomeClass () {};

    // Export some class
    module.exports = SomeClass;
}());

// -------------------------------------------------
// somePackage/someProcess.js
// -------------------------------------------------
// Fetch your exported class using namespaces:
var SomeClass = myObject.package.somePackage.SomeClass;
// you case use the alias for package
// here as well, in this case it is `ns`

```


```
// FRONTEND AND NODEJS USAGE TOGETHER "EXAMPLE"
// -------------------------------------------------

// -------------------------------------------------
// somePackage/myObject.js
// -------------------------------------------------
(function () {
    var isNodeEnv = typeof window === 'undefined';

    // Create top level frontend package
    var myObject = {};

    if (isNodeEnv) {
        module.exports = myObject;
    }
    else {
        Object.defineProperty(window, 'myObject', {});
    }

    // Create top level package functionality on `myObject`
    // (note this method also returns passed in object
    sjl.createTopLevelPackage(
        myObject, 'package', 'ns', isNodeEnv ? __dirname : null);

}()):

// -------------------------------------------------
// somePackage/someClass.js
// -------------------------------------------------
(function () {

    var isNodeEnv = typeof window === 'undefined',
        myObject = isNodeEnv ? require('somePackage/myObject.js')
            : window.myObject || {};

    // Declare some class
    function SomeClass () {};

    // Export some class
    if (isNodeEnv) {
        module.exports = SomeClass;
    }
    else {
        myObject.package('somePackage.SomeClass', SomeClass);
    }

}());

// -------------------------------------------------
// somePackage/someProcess.js
// -------------------------------------------------
// Use your exported class via namespaces
(function () {

    var isNodeEnv = typeof window === 'undefined',
        myObject = isNodeEnv ? require('somePackage/myObject.js')
            : window.myObject || {},
        SomeClass = myObject.package.somePackage.SomeClass;
        // you case use the alias for package
        // here as well, in this case it is `ns`

}());

```


**Note**:
- This is called on the `sjl` object to allow to access its class members easily in nodejs and on the frontend.
- For frontend end you have to include the file for the class you want to access via the `package` and `ns` methods.

##### sjl.package
Created using `sjl.createTopLevelPackage` and is available for accessing sjl package members (for, current, packages 'stdlib', 'input', and 'validator').
The package key is `package` and the alias for it is `ns`.

##### sjl.ns 
Same as `sjl.package`.

### Set Functions:

##### sjl.extend(obj {Object|Boolean}, ...obj {Object|undefined}, useLegacyGettersAndSetters {Boolean|undefined}) : Object
Similiar to JQuery's `extend` method except with the following method signature: 
`extend((Boolean|*)[,obj, obj],[Boolean]) : Object`
- If the first param is a Boolean then the `deep` option is set (extends first object found from passed in params (arguments[1]) deeply)
- Where `*` is any type of object with type "Object".
- `obj` is any type of object of type "Object".
- and the last `[Boolean]` (optional boolean) is passed in to force
the extend method to use any composite styled set and get methods that may be available
for the key being merged on to the first object;  composite styled = `set{keyName}` | `setKeyName` or also
if `keyName` is a function on the object to extend then it gets called as a setter if `extend`'s last param is a Boolean.

This last item in the list above allows for interesting objects which inherit a waterfall
like property on instantiation (if you use the `extend` method to merge passed in options from within the constructor).

### OOP Util functions:

##### ~~sjl.copyOfProto(prototype {Prototype|Object}) :Object|Prototype~~
Removed in sjljs version 0.5.10.  Use `Object.create` instead for the same functionality.

##### sjl.defineSubClass(superclass {Function}, constructor {Function}, methods {Object}, statics {Object}) :Function
Creates a sub class of a constructor and makes it extendable via the static method `extend`;  E.g., pretty much 
creates `sjl.Extendable`.

##### sjl.throwNotOfTypeError(value {*}, paramName {String}, funcName {String}, expectedType {String}) :Void 
This method is used internally but is tentative and may be removed later.

#### Composition helpers:

##### sjl.getValueFromObj (key {String}, obj {Object}, args {*|undefined}, raw {Boolean|undefined}) :*
Allows getting value by namespace string (ex: `'some.object.deep'`) also if return value is a function automatically 
calls it and allows you to pass args to use with it also allows for fetching the function raw if `raw` is `true`.

##### sjl.setValueOnObj (key {String}, value {*}, obj {Object}) :{Object|*}
Allows setting a value on an object by namespace string or conjoined setter function (setPropertyName) or sets value 
directly if no setter or namespace string found/used.

### Tests:
- Tests for all components listed under "Utilities" above.
- Tests to be run on server.  See './tests/for-server'.
- Tests to be run in browser (requires running `bower install` in root directory).
See './tests/for-browser'.

## Requirements:
- Javascript versions ecmascript 3+

## Supported browsers:
- ie8+, and all other browsers

## Todos:

### MVP Todos:
- [X] - Write tests for:
    - [X] - `sjl.Optionable`.
    - [X] - `sjl.Attributable`.
    - [X] - `sjl.getValueFromObj`
    - [X] - `sjl.setValueOnObj`
    - [X] - `sjl.extend` (for new features)
    - [X] - `sjl.Iterator`

### Mvp for 0.4.9:
- [X] - Write tests for:
    - [X] - `sjl.issetAndOfType`
    - [X] - `sjl.issetObjKeyAndOfType`
    - [X] - `sjl.isEmptyObjKey`
    - [X] - `sjl.isEmptyObjKeyAndOfType`
    - [X] - `sjl.hasMethod`
    - [X] - ~~`sjl.hasGetterMethod`~~ Method has been replaced with `sjl.hasMethod`.
    - [X] - ~~`sjl.hasSetterMethod`~~ Method has been removed with `sjl.hasMethod`.
- [X] - Write doc sections in main readme for:
    - [X] - `sjl.issetAndOfType`
    - [X] - `sjl.issetObjKeyAndOfType`
    - [X] - `sjl.isEmptyObjKeyAndOfType`
    - [X] - `sjl.hasMethod`
    - [X] - ~~`sjl.hasGetterMethod`~~ Method has been removed.
    - [X] - ~~`sjl.hasSetterMethod`~~ Method has been removed.
- [X] - ~~Change `sjl.empty` to `sjl.isEmpty` (maybe for version 0.5.0)~~ Moved to version 0.5.0.
- [X] - Change `sjl.getValueOnObj`'s `raw` param to have a default `true` (needs to be set to true by default cause
 right now it is not apparent to people that this is the default behaviour).  Moved to version 0.5.0.

### MVP for 0.5.0:
- [ ] - Write docs for all validator classes.
- [ ] - Write tests for:
    - [X] - `sjl.SjlMap`.
    - [X] - `sjl.SjlSet`.
    - [ ] - `sjl.package`
    - [ ] - Write tests for all validator classes:
        - [ ] - `sjl.NumberValidator`.
        - [ ] - `sjl.AlphaNumValidator`.
- [ ] - Write a filter chain class.
- [ ] - Change interface check to check for 'isValid' and 'messages'
    properties on a 'AbstractValidator' class passed to a 'ValidatorChain' class.
- [ ] - Review entirety of library and look for places that could be refactored.
- [ ] - Refactor the `input` package
- [ ] - Refactor the `validator` package
- [ ] - `sjl.empty` to `sjl.isempty` (maybe for version 0.5.50).
- [X] - Change `sjl.getValueOnObj`'s `raw` param to have a default `true` (needs to be set to true by default cause
 right now it is not apparent to people that this is the default behaviour).
- [X] - Remove `attrs` method from `sjl.Attributable`.
- [X] - Update readme to a more readable format.
- [X] - Optimize for file size (maybe put context.sjl into a variable so it can be further minified).
- [X] - Changelog.
- [X] - Change the library from being a global for nodejs to being an exported package.
- [X] - Set all components (constructors) of sjl to be exported when being used in nodejs.
- [ ] - Support for AMD if it is available when used on the frontend.
- [X] - Remove use of eval option for `defineSubClass`.
- [X] - Create docs for `sjl.package`.
- [X] - ~~Shim `sjl.forEach` and `sjl.indexOf`.~~  Removed in version 0.5.4.
- [X] - Make `sjl.package` work using node (dynamically load class in for every requested namespace/class
instead of requiring global require).
- [ ] - Include all sub items for components included as sub nav in readme.
- [X] - Remove checking against multiple values for util functions (isset, classOfIs, etc. (maybe not classOfIs (have to evaluate common use cases further))).
- [X] - Change `value !== undefined` check to use typeof instead (safe way for browsers (current check fails in browsers)).

### MVP for 0.5.1+
- [X] - Add changelog.md in main readme.
- [ ] - Remove all shimming of es5 features and support for older browsers (IE8 etc.).
- [ ] - Update all classes to use Object.defineProperty and Object.defineProperties internally for
their properties to eliminate alternate schemes to hide access to their internal properties.
- [ ] - Remove all overloaded methods in exchange for Object.defineProperty and Object.defineProperties getters and setters.

## License:
[GPL v2-3+](http://www.gnu.org/licenses/gpl-2.0.html "http://www.gnu.org/licenses/gpl-2.0.html") &
[MIT](http://opensource.org/licenses/MIT "http://opensource.org/licenses/MIT")

## Changelog

### Changelog for 04/23/2015:
- Updated tests for `sjl.PostCodeValidator`.

### Changelog for 05/29/2015:
- Updated main readme.md format.
- Removed notices from main readme.md.
- Added changelog task to gulpfile.
- Added jsdoc task to gulpfile.
- Updated commenting in ./src/**/*.js to use jsdoc3.
- Generated documentation using jsdoc.

### Changelog for 06/12/2015:
- Finished test for new version of `sjl.classOfIs`.
- Updated bower.json to include mocha (so we don't include node_modules/mocha/mocha.css for browser tests).
- Removed if statements before static function declarations on `sjl`.
- Added some new methods.
    - `sjl.issetAndOfType`
    - `sjl.issetObjKeyAndOfType`
    - `sjl.isEmptyObjKeyOrNotOfType`
    - `sjl.hasMethod`
    - `sjl.hasGetterMethod`
    - `sjl.hasSetterMethod`
- Started using new methods within sjl-util-* and main classes directly within ./src/sjl.
- Updated todos in main readme.
- Rebuilt jsdocs and readme.

### Changelog for 06/15/2015:
- Updated `sjl.getValueFromObj` to use legacy getter and/or overloaded getter methods if they are available (when searching on `obj`).
- Rebuilt jsdocs, changelog, readme.

### Changelog for 07/01/2015:
- Rebuilt jsdocs (they weren't rebuilt in last couple of commits).
- Updated ./README.md with details about recently added methods.
- Rebuilt sjl artifacts.
- Updated gulpfile to have a more robust 'watch' task.
- Added 'changelog' as a separate task in gulpfile.
- Added commenting to gulpfile (since the code there is growing).
- Updated gulpfile tasks dependencies for 'readme' task.

### Changelog for 07/16/2015:
- Updated jsdoc section in sjl-util-functions.js.
- Added filtering for 'for in' loops in sjl-util*.js.
- Simplified complex if checks in sjl-util*.js.
- Updated readme-fragment.md to reflect changes.
- Marked sjl.Iterator and sjl.iterator as deprecated.
- Rebuilt jsdocs.
- Rebuilt README.md.

### Changelog for 07/16/2015:
- Removed deprecation tag for sjl.Iterator.
- Added sjl.SjlSet (a more robust `Set` object for special cases). 
- Rebuilt jsdocs.
- Rebuilt README.md.

### Changelog for 08/16/2015:
- Added `sjl.package` method/function.
- Added `sjl.SjlMap`, `sjl.SjlSet` and their tests (several commits back).
- Added some scaffolding for 'sjl/mvc/router' and added scaffolding for 'sjl/navigation'.
- Rebuilt jsdocs.
- Rebuilt README.md.

### Changelog for 09/10/2015:
- Removed depracation warning for `sjl.getValueFromObj` default `raw` param being set to `true`.

### Changelog for 11/04/2015 version 0.5.1:

- `sjl.empty` and `sjl.isset` no longer operate on more than one value (improves performance).
- './sjl-minimal.js and sjl-minimal.min.js now don't include any of the stdlib classes like 
before (makes for a smaller footprint when classes aren't needed).
- New function: `createTopLevelPackage` -  Used for new packaging functionality (view readme for more information on it).
- All classes that were available on the root level ('./src/sjl') are now available 
at `sjl.package.stdlib` (alias `sjl.ns.stdlib`)).
- All classes that were in the root level that were accessible directly on the `sjl` object (`sjl.{class-name}`)
 now must be accessed via their namespace;  E.g.,
 ```
 // The following
 sjl.Extendable.extend(/*...*/);
 
 // now becomes
 sjl.ns.stdlib.Extendable.extend(/*...*/);
 ```
- `ObjectIterator` was broken out into it's own file (it used to live in './src/sjl/Iterator.js').
- `sjl.iterable` was moved into it's own file (it used to live in './src/sjl/Iterator.js').
- All classes that are defined as part of `sjljs` are now only available via their namespaces
and are no longer available directly on/at `sjljs`;  E.g.,
```
// This..
var BaseValidator = sjl.BaseValidator;

// Now becomes
var BaseValidator = sjl.ns.validator.BaseValidator;

// and 
var InputFilter = sjl.InputFilter;

// Now becomes 
var InputFilter = sjl.ns.input.InputFilter;
```
This allows us to protect (and optionally freeze) our class members.

##### When developing `sjljs`:
- Classes have to be exported for the frontend using either `sjl.package` or `sjl.ns`;  E.g.,
```
function SomeClass () {};
// **Note** Not needed for nodejs
sjl.package('somePackage.SomeClass', SomeClass);
```
- Classes have to be exported for nodejs via it's exporting facilities;  
I.e., `module.exports = SomeClass;`
 

### Changelog for 11/05/2015 version 0.5.3:

- Removed support for multiple type checking functions (classOfIs, issetAndOfType etc.).
- Removed support for checking multiple values on `sjl.isset`.
- Also removed support for multiple type checking on functions that delegate type(s) checking to `sjl.classOfIs`,
`sjl.issetAndOfType`, `sjl.notEmptyAndOfType`, etc..