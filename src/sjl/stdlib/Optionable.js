/**
 * Created by Ely on 7/21/2014.
 * @note `set` and `setOptions` are different from the `merge` function in
 *  that they force the use of legacy setters if they are available;
 *  e.g., setName, setSomePropertyName, etc..
 */
(function () {

    'use strict';

    var sjl,
        Optionable,
        isNodeEnv = typeof window === 'undefined';

    if (isNodeEnv) {
        sjl = require('../sjl.js');
    }
    else {
        sjl = window.sjl || {};
    }

    /**
     * Optionable Constructor merges all objects passed in to it's `options` hash.
     * Also this class has convenience methods for querying it's `options` hash (see `get` and `set` methods.
     * @note when using this class you shouldn't have a nested `options` attribute directly within options
     * as this will cause adverse effects when getting and setting properties via the given methods.
     * @class sjl.package.stdlib.Optionable
     * @extends sjl.package.stdlib.Extendable
     * @type {void|sjl.package.stdlib.Optionable}
     */
    Optionable = sjl.package.stdlib.Extendable.extend(function Optionable(/*[, options]*/) {
            this.options = new sjl.package.stdlib.Attributable();
            this.merge.apply(this, arguments);
        },
        {
            /**
             * Sets an option on Optionable's `options` using `sjl.setValueOnObj`;
             *  E.g., `optionable.options = value`;
             * @deprecated - Will be removed in version 1.0.0
             * @method sjl.package.stdlib.Optionable#setOption
             * @param key
             * @param value
             * @returns {sjl.package.stdlib.Optionable}
             */
            setOption: function (key, value) {
                sjl.setValueOnObj(key, value, this.options);
                return this;
            },

            /**
             * Sets each key value pair to  Optionable's `options` using
             *  `sjl.Attributable`'s `attrs` function;
             *  E.g., `optionable.options.attrs(Object);
             * @deprecated - Will be removed in version 1.0.0
             * @method sjl.package.stdlib.Optionable#setOptions
             * @param key {String}
             * @param value {Object}
             * @returns {sjl.package.stdlib.Optionable}
             */
            setOptions: function (options) {
                if (sjl.classOfIs(options, 'Object')) {
                    this.options.attrs(options);
                }
                return this;
            },

            /**
             * Gets an options value by key.
             * @deprecated - Slotted for removal in version 1.0.0
             * @method sjl.package.stdlib.Optionable#getOption
             * @param key {String}
             * @returns {*}
             */
            getOption: function (key) {
                return sjl.getValueFromObj(key, this.options);
            },

            /**
             * Gets options by either array or just by key.
             * @deprecated - Slotted for removal in version 1.0.0
             * @method sjl.package.stdlib.Optionable#getOptions
             * @param options {Array|String}
             * @returns {*}
             */
            getOptions: function (options) {
                var classOfOptions = sjl.classOf(options),
                    retVal = this.options;
                if (classOfOptions === 'Array' || classOfOptions === 'String') {
                    retVal = this.options.attrs(options);
                }
                return retVal;
            },

            /**
             * Gets one or many option values.
             * @method sjl.package.stdlib.Optionable#get
             * @param keyOrArray
             * @returns {*}
             */
            get: function (keyOrArray) {
                return this.getOptions(keyOrArray);
            },

            /**
             * Sets an option (key, value) or multiple options (Object)
             * based on what's passed in.
             * @method sjl.package.stdlib.Optionable#set
             * @param0 {String|Object}
             * @param1 {*}
             * @returns {sjl.package.stdlib.Optionable}
             */
            set: function () {
                var self = this,
                    args = arguments,
                    typeOfArgs0 = sjl.classOf(args[0]);
                if (typeOfArgs0 === 'String') {
                    self.setOption(args[0], args[1]);
                }
                else if (typeOfArgs0 === 'Object') {
                    self.setOptions(args[0]);
                }
                return self;
            },

            /**
             * Checks a key/namespace string ('a.b.c') to see if `this.options`
             *  has a value (a non falsy value otherwise returns `false`).
             * @method sjl.package.stdlib.Optionable#has
             * @param nsString - key or namespace string
             * @returns {Boolean}
             */
            has: function (nsString) {
                return sjl.isset(sjl.searchObj(nsString, this.options));
            },

            /**
             * Merges all objects passed in to `options`.
             * @method sjl.package.stdlib.Optionable#merge
             * @param ...options {Object} - Any number of `Object`s passed in.
             * @param useLegacyGettersAndSetters {Object|Boolean|undefined}
             * @returns {sjl.package.stdlib.Optionable}
             */
            merge: function (options) {
                sjl.extend.apply(sjl, [true, this.options].concat(sjl.argsToArray(arguments)));
                return this;
            }

        });

    if (isNodeEnv) {
        module.exports = Optionable;
    }
    else {
        sjl.package('stdlib.Optionable', Optionable);
    }

})();