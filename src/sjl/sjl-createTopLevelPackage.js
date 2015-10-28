/**
 * Created by Ely on 8/17/2015.
 */
module.exports = function (sjl) {

    'use strict';

    /**
     * Makes a property non settable on `obj` and sets `value` as the returnable property.
     * @param obj {Object}
     * @param key {String}
     * @param value {*}
     */
    function makeNotSettableProp(obj, key, value) {
        (function (_obj, _key, _value) {
            Object.defineProperty(_obj, _key, {
                get: function () {
                    return _value;
                }
            });
        }(obj, key, value));
    }

    /**
     * Sets properties on obj passed in and makes those properties unsettable.
     * @param ns_string {String} - Namespace string; E.g., 'all.your.base'
     * @param objToSearch {Object}
     * @param valueToSet {*|undefined}
     * @returns {*} - Found or set value in the object to search.
     * @private
     */
    function namespace(ns_string, objToSearch, valueToSet) {
        var parts = ns_string.split('.'),
            parent = objToSearch,
            shouldSetValue = typeof valueToSet !== 'undefined',
            hasOwnProperty;

        sjl.forEach(parts, function (key, i) {
            hasOwnProperty = parent.hasOwnProperty(key);
            if (i === parts.length - 1
                && shouldSetValue && !hasOwnProperty) {
                makeNotSettableProp(parent, key, valueToSet);
            }
            else if (typeof parent[key] === 'undefined' && !hasOwnProperty) {
                makeNotSettableProp(parent, key, {});
            }
            parent = parent[key];
        });

        return parent;
    }

    /**
     * Package factory method.  Allows object to have a `package` method
     * which acts like java like namespace except it allows you to set
     * it's members (once) and then protects it's members.
     * @param obj {Object|*} - Object to set the `package` method on.
     * @return {Object|*} - Returns passed in `obj`.
     */
    sjl.createTopLevelPackage = function (obj) {
        return (function () {
            /**
             * Private package object.
             * @type {{}}
             */
            var packages = {};

            /**
             * Returns a property from sjl packages.
             * @note If `nsString` is undefined returns the protected packages object itself.
             * @function module:sjl.package
             * @param propName {String}
             * @param value {*}
             * @returns {*}
             */
            obj.package = function (nsString, value) {
                return typeof nsString === 'undefined' ? packages
                    : namespace(nsString, packages, value);
            };

            // Return passed in obj
            return obj;
        }());
    };

};