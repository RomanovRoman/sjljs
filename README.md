[![Build Status](https://travis-ci.org/elycruz/sjljs.png)](https://travis-ci.org/elycruz/sjljs) 
[![GitHub version](https://badge.fury.io/gh/elycruz%2Fsjljs.svg)](http://badge.fury.io/gh/elycruz%2Fsjljs) 
[![NPM version](https://badge.fury.io/js/sjljs.svg)](http://badge.fury.io/js/sjljs)
[![Dependencies](https://david-dm.org/elycruz/sjljs.png)](https://david-dm.org/elycruz/sjljs)
sjljs
=====

A library for building applications and building libraries from the ground up. 

Not meant to replace popular libraries (Backbone, Underscore, Jquery etc.)
only meant as a supplement to them.

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

##### sjl.Attributable(attributes {Object|undefined}):sjl.Attributable
A base attributable constructor which has two methods `attr` and `attrs` (for setting and getting multiple attributes 
jquery style).

##### sjl.Iterator(values {Array|undefined}, pointer {Number|undefined}):sjl.Iterator
A simple iterator constructor which mimicks the es6 iterator and the php `Iterator` class.
Can be called as a method and acts as a factory method in this case.

##### sjl.Extendable(constructor {String|Function}, methods {Object|undefined}, statics {Object|undefined}):sjl.Extendable
A base extendable constructor with a static `extend` method that allows you to easily extend constructors; E.g.,

```
// SomeConstructor.js
// Using node, requirejs, browserify or some other AMD/UMD helper (here we'll use nodejs)

// Make `SomeConstructor` extendable
module.exports = sjl.Extendable.extend(function SomeConstructor () {}, {
     someMethod: function () {
         // Do something here
     }
 },
 {
     someStaticMethod: function () {
         // Do something here
     }
 });


// SomeSuperOtherConstructor.js

// Bring in 'SomeOtherConstructor'
var SomeOtherConstructor = require('SomeOtherConstructor');

// Inherits statics and prototype of SomeOtherConstructor and is also extendable via the static method `extend` 
module.exports = SomeOtherConstructor.extend(function SomeSuperOtherConstructor () {
        SomeOtherConstructor.apply(this, arguments);
    }, {
        // methods
    });
```

##### sjl.Optionable(...obj {Object|undefined}):sjl.Optionable
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

##### sjl.argsToArray(arguments {Arguments}):Array
Converts arguments to an array;  E.g., 
`sjl.argsToArray(arguments);` -> returns arguments as an array.

##### sjl.camelCase(str {String}, ucaseFirst {Boolean|undefined}):String
Camel Cases a string;  
`sjl.camelCase('hello-world', boolean);` -> returns "helloWorld" if `boolean` is `false`
 else returns "HelloWorld" if `boolean` is `true`

##### sjl.classOf(obj {*}):String
Gives you a String representation of the class of value;  E.g., 
```
sjl.classOf("hello") === 'String' // true
sjl.classOf(new Map()) === 'Map'  // true
// etc.
```

##### sjl.classOfIs(obj {*}, ...classTypeStr {String}):Boolean
Checks whether `obj` is of one of the `classTypeStr`'s passed in;  E.g., 
```
sjl.classOfIs(0, 'String', 'Number') // true.  Matches 'Number'.
sjl.classOfIs([], 'Array') === true  // true
sjl.classOfIs([], 'Number', 'Array') // true.  Matches 'Array'.
```

##### sjl.empty(...value {*}):Boolean
Opinionated `empty` check.  Checks if `false`, `0`, `null`, `undefined`, empty array, or empty object is true for one
 or one of many values.
```
sjl.empty(false); // true
sjl.empty(true);  // false
sjl.empty(0, false, null, undefined, [], {});    // true
sjl.empty(1, true, {prop: 'value'}, ['value']);  // false
```

##### sjl.extractBoolFromArrayEnd(list {Array}):Boolean
Pops a boolean off of the end of an array and returns it.  
If no boolean is found there returns `false`.

##### sjl.extractBoolFromArrayStart(list {Array}):Boolean
Shifts a boolean off of the beginning of an array and returns it.  
If no boolean is found at there returns `false`.

##### sjl.isset(...value {*}):Boolean
Checks for a value that is not `null` or `undefined` and returns true if it finds one.  Works for one or one of many values.
```
sjl.isset(someUndefinedValue)           // false.  Value is not set.
sjl.isset(null, someUndefinedValue)     // false.  None of the values is set.
sjl.isset(null, 1, someUndefinedValue)  // true.   '1' is a non empty value.
```

##### sjl.lcaseFirst(str {String}):String
Lowercases the first character of a string;  E.g., 
`sjl.lcaseFirst ('Hello')` returns 'hello'.

##### sjl.namespace(key {String}, objToSearch {Object}, valueToSet {*|undefined}):objToSearch
For getting and setting values on hash objects (allows deep searching by namespace string (`'all.your.base'`
 finds or sets `{all: {your: {base: ...}}}`).

##### sjl.isEmptyObjKey(obj {Object}, key {String}, ...type {String|undefined}):Boolean
Does everything `sjl.issetObjKey` does.  In addition checks whether `obj[key]`'s value is empty ([0, null, undefined, [], {}, false]) or not.
and whether `obj[key]` is of one of the class strings passed in (`...type`).

```
sjl.isEmptyObjKey({hello: 'world'}, 'hello');   // false.  Object's 'hello' property is not empty.
sjl.isEmptyObjKey({hello: 0}, 'hello');         // false.  Object's 'hello' property is not empty.
sjl.isEmptyObjKey({hello: 'world'}, 'hello', 'Number');  // true.  Object's 'hello' property does not match type 'Number'.
sjl.isEmptyObjKey({hello: 'world'}, 'hello', 'Number', 'String');  // false.  Object's 'hello' property is not empty and matches type 'String'.
```
**Note** - This method will be refactored in a future release to 

##### sjl.issetObjKey(obj {Object}, key {String}):Boolean
Checks whether an object has own property for a key and that the key isset (has a value other than null or undefined).

##### sjl.ucaseFirst(str {String}):String
Uppercases the first character of a string;  E.g., `sjl.ucaseFirst('hello');`  returns 'Hello'.

### Set Functions:

##### sjl.extend(obj {Object|Boolean}, ...obj {Object|undefined}, useLegacyGettersAndSetters {Boolean}) : Object
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

##### sjl.copyOfProto(prototype {Prototype|Object}):Object|Prototype
Creates a copy of a prototype (backward compatible to older IEs).

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
    - [ ] - `sjl.Attributable`.
    - [X] - `sjl.getValueFromObj`
    - [X] - `sjl.setValueOnObj`
    - [X] - `sjl.extend` (for new features)
    - [ ] - `sjl.Iterator`

### Mvp for 0.4.9:
- [ ] - Write tests for:
    - [ ] - `sjl.issetAndOfType`
    - [ ] - `sjl.issetObjKeyAndOfType`
    - [ ] - `sjl.isEmptyObjKeyAndOfType`
    - [ ] - `sjl.hasMethod`
    - [ ] - `sjl.hasGetterMethod`
    - [ ] - `sjl.hasSetterMethod`
- [ ] - Write doc sections in main readme for:
    - [ ] - `sjl.issetAndOfType`
    - [ ] - `sjl.issetObjKeyAndOfType`
    - [ ] - `sjl.isEmptyObjKeyAndOfType`
    - [ ] - `sjl.hasMethod`
    - [ ] - `sjl.hasGetterMethod`
    - [ ] - `sjl.hasSetterMethod`

### MVP for 0.5.0:
- [ ] - Write docs for all validator classes.
- [ ] - Write tests for all validator classes:
    - [ ] - `sjl.NumberValidator`.
    - [ ] - `sjl.AlphaNumValidator`.
- [ ] - Write a filter chain class.
- [ ] - Change interface check to check for 'isValid' and 'message'
    properties on a 'AbstractValidator' class passed to a 'ValidatorChain' class.
- [ ] - Review entirety of library and look for places that could be refactored.
- [ ] - Refactor the `input` package
- [ ] - Refactor the `validator` package
- [X] - Update readme to a more readable format.
- [X] - Optimize for file size (maybe put context.sjl into a variable so it can be further minified).
- [X] - Changelog.

### MVP for 0.5.1+
- [X] - Add changelog.md in main readme.

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
