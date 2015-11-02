/**
 * Created by elydelacruz on 11/2/15.
 */

(function () {


    'use strict';

    var sjl,
        Iterator,
        ObjectIterator,
        isNodeEnv = typeof window === 'undefined';

    if (isNodeEnv) {
        sjl = require('../sjl.js');
    }
    else {
        sjl = window.sjl || {};
    }

    Iterator = sjl.package.stdlib.Iterator;
    ObjectIterator = sjl.package.stdlib.ObjectIterator;

    /**
     * Turns an array into an iterable.
     * @param array {Array}
     * @param pointer {Number|undefined}
     * @function module:sjl.iterable
     * @returns {*}
     */
    sjl.iterable = function (arrayOrObj, pointer) {
        var classOfArrayOrObj = sjl.classOf(arrayOrObj),
            keys, values;
        if (classOfArrayOrObj === 'Array') {
            arrayOrObj[sjl.Symbol.iterator] = function () {
                return new Iterator(arrayOrObj, pointer);
            };
        }
        else if (classOfArrayOrObj === 'Object') {
            keys = sjl.keys(arrayOrObj);
            values = keys.map(function (key) {
                return arrayOrObj[key];
            });
            arrayOrObj[sjl.Symbol.iterator] = function () {
                return new ObjectIterator(keys, values, pointer);
            }
        }
        else {
            throw new Error('sjl.iterable only takes objects or arrays.  ' +
                'arrayOrObj param recieved type is "' + classOfArrayOrObj + '".  Value recieved: ' + arrayOrObj);
        }
        return arrayOrObj;
    };

    if (isNodeEnv) {
        module.exports = sjl.iterable;
    }
    // Else do nothing since function is already set on `sjl`

}());