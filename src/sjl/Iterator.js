/**
 * Created by Ely on 4/12/2014.
 */
(function (context) {

    'use strict';

    var sjl = context.sjl,
        iteratorKey = sjl.Symbol.iterator;

    /**
     * Turns an array into an iterable.
     * @param array {Array}
     * @param pointer {Number|undefined}
     * @returns {*}
     */
    sjl.iterable = function (arrayOrObj, pointer) {
        var classOfArrayOrObj = sjl.classOf(arrayOrObj),
            keys, values;
        if (classOfArrayOrObj === 'Array') {
            arrayOrObj[iteratorKey] = function () {
                return sjl.Iterator(arrayOrObj, pointer);
            };
        }
        else if (classOfArrayOrObj === 'Object') {
            keys = sjl.keys(arrayOrObj);
            values = keys.map(function (key) {
                return arrayOrObj[key];
            });
            arrayOrObj[iteratorKey] = function () {
                return sjl.ObjectIterator(keys, values, pointer);
            }
        }
        return arrayOrObj;
    };

    /**
     * @class sjl.Iterator
     * @extends sjl.Extendable
     * @type {void|Object|*}
     */
    sjl.Iterator = sjl.Extendable.extend(
        function Iterator(values, pointer) {
            // Allow Iterator to be called as a function
            if (!(this instanceof sjl.Iterator)) {
                return new sjl.Iterator(values, pointer);
            }

            // Internalize the `values` collection and pointer here
            // to make this class more functional.
            this.__internal = {
                values: values || [],
                pointer: sjl.classOfIs(pointer, 'Number') ? pointer : 0
            };
        },
        {
            /**
             * Returns the current value that `pointer()` is pointing to.
             * @method sjl.Iterator#current
             * @returns {{done: boolean, value: *}}
             */
            current: function () {
                var self = this;
                return self.valid() ? {
                    done: false,
                    value: self.values()[self.pointer()]
                } : {
                    done: true
                };
            },

            /**
             * Method which returns the current position in the iterator based on where the pointer is.
             * This method also increases the pointer after it is done fetching the value to return.
             * @method sjl.Iterator#next
             * @returns {{done: boolean, value: *}}
             */
            next: function () {
                var self = this,
                    pointer = self.pointer(),
                    retVal = self.valid() ? {
                        done: false,
                        value: self.values()[pointer]
                    } : {
                        done: true
                    };
                self.pointer(pointer + 1);
                return retVal;
            },

            /**
             * Rewinds the iterator.
             * @method sjl.Iterator#rewind
             * @returns {sjl.Iterator}
             */
            rewind: function () {
                return this.pointer(0);
            },

            /**
             * Returns whether the iterator has reached it's end.
             * @method sjl.Iterator#valid
             * @returns {boolean}
             */
            valid: function () {
                return this.pointer() < this.values().length;
            },

            /**
             * Overloaded method for fetching or setting the internal pointer value.
             * @method sjl.Iterator#pointer
             * @param pointer {Number|undefined}
             * @returns {sjl.Iterator|Number}
             */
            pointer: function (pointer) {
                var self = this,
                    isGetterCall = typeof pointer === 'undefined',
                    defaultNum = sjl.classOfIs(self.__internal.pointer, 'Number')
                            ? self.__internal.pointer : 0,
                    retVal = self;
                if (isGetterCall) {
                    retVal = defaultNum;
                }
                // Else set pointer
                else {
                    self.__internal.pointer = sjl.classOfIs(pointer, 'Number') ? pointer : defaultNum;
                }
                return retVal;
            },

            /**
             * Overloaded method for fetching or setting the internal values array.
             * @method sjl.Itertator#values
             * @param values {Array|undefined}
             * @returns {sjl.Iterator|Array}
             */
            values: function (values) {
                var isGetterCall = typeof values === 'undefined',
                    retVal = this,
                    selfCollectionIsArray;
                if (isGetterCall) {
                    retVal = this.__internal.values;
                }
                else {
                    selfCollectionIsArray = sjl.classOfIs(this.__internal.values, 'Array');
                    // Set the internal values collection to `values` if `values` is an array
                    // else if self internal values is an array leave as is
                    // else set internal values to an empty array
                    this.__internal.values =
                        sjl.classOfIs(values, 'Array') ? values :
                            (selfCollectionIsArray ? this.__internal.values : []);
                }
                return retVal;
            }
        });

    /**
     * @class sjl.ObjectIterator
     * @extends sjl.Iterator
     * @type {Object|void|*}
     */
    sjl.ObjectIterator = sjl.Iterator.extend(
        function ObjectIterator (keys, values, pointer) {
            // Allow Iterator to be called as a function
            if (!(this instanceof sjl.ObjectIterator)) {
                return new sjl.ObjectIterator(keys, values, pointer);
            }
            sjl.Iterator.call(this, values, pointer);
            this.__internal.keys = keys;
        },
        {
        /**
         * Returns the current key and value that `pointer()` is pointing to as an array [key, value].
         * @method sjl.Iterator#current
         * @returns {{ done: boolean, value: (Array|undefined) }} - Where Array is actually [<*>, <*>] or of type [any, any].
         */
        current: function () {
            var self = this,
                pointer = self.pointer();
            return self.valid() ? {
                done: false,
                value: [self.keys()[pointer], self.values()[pointer]]
            } : {
                done: true
            };
        },

        /**
         * Method which returns the current position in the iterator based on where the pointer is.
         * This method also increases the pointer after it is done fetching the value to return.
         * @method sjl.Iterator#next
         * @returns {{done: boolean, value: (Array|undefined) }} - Where Array is actually [<*>, <*>] or of type [any, any].
         */
        next: function () {
            var self = this,
                pointer = self.pointer(),
                retVal = self.valid() ? {
                    done: false,
                    value: [self.keys()[pointer], self.values()[pointer]]
                } : {
                    done: true
                };
            self.pointer(pointer + 1);
            return retVal;
        },

        valid: function () {
            var pointer = this.pointer();
            return pointer < this.values().length && pointer < this.keys().length;
        },

        /**
         * Overloaded getter/setter method for internal `keys` property.
         * @returns {sjl.ObjectIterator|Array<*>}
         */
        keys: function (keys) {
            var isGetterCall = typeof keys === 'undefined',
                retVal = this,
                selfCollectionIsArray;
            if (isGetterCall) {
                retVal = this.__internal.keys;
            }
            else {
                selfCollectionIsArray = sjl.classOfIs(this.__internal.keys, 'Array');
                // Set the internal keys collection to `keys` if `keys` is an array
                // else if self internal keys is an array leave as is
                // else set internal keys to an empty array
                this.__internal.keys =
                    sjl.classOfIs(keys, 'Array') ? keys :
                        (selfCollectionIsArray ? this.__internal.keys : []);
            }
            return retVal;
        }

    });

})(typeof window === 'undefined' ? global : window);
