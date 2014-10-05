/**! sjl.js Sat Oct 04 2014 21:51:11 GMT-0400 (Eastern Daylight Time) **//**
 * Created by Ely on 5/24/2014.
 * Defines argsToArray, classOfIs, classOf, empty,
 *  isset, keys, and namespace, on the passed in context.
 * @param {Object} context
 * @returns void
 */
(function (context) {

    context.sjl = context.sjl || {};

    var slice = Array.prototype.slice,
        notLCaseFirst = typeof context.sjl.lcaseFirst !== 'function',
        notUCaseFirst = typeof context.sjl.ucaseFirst !== 'function';

    if (typeof context.sjl.argsToArray !== 'function') {
        context.sjl.argsToArray = function (args) {
            return slice.call(args, 0, args.length);
        };
    }

    if (typeof context.sjl.isset !== 'function') {

        /**
         * Checks to see if value is set (not null and not undefined).
         * @param value
         * @returns {boolean}
         */
        function isSet(value) {
            return (value !== undefined && value !== null);
        }

        /**
         * Checks to see if any of the arguments passed in are
         * set (not undefined and not null).
         * Returns false on the first argument encountered that
         * is null or undefined.
         * @returns {boolean}
         */
        context.sjl.isset = function () {
            var retVal = false,
                check;

            if (arguments.length > 1) {
                for (var i in arguments) {
                    i = arguments[i];
                    check = isSet(i);
                    if (!check) {
                        retVal = check;
                        break;
                    }
                }
            }
            else if (arguments.length === 1) {
                retVal = isSet(arguments[0]);
            }

            return retVal;
        };
    }

    if (typeof context.sjl.classOf !== 'function') {
        /**
         * Returns the class name of an object from it's class string.
         * @param val {mixed}
         * @returns {string}
         */
        context.sjl.classOf = function (val) {
            return typeof val === 'undefined' ? 'Undefined' :
                (val === null ? 'Null' :
                    (function () {
                        var retVal = Object.prototype.toString.call(val);
                        return retVal.substring(8, retVal.length - 1);
                    }()));
        };
    }

    if (typeof context.sjl.classOfIs !== 'function') {

        /**
         * Checks to see if an object is of type humanString (class name) .
         * @param humanString {string} (class string; I.e., "Number", "Object", etc.)
         * @param obj {mixed}
         * @returns {boolean}
         */
        context.sjl.classOfIs = function (obj, humanString) {
            return context.sjl.classOf(obj) === humanString;
        };
    }

    if (typeof context.sjl.empty !== 'function') {
        /**
         * Checks object's own properties to see if it is empty.
         * @param obj object to be checked
         * @returns {boolean}
         */
        function isEmptyObj(obj) {
            var retVal = obj === true ? false : true;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    retVal = false;
                    break;
                }
            }
            return retVal;
        }

        /**
         * Checks to see if value is empty (objects, arrays,
         * strings etc.).
         * @param value
         * @returns {boolean}
         */
        function isEmptyValue(value) {
            var retVal;

            // If value is an array or a string
            if (context.sjl.classOfIs(value, 'Array') || context.sjl.classOfIs(value, 'String')) {
                retVal = value.length === 0;
            }

            // If value is a number and is not 0
            else if (context.sjl.classOfIs(value, 'Number') && value !== 0) {
                retVal = false;
            }

            // Else
            else {
                retVal = (value === 0 || value === false
                    || value === undefined || value === null
                    || isEmptyObj(value));
            }

            return retVal;
        }

        /**
         * Checks to see if any of the arguments passed in are empty.
         * @returns {boolean}
         */
        context.sjl.empty = function () {
            var retVal, check,
                i, item,
                args = context.sjl.argsToArray(arguments);

            // If multiple arguments
            if (args.length > 1) {

                // No empties empties until proven otherwise
                retVal = false;

                // Loop through args and check their values
                for (i = 0; i < args.length - 1; i += 1) {
                    item = args[i];
                    check = isEmptyValue(item);
                    if (check) {
                        retVal = true;
                        break;
                    }
                }
            }

            // If one argument
            else if (args.length === 1) {
                retVal = isEmptyValue(args[0]);
            }

            // If no arguments
            else {
                retVal = true;
            }

            return retVal;
        };
    }

    if (typeof context.sjl.namespace !== 'function') {
        /**
         * Takes a namespace string and fetches that location out from
         * an object/Map.  If the namespace doesn't exists it is created then
         * returned.
         * Example: namespace('hello.world.how.are.you.doing', obj) will
         * create/fetch within `obj`:
         * hello: { world: { how: { are: { you: { doing: {} } } } } }
         * @param ns_string {String} the namespace you wish to fetch
         * @param objToSearch {Object} object to search for namespace on
         * @param valueToSet {Object} optional, a value to set on the key
         *  (last key if key string (a.b.c.d = value))
         * @returns {Object}
         */
        context.sjl.namespace = function (ns_string, objToSearch, valueToSet) {
            var parts = ns_string.split('.'),
                parent = objToSearch,
                shouldSetValue = context.sjl.classOfIs(valueToSet, 'Undefined')
                    ? false : true,
                i;

            for (i = 0; i < parts.length; i += 1) {
                if (context.sjl.classOfIs(parent[parts[i]], 'Undefined') && !shouldSetValue) {
                    parent[parts[i]] = {};
                }
                else if (i === parts.length - 1 && shouldSetValue) {
                    parent[parts[i]] = valueToSet;
                }
                parent = parent[parts[i]];
            }

            return parent;
        };
    }

    if (notLCaseFirst || notUCaseFirst) {
        /**
         * Used when composing a function that needs to operate on the first character found and needs to
         * return the original string with the modified character within it.
         * @see sjl.lcaseFirst or sjl.ucaseFirst (search within this file)
         * @param str {String} - string to search for first alpha char on
         * @param func {String} - function to run on first alpha char found; i.e., found[func]()
         * @param thisFuncsName {String} - the function name that is using this function (in order
         *      to present a prettier error message on `TypeError`)
         * @throws {TypeError} - If str is not of type "String"
         * @returns {String} - composed string
         */
        function changeCaseOfFirstChar (str, func, thisFuncsName) {
            var search, char, right, left;

            // If typeof `str` is not of type "String" then bail
            if (!context.sjl.classOfIs(str, 'String')) {
                throw new TypeError(thisFuncsName + ' expects parameter 1 ' +
                    'to be of type "String".  ' +
                    'Value received: "' + context.sjl.classOf(str) + '".');
            }

            // Search for first alpha char
            search = str.search(/[a-z]/i);

            // If alpha char
            if (context.sjl.classOfIs(search, 'Number') && search > -1) {

                // Make it lower case
                char = str.substr(search, 1)[func]();

                // Get string from `char`'s index
                right = str.substr(search + 1, str.length - 1);

                // Get string upto `char`'s index
                left = search !== 0 ? str.substr(0, search) : '';

                // Concatenate original string with lower case char in it
                str = left + char + right;
            }

            return str;
        }
    }

    if (notLCaseFirst) {
        /**
         * Lower cases first character of a string.
         * @param {String} str
         * @throws {TypeError}
         * @returns {String}
         */
        context.sjl.lcaseFirst = function (str) {
            return changeCaseOfFirstChar (str, 'toLowerCase', 'lcaseFirst');
        }
    }

    if (notUCaseFirst) {
        /**
         * Upper cases first character of a string.
         * @param {String} str
         * @returns {String}
         */
        context.sjl.ucaseFirst = function (str) {
            return changeCaseOfFirstChar (str, 'toUpperCase', 'ucaseFirst');
        };
    }

    if (typeof context.sjl.camelCase) {

        /**
         * Make a string code friendly. Camel cases a dirty string into
         * a valid javascript variable/constructor name;  Uses `replaceStrRegex`
         * to replace unwanted characters with a '-' and then splits and merges
         * the parts with the proper casing, pass in `true` for lcaseFirst
         * to lower case the first character.
         * @param {String} str
         * @param {Boolean} lowerFirst default `false`
         * @param {Regex} replaceStrRegex default /[^a-z0-9] * /i (without spaces before and after '*')
         * @returns {String}
         */
        context.sjl.camelCase = function (str, upperFirst, replaceStrRegex) {
            upperFirst = upperFirst || false;
            replaceStrRegex = replaceStrRegex || /[^a-z\d]/i;
            var newStr = "", i,

            // Get clean string
                parts = str.split(replaceStrRegex);

            // Upper Case First char for parts
            for (i = 0; i < parts.length; i += 1) {

                // If alpha chars
                if (/[a-z\d]/.test(parts[i])) {

                    // ucase first char and append to new string,
                    // if part is a digit just gets returned by `ucaseFirst`
                    newStr += context.sjl.ucaseFirst(parts[i]);
                }
            }

            // If should not be upper case first
            if (!upperFirst) {
                // Then lower case first
                newStr = context.sjl.lcaseFirst(newStr);
            }

            return newStr;
        };
    }

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 5/24/2014.
 * ** Cartesian functions copied from "Javascript the definitive guide"
 * ** getValueFromObj and setValueOnObj are not from "Javascript ..."
 */
(function (context) {

    context.sjl = context.sjl || {};

    if (typeof context.sjl.extractBoolFromArrayStart !== 'function'
        && typeof  context.sjl.extractBoolFromArrayEnd !== 'function') {

        /**
         * Extracts a boolean from the beginning or ending of an array depending on startOrEndBln.
         * @todo ** Note ** Closure within this function is temporary and should be removed.
         * @param array {Array}
         * @param startOrEnd {Boolean}
         * @returns {Boolean}
         */
        function extractBoolFromArray (array, startOrEndBln) {
            var expectedBool = startOrEndBln ? array[0] : array[array.length];
            return context.sjl.classOfIs(expectedBool, 'Boolean') ?
                (startOrEndBln ? array.shift() : array.pop()) :
                (context.sjl.classOfIs(expectedBool, 'Undefined') ? (function () { array.pop(); return false; }()) : false);
        }

        /**
         * Returns boolean from beginning of array if any.  If item at beginning of array is undefined returns `false`.
         * @param array {Array}
         * @returns {Boolean}
         */
        context.sjl.extractBoolFromArrayStart = function (array) {
            return extractBoolFromArray(array, true);
        };

        /**
         * Returns boolean from beginning of array if any.  If item at beginning of array is undefined returns `false`.
         * @param array {Array}
         * @returns {Boolean}
         */
        context.sjl.extractBoolFromArrayEnd = function (array) {
            return extractBoolFromArray(array, false);
        };
    }

    if (typeof context.sjl.clone !== 'function') {
        /**
         * Returns copy of object.
         * @param obj
         * @returns {*}
         */
        context.sjl.clone = function (obj) {
            return  context.sjl.extend({}, obj);
        };
    }

    if (typeof context.sjl.getValueFromObj !== 'function') {
        /**
         * Searches obj for key and returns it's value.  If value is a function
         * calls function, with optional `args`, and returns it's return value.
         * If `raw` is true returns the actual function if value found is a function.
         * @method getValueFromObj
         * @param key {String} The hash key to search for
         * @param obj {Object} the hash to search within
         * @param args {Array} optional the array to pass to value if it is a function
         * @param raw {Boolean} optional whether to return value even if it is a function
         * @todo allow this function to use getter function for key if it exists
         * @returns {*}
         */
        context.sjl.getValueFromObj = function (key, obj, args, raw) {
            args = args || null;
            raw = raw || false;
            var retVal = null;
            if (context.sjl.classOfIs(key, 'String') && context.sjl.isset(obj)) {
                retVal = key.indexOf('.') !== -1 ? context.sjl.namespace(key, obj) :
                    (typeof obj[key] !== 'undefined' ? obj[key] : null);
                if (context.sjl.classOfIs(retVal, 'Function') && context.sjl.empty(raw)) {
                    retVal = args ? retVal.apply(obj, args) : retVal.apply(obj);
                }
            }
            return retVal;
        };
    }

    if (typeof context.sjl.setValueOnObj !== 'function') {
        /**
         * Sets a key to value on obj.
         * @param key {String} - Key to search for (can be a dot
         * separated string 'all.your.base' will traverse {all: {your: {base: {...}}})
         * @param value {*} - Value to set on obj
         * @param obj {Object} - Object to set key to value on
         * @returns {*|Object} returns result of setting key to value on obj or obj
         * if no value resulting from set operation
         */
        context.sjl.setValueOnObj = function (key, value, obj) {
            // Get qualified setter function name
            var setterFunc = 'set' + context.sjl.camelCase(key, true),
                retVal = obj;

            // If obj has a setter function for key, call it
            if (context.sjl.isset(obj[setterFunc])) {
                retVal = obj[setterFunc](value);
            }

            // Else set the value on the obj
            else if (key.indexOf('.') !== -1) {
                retVal = context.sjl.namespace(key, value, obj);
            }

            else {
                obj[key] = typeof value !== 'undefined' ? value : null;
            }

            // Return result of setting value on obj, else return obj
            return retVal;
        };
    }

    if (typeof context.sjl.extend === 'undefined') {
        /**
         * Copy the enumerable properties of p to o, and return o.
         * If o and p have a property by the same name, o's property is overwritten.
         * This function does not handle getters and setters or copy attributes but
         * does search for setter methods in the format "setPropertyName" and uses them
         * if they are available for property `useLegacyGettersAndSetters` is set to true.
         * @param o {mixed} - *object to extend
         * @param p {mixed} - *object to extend from
         * @param deep {Boolean} - Whether or not to do a deep extend (run extend on each prop if prop value is of type 'Object')
         * @param useLegacyGettersAndSetters {Boolean} - Whether or not to use sjl.setValueOnObj for setting values (only works if not using the `deep` the feature or `deep` is `false`)
         * @returns {*} - returns o
         */
        function extend (o, p, deep, useLegacyGettersAndSetters) {
            for (var prop in p) { // For all props in p.
                if (deep) {
                    if (!context.sjl.empty(o[prop])
                        && !context.sjl.empty(o[prop])
                        && context.sjl.classOfIs(o[prop], 'Object')
                        && context.sjl.classOfIs(p[prop], 'Object')) {
                        context.sjl.extend(deep, o[prop], p[prop]);
                    }
                    else {
                        o[prop] = p[prop];
                    }
                }
                else if (useLegacyGettersAndSetters) {
                    context.sjl.setValueOnObj(prop,
                        context.sjl.getValueFromObj(prop, p), o); // Add the property to o.
                }
                else {
                    o[prop] = p[prop];
                }
            }
            return o;
        }

        context.sjl.extend = function () {
            // Return if no arguments
            if (arguments.length === 0) {
                return;
            }

            var args = context.sjl.argsToArray(arguments),
                deep = context.sjl.extractBoolFromArrayStart(args),
                useLegacyGettersAndSetters = context.sjl.extractBoolFromArrayEnd(args),
                arg0 = args.shift();

            // Extend object `0` with other objects
            for (arg in args) {
                arg = args[arg];

                // Extend `arg0` if `arg` is an object
                if (sjl.classOfIs(arg, 'Object')) {
                    extend(arg0, arg, deep, useLegacyGettersAndSetters);
                }
            }

            return arg0;
        };
    }

    if (typeof context.sjl.merge === 'undefined') {
        /**
         * Copy the enumerable properties of p to o, and return o.
         * If o and p have a property by the same name, o's property is left alone.
         * This function does not handle getters and setters or copy attributes.
         * @param o {mixed} - *object to merge to
         * @param p {mixed} - *object to merge from
         * @returns {*} - returns o
         */
        context.sjl.merge = function (o, p) {
            for (prop in p) { // For all props in p.
                if (o.hasOwnProperty[prop]) continue; // Except those already in o.
                o[prop] = p[prop]; // Add the property to o.
            }
            return o;
        };
    }

    if (typeof context.sjl.subtract === 'undefined') {
        /**
         * For each property of p, delete the property with the same name from o.
         * Return o.
         */
        context.sjl.subtract = function (o, p) {
            for (prop in p) { // For all props in p
                delete o[prop]; // Delete from o (deleting a
                // nonexistent prop is harmless)
            }
            return o;
        };
    }

    if (typeof context.sjl.restrict === 'undefined') {
        /**
         * Remove properties from o if there is not a property with the same name in p.
         * Return o.
         */
        context.sjl.restrict = function (o, p) {
            for (prop in o) { // For all props in o
                if (!(prop in p)) delete o[prop]; // Delete if not in p
            }
            return o;
        };
    }

    if (typeof context.sjl.union === 'undefined') {
        /**
         * Return a new object that holds the properties of both o and p.
         * If o and p have properties by the same name, the values from p are used.
         */
        context.sjl.union = function (o, p, deep, useLegacyGettersAndSetters) {
            return context.sjl.extend(deep, context.sjl.clone(o), p, useLegacyGettersAndSetters);
        };
    }

    if (typeof context.sjl.intersection === 'undefined') {
        /**
         * Return a new object that holds only the properties of o that also appear
         * in p. This is something like the intersection of o and p, but the values of
         * the properties in p are discarded
         */
        context.sjl.intersection = function (o, p) {
            return context.sjl.restrict(context.sjl.clone(o), p);
        };
    }

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 5/24/2014.
 */
(function (context) {

    if (typeof Function.prototype.extend === 'undefined') {
        /**
         * Make functions/constructors extendable
         * @param constructor {function}
         * @param methods {object} - optional
         * @param statics {mixed|object|null|undefined} - optional
         * @todo refactor this.  Figure out a way not to extend `Function`
         * @returns {*}
         */
        Function.prototype.extend = function (constructor, methods, statics) {
            return context.sjl.defineSubClass(this, constructor, methods, statics);
        };
    }

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 5/24/2014.
 */
(function (context) {

    if (typeof context.sjl.copyOfProto === 'undefined') {
        /**
         * Creates a copy of a prototype to use for inheritance.
         * @param proto
         * @returns {*}
         */
        context.sjl.copyOfProto = function (proto) {
            if (proto == null) throw TypeError('`inherit` function expects param1 to be a non-null value.'); // p must be a non-null object
            if (Object.create) // If Object.create() is defined...
                return Object.create(proto); // then just use it.
            var type = typeof proto; // Otherwise do some more type checking
            if (type !== "object" && type !== "function") throw TypeError();
            function func() {
            } // Define a dummy constructor function.
            func.prototype = proto; // Set its prototype property to p.
            return new func();
        };
    }

    if (typeof context.sjl.defineSubClass === 'undefined') {

        /**
         * Helper function which creates a constructor using `val` as a string
         * or just returns the constructor if `val` is a constructor.
         * @param val
         * @returns {*}
         * @throws {Error} - If can't resolve constructor from `val`
         */
        function resolveConstructor (val) {
            // Check if is string and hold original string
            // Check if is string and hold original string
            var isString = sjl.classOfIs(val, 'String'),
                originalString = val,
                _val = val;

            // If constructor is a string, create it from string
            if (isString) {

                // Make sure constructor has uppercased first letter
                _val = sjl.camelCase(_val, true);

                try {
                    // Evaluate string as constructor
                    eval('_val = function ' + _val + '(){}');
                }
                catch (e) {
                    // Else throw error
                    throw new Error('An error occurred while trying to define a ' +
                        'sub class using: "' + originalString + '" as a sub class in `sjl.defineSubClass`.  ' +
                        'In unminified source: "./src/sjl/sjl-oop-util-functions.js"')
                }
            }

            // If not a constructor and is original string
            if (!sjl.classOfIs(_val, 'Function') && isString) {
                throw new Error ('Could not create constructor from string: "' + originalString + '".');
            }

            // If not a constructor and not a string
            else if (!sjl.classOfIs(_val, 'Function') && !isString) {
                throw new Error ('`sjl.defineSubClass` requires constructor ' +
                    'or string to create a subclass of "' +
                    '.  In unminified source "./src/sjl/sjl-oop-util-functions.js"');
            }

            return _val;
        }

        /**
         * Defines a subclass using a `superclass`, `constructor`, methods and/or static methods
         * @param superclass {Function}
         * @param constructor {Function}
         * @param methods {Object} - optional
         * @param statics {Object} - optional
         * @returns {*}
         */
        context.sjl.defineSubClass = function (superclass, // Constructor of the superclass
                                               constructor, // The constructor for the new subclass
                                               methods, // Instance methods: copied to prototype
                                               statics) // Class properties: copied to constructor
        {
            var _constructor = resolveConstructor(constructor);

            // Set up the prototype object of the subclass
            _constructor.prototype = context.sjl.copyOfProto(superclass.prototype);

            // Define constructor's constructor
            _constructor.prototype.constructor = constructor;

            // Copy the methods and statics as we would for a regular class
            if (methods) context.sjl.extend(_constructor.prototype, methods);

            // If static functions set them
            if (statics) context.sjl.extend(_constructor, statics);

            // Return the class
            return _constructor;
        };

    }

    if (typeof context.sjl.throwNotOfTypeError === 'undefined') {
        context.sjl.throwNotOfTypeError = function (value, paramName, funcName, expectedType) {
            throw Error(funcName + ' expects ' + paramName +
                ' to be of type "' + expectedType + '".  Value received: ' + value);
        };
    }

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 4/12/2014.
 * Code copy pasted from "Javascript the definitive guide"
 */
(function (context) {
    /**
     * The `Extendable` constructor
     * @constructor
     */
    function Extendable() {}

    // Get a handle to Extendable's prototype
    var proto = Extendable.prototype;

    /**
     * Creates a subclass off of `constructor`
     * @param constructor {Function}
     * @param methods {Object} - optional
     * @param statics {Object} - optional
     * @returns {*}
     */
    proto.extend = function (constructor, methods, statics) {
        return context.sjl.defineSubClass(this, constructor, methods, statics);
    };

    context.sjl.Extendable = Extendable;

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 6/21/2014.
 */
(function (context) {

    context.sjl = context.sjl || {};

    context.sjl.Attributable = context.sjl.Extendable.extend(function Attributable () {},{

        /**
         * Gets or sets a collection of attributes.
         * @param attrs {mixed|Array|Object} - Attributes to set or get from object
         * @todo add an `attr` function to this class
         * @returns {context.sjl.Attributable}
         */
        attrs: function (attrs) {
            var self = this,
                retVal = self;
            switch(context.sjl.classOf(attrs)) {
                case 'Array':
                    retVal = self._getAttribs(attrs);
                    break;
                case 'Object':
                    context.sjl.extend(self, attrs, true, true);
                    break;
                default:
                    retVal = self._getAttribs(attrs);
                    break;
            }
            return retVal;
        },

        /**
         * Gets a set of attributes hash for queried attributes.
         * @param attribsList {Array} - Attributes list to return
         * @returns {*}
         * @private
         */
        _getAttribs: function (attrsList) {
            var attrib,
                out = {},
                self = this;

            // If attribute list is not an array
            if (!context.sjl.classOfIs(attrsList, 'Array')) {
                return;
            }

            // Loop through attributes to get and set them for return
            for (attrib in attrsList) {
                attrib = attrsList[attrib];
                out[attrib] = typeof self[attrib] !== 'undefined'
                    ? context.sjl.getValueFromObj(attrib, self) : null;
            }

            // Return queried attributes
            return out;
        }

    });
})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 7/21/2014.
 */
(function (context) {

    context.sjl = context.sjl || {};

    context.sjl.Optionable = context.sjl.Extendable.extend(function Optionable(options) {
            this.options = new context.sjl.Attributable();
            if (context.sjl.classOfIs(options, 'Object')) {
                this.setOptions(options);
            }
        },
        {
            setOption: function (key, value) {
                context.sjl.setValueOnObj(key, value, this.options);
                return this;
            },

            setOptions: function (options) {
                if (context.sjl.classOfIs(options, 'Object')) {
                    this.options.attrs(options);
                }
                return this;
            },

            getOption: function (key) {
                return context.sjl.getValueFromObj(key, this.options);
            },

            getOptions: function (options) {
                var retVal = null;
                if (context.sjl.classOfIs(options, 'Array')) {
                    retVal = this.options.attrs(options);
                }
                return retVal;
            }
        });

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 7/21/2014.
 * Initial idea borrowed from Zend Framework 2's Zend/Validator
 */
(function (context) {

    context.sjl = context.sjl || {};
    context.sjl.validator = context.sjl.isset(context.sjl.validator) ? context.sjl.validator : {};

    context.sjl.AbstractValidator =

        context.sjl.Optionable.extend(function AbstractValidator(options) {
                var self = this;

                // Extend with optionable and set preliminary defaults
                context.sjl.Optionable.call(self, {
                    messages: [],
                    messageTemplates: {},
                    messageVariables: {},
                    messagesMaxLength: 100,
                    valueObscured: false,
                    value: null
                });

                // Merge custome templates in if they are set
                if (context.sjl.isset(options.customMessageTemplates)) {
                    customTemplates = options.customMessageTemplates;
                    options.customeMessageTemplates = null;
                    delete options.customeMessageTemplates;
                    self.setCustomMessageTemplates(customTemplates);
                }

                // Set passed in options if (any)
                self.setOptions(options);

            },
            {
                getMessagesMaxLength: function () {
                    var self = this,
                        maxMessageLen = self.getOption('maxMessagesLength');
                    return context.sjl.classOfIs(maxMessageLen, 'Number') ? maxMessageLen: -1;
                },

                getMessages: function () {
                    var self = this,
                        messages = self.getOption('messages');
                    return context.sjl.classOfIs(messages, 'Array') ? messages : [];
                },

                setMessages: function (messages) {
                    this.options.messages = context.sjl.classOfIs(messages, 'Array') ? messages : [];
                    return this;
                },

                clearMessages: function () {
                    this.options.messages = [];
                },

                isValid: function (value) {
                    throw Error("Can not instantiate `AbstractValidator` directly, all class named with " +
                        "a prefixed \"Abstract\" should not be instantiated.");
                },

                isValueObscured: function () {
                    var self = this,
                        valObscured = self.getOption('valueObscured');
                    return context.sjl.classOfIs(valObscured, 'Boolean') ? valObscured : false;
                },

                setValue: function (value) {
                    this.options.value = value;
                    this.options.messages = [];
                    return this;
                },

                getValue: function (value) {
                    var self = this;
                    return !context.sjl.classOfIs(value, 'Undefined') ? (function () {
                        self.setValue(value);
                        return value;
                    })() : this.getOption('value');
                },

                addErrorByKey: function (key) {
                    var self = this,
                        messageTemplate = self.getOption('messageTemplates'),
                        messages = self.getOption('messages');

                    // If key is string
                    if (context.sjl.classOfIs(key, 'String') &&
                        context.sjl.isset(messageTemplate[key])) {
                        if (typeof messageTemplate[key] === 'function') {
                            messages.push(messageTemplate[key].apply(self));
                        }
                        else if (context.sjl.classOfIs(messageTemplate[key], 'String')) {
                            messages.push(messageTemplate[key]);
                        }
                    }
                    else if (context.sjl.classOfIs(key, 'function')) {
                        messages.push(key.apply(self));
                    }
                    else {
                        messages.push(key);
                    }
                    return self;
                },

                getMessageTemplates: function () {
                    return this.options.messageTemplates;
                },

                setMessageTemplates: function (templates) {
                    if (!sjl.classOfIs(templates, 'Object')) {
                        throw new Error('`AddToBagModel.setMessageTemplates` ' +
                            'expects parameter 1 to be of type "Object".');
                    }
                    this.options.messagesTemplates = templates;
                    return this;
                },

                updateMessageTemplates: function (templates) {
                    var self = this;
                    if (!sjl.classOfIs(templates, 'Object')) {
                        throw new Error('`AddToBagModel.updateMessageTemplates` ' +
                            'expects parameter 1 to be of type "Object".');
                    }
                    self.options.messageTemplates = sjl.extend(self.getMessageTemplates(), templates);
                    return self;
                }

            });

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 7/21/2014.
 */
(function (context) {

    context.sjl = context.sjl || {};

    context.sjl.ValidatorChain = context.sjl.AbstractValidator.extend(
        function ValidatorChain(options) {

            // Call AbstractValidator's constructor on this with some default options
            context.sjl.AbstractValidator.call(this, {
                breakChainOnFailure: false
            });

            // Set options passed, if any
            this.setOptions(options);

        }, {
            isValid: function (value) {
                var self = this,
                    retVal = true,
                    validators,
                    validator;

                // Set value internally and return it or get it
                value = self.getValue(value);

                // If an incorrectly implemented validator is found in chain
                // throws an error.
                self.verifyValidatorsInChain();

                // Clear any existing messages
                self.clearMessages();

                // Get validators
                validators = self.getValidators();

                // If we've made it this far validators are good proceed
                for (validator in validators) {
                    validator = validators[validator];
                    if (validator.isValid(value)) {
                        continue;
                    }

                    // Else invalid validator found
                    retVal = false;
                    self.appendMessages(validator.getMessages());
                    if (self.getOption('breakChainOnFailure')) {
                        break;
                    }
                }

                return retVal;
            },

            addValidator: function (validator) {
                var self = this;
                if (self.verifyHasValidatorInterface(validator)) {
                    self.getValidators().push(validator);
                }
                else {
                    throw new Error('addValidator of ValidatorChain only ' +
                        'accepts validators that have the validator ' +
                        'interface ([\'isValid\', \'getMessages\'])');
                }
                return self;
            },

            addValidators: function (validators) {
                for (var validator in validators) {
                    this.addValidator(validators[validator]);
                }
            },

            addByName: function (value) {
                // @todo flesh this method out
            },

            prependByName: function (value) {
                // @todo flesh this method out
            },

            mergeValidatorChain: function (validatorChain) {
                // @todo flesh this method out
            },

            appendMessages: function (messages) {
                var self = this;
                self.setMessages(self.getMessages().concat(messages));
                return self;
            },

            getValidators: function () {
                var self = this;
                if (!context.sjl.isset(self.options.validators)) {
                    self.options.validators = [];
                }
                return self.options.validators;
            },

            setValidators: function (validators) {
                if (context.sjl.classOfIs(validators, 'Array')) {
                    this.addValidators(validators);
                }
                else {
                    throw new Error('`setValidators` of `ValidatorChain` expects ' +
                        '`param1` to be of type "Array".');
                }
                return this;
            },

            verifyHasValidatorInterface: function (validator) {
                var _interface = ['isValid', 'getMessages'],
                    retVal = true;
                for (value in _interface) {
                    value = _interface[value];
                    if (!context.sjl.isset(validator[value]) ||
                        typeof validator[value] !== 'function') {
                        retVal = false;
                        break;
                    }
                }
                return retVal;
            },

            verifyValidatorsInChain: function (validatorChain) {

                var self = this,
                    validators,
                    validator;

                // Get validtor chain
                validatorChain = validatorChain || self;

                // Get validators
                validators = validatorChain.getValidators();

                for (validator in validators) {
                    validator = validators[validator];
                    if (!self.verifyHasValidatorInterface(validator)) {
                        throw new Error("A validator with out the validator interface" +
                            "was found in ValidatorChain.  Please check the validators you are passing " +
                            "in and make sure that they have the validator interface (['isValid', 'getMessages']).")
                        break;
                    }
                }

                return self;
            }

        });

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 7/21/2014.
 * Initial idea copied from the Zend Framework 2's Between Validator
 */
(function (context) {

    function throwNotIntError (value, paramName, funcName, expectedType) {
        throw Error(funcName + ' expects ' + paramName +
            ' to be of type "' + expectedType + '".  Value received: ' + value);
    }

    context.sjl = context.sjl || {};

    context.sjl.InRangeValidator = context.sjl.AbstractValidator.extend(function InRangeValidator (options) {

        // Set defaults and extend with abstract validator
        context.sjl.AbstractValidator.call(this, {
            min: 0,
            messageTemplates: {
                NOT_IN_RANGE_EXCLUSIVE: function () {
                    return 'The input value is not exclusively between "' + this.getMin() + '" and "' + this.getMax() + '".';
                },
                NOT_IN_RANGE_INCLUSVE: function () {
                    return 'The input value is not inclusively between "' + this.getMin() + '" and "' + this.getMax() + '".';
                },
                INVALID_TYPE: function () {
                    return 'The value "' + this.getValue() + '" is expected to be of type "Number".';
                }
            },
            inclusive: true,
            max: 9999
        });

        // Set options passed, if any
        this.setOptions(options);

    }, {
        isValid: function (value) {
            var self = this,
                retVal = false;

            value = context.sjl.isset(value) ? value : self.getValue();

            if (!context.sjl.classOfIs(value, 'Number')) {
                self.addErrorByKey('INVALID_TYPE');
                return retVal;
            }

            if (self.getInclusive()) {
                retVal = value >= this.getMin() && value <= this.getMax();
                if (!retVal) {
                    self.addErrorByKey('NOT_IN_RANGE_INCLUSVE');
                }
            }
            else {
                retVal = value > this.getMin() && value < this.getMax();
                if (!retVal) {
                    self.addErrorByKey('NOT_IN_RANGE_EXCLUSIVE');
                }
            }
            return retVal;
        },

        getMin: function () {
            return this.getOption('min');
        },

        getMax: function () {
            return this.getOption('max');
        },

        getInclusive: function () {
            return this.getOption('inclusive');
        },

        setMin: function (min) {
            if (context.sjl.classOfIs(min, 'Number')) {
                return this.setOption('min', min);
            }
            throwNotIntError(min, 'min', 'InRangeValidator.setMin', 'Number');
        },

        setMax: function (max) {
            if (context.sjl.classOfIs(max, 'Number')) {
                return this.setOption('max', max);
            }
            throwNotIntError(max, 'max', 'InRangeValidator.setMax', 'Number');
        },

        setInclusive: function (value) {
            if (context.sjl.classOfIs(value, 'Boolean')) {
                return this.setOption('inclusive', value);
            }
            throwNotIntError(value, 'parameter 1', 'InRangeValidator.setInclusive', 'Boolean');
        }

    });

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 7/21/2014.
 */
(function (context) {

    context.sjl = context.sjl || {};

    context.sjl.RegexValidator = context.sjl.AbstractValidator.extend(
        function RegexValidator(options) {

            // Set defaults and extend with abstract validator
            context.sjl.AbstractValidator.call(this, {
                pattern: /./,
                messageTemplates: {
                    DOES_NOT_MATCH_PATTERN: function () {
                        return 'The value passed in does not match pattern"'
                            + this.getPattern() + '".  Value passed in: "'
                            + this.getValue() + '".';
                    }
                }
            });

            // Set options passed, if any
            this.setOptions(options);

        }, {
            isValid: function (value) {
                var self = this,
                    retVal = false;

                // Clear any existing messages
                self.clearMessages();

                // Set and get or get value (gets the set value if value is undefined
                value = self.getValue(value);

                // Run the test
                retVal = self.getPattern().test(value);

                // Clear messages before checking validity
                if (self.getMessages().length > 0) {
                    self.clearMessages();
                }

                // If test failed
                if (retVal === false) {
                    self.addErrorByKey('DOES_NOT_MATCH_PATTERN');
                }

                return retVal;
            },

            getPattern: function () {
                return this.options.pattern;
            },

            setPattern: function (pattern) {
                if (context.sjl.classOfIs(pattern, 'RegExp')) {
                    this.clearMessages();
                    return this.options.pattern = pattern;
                }
                throw new Error('RegexValidator.setPattern expects `pattern` ' +
                    'to be of type "RegExp".  Type and value recieved: type: "' +
                    context.sjl.classOf(pattern) + '"; value: "' + pattern + '"');
            }

        });

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 7/24/2014.
 */
/**
 * Created by Ely on 7/21/2014.
 */
(function (context) {

    context.sjl = context.sjl || {};

    context.sjl.Input = context.sjl.Optionable.extend(
        function Input(options) {
            var name = null;

            if (context.sjl.classOfIs(options, 'String')) {
                name = options;
            }

            // Set defaults as options on this class
            context.sjl.Optionable.call(this, {
                allowEmpty: false,
                continueIfEmpty: false,
                breakOnFailure: false,
                fallbackValue: null,
                filterChain: null,
                name: name,
                required: true,
                validatorChain: null,
                value: null,
                messages: []
            });

            // Only functions on objects;  Will
            // ignore options if it is a string
            this.setOptions(options);

        }, {

            /**
             * This is a crude implementation
             * @todo review if we really want to have fallback value
             *      functionality for javascript
             * @returns {boolean}
             */
            isValid: function (value) {

                var self = this,
                    validatorChain,
                    retVal = false;

                // Clear messages
                self.clearMessages();

                if (!self.getContinueIfEmpty()) {
                    // inject non empty validator
                }

                // Get the validator chain, value and validate
                validatorChain = self.getValidatorChain();
                value = value || self.getValue();
                retVal = validatorChain.isValid(value);

                // Fallback value
                if (retVal === false && self.hasFallbackValue()) {
                    self.setValue(self.getFallbackValue());
                    retVal = true;
                }

                // Set messages internally
                self.setMessages();

                return retVal;
            },

            getInputFilter: function () {
                return this.options.inputFilter;
            },

            setInputFilter: function (value) {
                this.options.inputFilter = value;
            },

            getFilterChain: function () {
                return this.options.filterChain;
            },

            setFilterChain: function (value) {
                this.options.filterChain = value;
            },

            getValidatorChain: function () {
                var self = this;
                if (!context.sjl.isset(self.options.validatorChain)) {
                    self.options.validatorChain = new context.sjl.ValidatorChain({
                        breakOnFailure: self.getBreakOnFailure()
                    });
                }
                return self.options.validatorChain;
            },

            setValidatorChain: function (value) {
                if (context.sjl.classOfIs(value, 'Object')
                    && context.sjl.isset(value.validators)) {
                    this.getValidatorChain().setOption('validators', value.validators);
                }
                else {
                    this.options.validatorChain = value;
                }
                return this;
            },

            getName: function () {
                return this.options.name;
            },

            setName: function (value) {
                this.options.name = value;
            },

            getRawValue: function () {
                return this.options.rawValue;
            },

            setRawValue: function (value) {
                this.options.rawValue = value;
            },

            getValue: function (value) {
                return this.options.value;
            },

            setValue: function (value) {
                this.options.value =
                    this.options.rawValue = value;
            },

            getFallbackValue: function () {
                return this.options.fallbackValue;
            },

            setFallbackValue: function (value) {
                this.options.fallbackValue = value;
            },

            hasFallbackValue: function () {
                return !context.sjl.classOfIs(this.getFallbackValue(), 'Undefined') &&
                    !context.sjl.classOfIs(this.getFallbackValue(), 'Null');
            },

            getRequired: function () {
                return this.options.required;
            },

            setRequired: function (value) {
                this.options.required = value;
            },

            getAllowEmpty: function () {
                return this.options.allowEmpty;
            },

            setAllowEmpty: function (value) {
                this.options.allowEmpty = value;
            },

            getBreakOnFailure: function () {
                return this.options.breakOnFailure;
            },

            setBreakOnFailure: function (value) {
                this.options.breakOnFailure = value;
            },

            getContinueIfEmpty: function () {
                return this.options.breakOnFailure;
            },

            setContinueIfEmpty: function (value) {
                this.options.continueIfEmpty = value;
            },

            clearMessages: function () {
                this.options.messages = [];
            },

            setMessages: function (messages) {
                var self = this;
                if (context.sjl.classOfIs(messages, 'Array')) {
                    self.options.messages = messages;
                }
                else {
                    self.options.messages = self.getValidatorChain().getMessages();
                }
                return self;
            },

            getMessages: function () {
                var self = this;
                if (!context.sjl.isset(self.options.messages)) {
                    self.options.messages = [];
                }
                return self.options.messages;
            }
        });

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 7/24/2014.
 */
(function (context) {

    context.sjl = context.sjl || {};

    context.sjl.InputFilter = context.sjl.Optionable.extend(

        function InputFilter(options) {

            // Set defaults as options on this class
            context.sjl.Optionable.call(this, {
                data: [],
                inputs: {},
                invalidInputs: [],
                validInputs: [],
                validationGroup: null
            });

            this.setOptions(options);

        }, {

            // @todo beef up add, get, and has methods (do param type checking before using param)
            add: function (value) {
                if (value instanceof context.sjl.Input) {
                    this.getInputs()[value.getName()] = value;
                }

                return this;
            },

            get: function (value) {
                return this.getInputs()[value];
            },

            has: function (value) {
                return this.getInputs().hasOwnProperty(value);
            },

            isValid: function () {
                var self = this,
                    inputs = self.getInputs(),
                    data = self.getData();

                self.clearInvalidInputs();
                self.clearValidInputs();

                // Populate inputs with data
                self.setDataOnInputs();


                // If no data bail and throw an error
                if (context.sjl.empty(data)) {
                    throw new Error("InputFilter->isValid could\'nt " +
                        "find any data for validation.");
                }

                return self.validateInputs(inputs, data);
            },

            validateInput: function (input, dataMap) {
                var name = input.getName(),
                    dataExists = context.sjl.isset(dataMap[name]),
                    data = dataExists ? dataMap[name] : null,
                    required = input.getRequired(),
                    allowEmpty = input.getAllowEmpty(),
                    continueIfEmpty = input.getContinueIfEmpty(),
                    retVal = true;

                // If data doesn't exists and input is not required
                if (!dataExists && !required) {
                    retVal = true;
                }

                // If data doesn't exist, input is required, and input allows empty value,
                // then input is valid only if continueIfEmpty is false;
                else if (!dataExists && required && allowEmpty && !continueIfEmpty) {
                    retVal = true;
                }

                // If data exists, is empty, and not required
                else if (dataExists && context.sjl.empty(data) && !required) {
                    retVal = true;
                }

                // If data exists, is empty, is required, and allows empty,
                // then input is valid if continue if empty is false
                else if (dataExists && context.sjl.empty(data) && required
                    && allowEmpty && !continueIfEmpty) {
                    retVal = true;
                }

                else if (!input.isValid()) {
                    retVal = false;
                }

                return retVal;
            },

            validateInputs: function (inputs, data) {
                var self = this,
                    validInputs = {},
                    invalidInputs = {},
                    retVal = true,

                    // Input vars
                    input, name;

                // Get inputs
                inputs = inputs || self.getInputs();

                // Get data
                data = data || self.getRawValues();

                // Validate inputs
                for (input in inputs) {
                    name = input;
                    input = inputs[input];

                    // @todo Check that input has the required interface(?)
                    if (self.validateInput(input, data)) {
                        validInputs[name] = input;
                    }
                    else {
                        invalidInputs[name] = input;
                    }
                }

                // If no invalid inputs then validation passed
                if (context.sjl.empty(invalidInputs)) {
                    retVal = true;
                }
                // else validtion failed
                else {
                    retVal = false;
                }

                // Set valid inputs
                self.setOption('validInputs', validInputs);

                // Set invalid inputs
                self.setOption('invalidInputs', invalidInputs);

                return retVal;
            },

            setInputs: function (inputs) {
                var self = this,
                    input, name,
                    validators;

                // Set default inputs value if inputs is not of type "Object"
                if (!context.sjl.classOfIs(inputs, 'Object')) {
                    self.options.inputs = inputs = {};
                }

                // Populate inputs
                for (input in inputs) {
                    name = input;

                    validators = self._getValidatorsFromInputHash(inputs[input]);
                    inputs[input].validators = null;
                    delete inputs[input].validators;

                    // Set name if it is not set
                    if (!context.sjl.isset(inputs[input].name)) {
                      inputs[input].name = name;
                    }

                    // Create input
                    input = new context.sjl.Input(inputs[input]);

                    // Set input's validators
                    input.getValidatorChain().addValidators(validators);

                    // Save input
                    self.options.inputs[input.getName()] = input;
                }

                return self;
            },

            getInputs: function () {
                var self = this;
                if (!context.sjl.classOfIs(self.options.inputs, 'Object')) {
                    self.options.inputs = {};
                }
                return self.options.inputs;
            },

            remove: function (value) {
                var self = this,
                    inputs = self.options.inputs;
                if (inputs.hasOwnProperty(value)) {
                    inputs[value] = null;
                    delete self.options.inputs[value];
                }
                return self;
            },

            setData: function (data) {
                var self = this;
                self.options.data = data;
                return self;
            },

            getData: function () {
                return this.options.data;
            },

            setValidationGroup: function () {
            },

            setValidationGroup: function () {
            },

            getInvalidInputs: function () {
                if (!context.sjl.classOfIs(this.options.invalidInputs, 'Object')) {
                    this.options.invalidInputs = {};
                }
                return this.options.invalidInputs;
            },

            getValidInputs: function () {
                if (!context.sjl.classOfIs(this.options.validInputs, 'Object')) {
                    this.options.validInputs = {};
                }
                return this.options.validInputs;
            },

            getRawValues: function () {
                var self = this,
                    rawValues = {},
                    input,
                    invalidInputs = self.getInvalidInputs();

                for (input in invalidInputs) {
                    input = invalidInputs[input];
                    rawValues[input.getName()] = input.getRawValue();
                }
                return rawValues;
            },

            getValues: function () {
                var self = this,
                    values = {},
                    input,
                    invalidInputs = self.getInvalidInputs();

                for (input in invalidInputs) {
                    input = invalidInputs[input];
                    values[input.getName()] = input.getValue();
                }
                return values;
            },

            getMessages: function () {
                var self = this,
                    messages = {},
                    input, key,
                    invalidInputs = self.getInvalidInputs();

                for (key in invalidInputs) {
                    input = invalidInputs[key];
                    messages[input.getName()] = input.getMessages();
                }
                return messages;
            },

            setDataOnInputs: function (data) {
                var self = this,
                    inputs = self.getInputs(),
                    key;

                data = data || self.getData();

                for (key in data) {
                    if (!context.sjl.isset(inputs[key])
                         || !context.sjl.isset(data[key])) {
                        continue;
                    }
                    inputs[key].setValue(data[key]);
                }
            },

            clearValidInputs: function () {
                this.setOption('validInputs', {});
            },

            clearInvalidInputs: function () {
                this.setOption('invalidInputs', {});
            },

            _getValidatorsFromInputHash: function (inputHash) {
                return context.sjl.isset(inputHash.validators) ? inputHash.validators : null;
            }

        }, {

            factory: function (inputSpec) {
                if (!context.sjl.classOfIs(inputSpec, 'Object')
                    || !context.sjl.isset(inputSpec.inputs)) {
                    throw new Error("InputFilter class expects param 1 to be of type \"Object\".");
                }
                var inputFilter = new context.sjl.InputFilter();
                inputFilter.setInputs(inputSpec.inputs);
                return inputFilter;
            },

            VALIDATE_ALL: 0

        });

})(typeof window === 'undefined' ? global : window);

/**
 * Created by Ely on 4/12/2014.
 */
(function (context) {

    context.sjl.Iterator = context.sjl.Extendable.extend(
        function Iterator(values, pointer) {
            this.collection = values || [];
            this.pointer = pointer || 0;
        },
        {
            current: function () {
                var self = this;
                return {
                    done: this.valid(),
                    value: self.getCollection()[self.getPointer()]
                };
            },

            next: function () {
                var self = this,
                    pointer = self.getPointer()

                self.pointer = pointer += 1;

                return {
                    done: self.valid(),
                    value: self.getCollection()[pointer]
                };
            },

            rewind: function () {
                this.pointer = 0;
            },

            valid: function () {
                return this.getCollection().length - 1 <= this.getPointer();
            },

            getPointer: function () {
                return /^\d+$/.test(this.pointer + '') ? 0 : this.pointer;
            },

            getCollection: function () {
                return context.sjl.classOfIs(this.collection, 'Array') ? this.collection : [];
            }

        });

})(typeof window === 'undefined' ? global : window);
