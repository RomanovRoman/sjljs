[![Build Status](https://travis-ci.org/elycruz/sjljs.png)](https://travis-ci.org/elycruz/sjljs) [![GitHub version](https://badge.fury.io/gh/elycruz%2Fsjljs.svg)](http://badge.fury.io/gh/elycruz%2Fsjljs) 
[![NPM version](https://badge.fury.io/js/sjljs.svg)](http://badge.fury.io/js/sjljs)
[![Dependencies](https://david-dm.org/elycruz/sjljs.png)](https://david-dm.org/elycruz/sjljs)
sjljs
=====

A Simple Javascript Library.

Not meant to replace popular libraries (Backbone, Underscore, Jquery etc.)
only meant as a supplement to them.

## Components included:

### Utilities:
- `sjl.argsToArray` - Converts arguments to an array.
- `sjl.camelCase` - Camel Cases a string.
- `sjl.classOf` - Gives you a String representation of the class of value;  e.g., `classOf("hello") === 'String'`.
- `sjl.classOfIs` - Checks that whether a value is of class type;  e.g., `clasOfIs(0, 'Number') === true`.
- `sjl.empty` - Opinionated `empty` check.  Checks if `false`, `0`, `null`, `undefined`, empty array, or empty object is true for one or one of many values.
- `sjl.extractBoolFromArrayEnd` - Extracts a boolean from the end of an array.  If no boolean is found there returns a boolean of value `false`.
- `sjl.extractBoolFromArrayStart` - Extracts a boolean from the beginning of an array.  If no boolean is found at the beginning of the array returns a boolean of value `false`.
- `sjl.isset` - Checks to see that a value(s) is not `null` or `undefined` for one or one of many values.
- `sjl.lcaseFirst` - Lowercases the first character of a string.
- `sjl.namespace` - For getting and setting values on hash objects (allows deep searching by namespace string (`'all.your.base'` finds or sets `{all: {your: {base: ...}}}`).
- `sjl.ucaseFirst` - Uppercases the first character of a string.

### Set functions (operations on objects):
- `extend` - Similiar to JQuery's `extend` method except with the following method signature:
`extend((Boolean|*)[,obj, obj],[Boolean]) : Object`
    - Where `*` is any type of object with type "Object".
    - `obj` is any type of object of type "Object".
    - and the last `[Boolean]` (optional boolean) is passed in to force
    the extend method to use any composite styled set methods that may be available
    for the key being merged on to the first object;  composite styled = `set{keyName}` | `setKeyName`.

    This last item in the list above allows for interesting objects which inherit a waterfall
    like property on instantiation (if you use the `extend` method to merge passed in options on instantiation).

### OOP Util functions:
- `copyOfProto` - Creates a copy of a prototype (backward compatible to older IEs).
- `defineSubClass` - Creates a sub class of a constructor and makes it extendable via the static method `extend`.
- `throwNotOfTypeError` - This method is used internally but is tentative and may be removed later.

### Tests:
- Tests for all components listed under "Utilities" above.
- Tests to be run on server.
- Tests to be run in browser (requires running `bower install` in root directory).

#### Composition helpers:
- `sjl.getValueFromObj` - Allows getting value by namespace string (ex: `'some.object.deep'`) 
also if value is a function automatically calls it and allows you to pass args to use with value if it is 
a function also allows for fetching the value raw if it s a function.
- `sjl.setValueOnObj` - Allows setting a value on an object by namespace string or conjoined setter 
function (setPropertyName) or sets value directly if no setter or namespace string found/used.

#### Classes/Constructors
- `sjl.Attributable` - A base attributable constructor which has two methods attr and attrs (for setting and getting multiple attributes jquery style).
- `sjl.Extendable` - A base extendable constructor with an `extend`.
- `sjl.Iterator` - A simple iterator constructor which mimicks the es6 iterator and the php `Iterator` class.

##### `sjl.Optionable`

    A simple Optionable class with `set`, `get`, `merge`, and `has` methods.

 - `has (String value) :Boolean`  - Takes a regular string or a namespaced string to find out if value exists on the Optionable's object `options` object.
 - `get (String key) :(null|*)`  - Takes a regular string or a namespaced one and pulls out the value from Optionable's `options` object.  Returns null `key` doesn't exist.
 - `set (String key, * value) :Optionable`  - Takes a key and a value param or an object (sets multiple key value pairs in this case).  Key value can be a namespaced string.
    Also if first value is an object then set uses `sjl.setValueOnObj` (see description of this method above) to set values on this Optionable.
 - `merge ((Object|Boolean) param0-*) :Optionable` - Merges all `Object`s passed into it to Optionable's `options` object.  If last param in arguments is a Boolean
 then checks extracts this boolean and passes it on to `sjl.extend` (in an attempt to invoke `extend`'s useLegacyGettersAndSetters` feature if the boolean is true and not invoke the feature to do the merge if the boolean is false).

### Requirements:
- Javascript versions ecmascript 3+

### Supported browsers:
- ie8+, and all other browsers

## Todos:
- [X] - Write tests for `sjl.Optionable`.
- [ ] - Write tests for `sjl.Attributable`.
- [ ] - Write tests for `sjl.getValueFromObj`
- [ ] - Write tests for `sjl.setValueOnObj`
- [ ] - Write tests for `sjl.extend`'s new features
- [ ] - Write tests for `sjl.Iterator`

## License:
[GPL v2-3+](http://www.gnu.org/licenses/gpl-2.0.html "http://www.gnu.org/licenses/gpl-2.0.html") & [MIT](http://opensource.org/licenses/MIT "http://opensource.org/licenses/MIT")
