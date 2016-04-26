[![Build Status](https://travis-ci.org/elycruz/sjljs.png)](https://travis-ci.org/elycruz/sjljs) 
[![GitHub version](https://badge.fury.io/gh/elycruz%2Fsjljs.svg)](http://badge.fury.io/gh/elycruz%2Fsjljs) 
[![NPM version](https://badge.fury.io/js/sjljs.svg)](http://badge.fury.io/js/sjljs)
[![Dependencies](https://david-dm.org/elycruz/sjljs.png)](https://david-dm.org/elycruz/sjljs)
sjljs
=====

A library for writing strongly typed javascript and solid classical oop.  Also for making your applications, components,
and libraries more concise. 

Not meant to replace popular libraries like Backbone, Underscore, or Jquery etc..  Only meant as a supplement to them 
or as a supplement to applications requiring quick ramp up, some semblance of cohesion, and/or applications requiring 
functional programming.

See release notes for release 5.6.0.

## Sections in Readme:
- [Getting Started](#getting-started)
- [Packages and Members](#packagesandmembers)
- [Tests](#tests)
- [Requirements](#requirements)
- [Supported Platforms](#supported-platformss)
- [Todos](#todos)
- [License](#license)

## Getting Started:
Include either the full library './sjl[.min].js' or the minimal version './sjl-minimal[.min].js' (the minimal version
only includes the core and no classes or constructors from it's other packages).

## Packages and members:
** Legend ** 
- **(m)** - Member prefix.  Denotes item is a member;  E.g., A constructor, method or a property.
- **(p)** - Package prefix.  Denotes item is a package.

- [(m) sjl (Sjl Core)](#msjlsjlcore)

- [(p) sjl.stdlib](#psjlstdlib)
    - [(m) sjl.stdlib.Config](#msjlstdlibconfig)
    - [(m) sjl.stdlib.Extendable](#msjlstdlibextendable)  
    - [(m) sjl.stdlib.Iterator](#msjlstdlibiterator)  
    - [(m) sjl.stdlib.ObjectIterator](#msjlstdlibobjectiterator) 
    - [(m) sjl.stdlib.Optionable](#msjlstdliboptionable) 
    - [(m) sjl.stdlib.PriorityList](#msjlstdlibprioritylist)  
    - [(m) sjl.stdlib.SjlMap](#msjlstdlibsjlmap)
    - [(m) sjl.stdlib.SjlSet](#msjlstdlibsjlset) 
     
- [(p) filter](#pfilter)

- [(p) input](#pinput)
    - [(m) input](#minput)
    
- [(p) validators](#pvalidators)

- [(p) nodejs](#pnodejs)
    - [(m) sjl.nodejs.Namespace](#msjlnodejsnamespace)

### sjl (Sjl Core):

A collection of utility functions to assist you in building up your code.
#### Methods:




### Tests:
1.)  Run `npm install` in project root.
- Tests for all components listed under "Utilities" above.
- Tests to be run on server.  See './tests/for-server'.
- Tests to be run in browser (requires running `bower install` in root directory of this project).
See './tests/for-browser'.

## Requirements:
- Javascript versions ecmascript 5+

## Supported Platforms:

### Browsers
- IE9+, and all other modern day browsers.

### NodeJs
- 5.0.0+

## Todos:
### MVP for 0.6.0
- [ ] - @todo Include all sub items for components included as sub nav in readme.
- [ ] - @todo Cleanup all jsdocs and ensure all library members are listed there and showing their docs properly/clearly.
    - @note jsdoc is currently undergoing a refactor by the jsdoc folks.  It is currently in alpha.
- [ ] - @todo Ensure all existing constructors and library members have a test file for theirselves.

## License:
[GPL v2+](http://www.gnu.org/licenses/gpl-2.0.html "http://www.gnu.org/licenses/gpl-2.0.html") AND
[MIT](http://opensource.org/licenses/MIT "http://opensource.org/licenses/MIT")
