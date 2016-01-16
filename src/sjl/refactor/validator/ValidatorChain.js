/**
 * Created by Ely on 7/21/2014.
 */

'use strict';

(function () {
    var isNodeEnv = typeof window === 'undefined',
        sjl = isNodeEnv ? require('../sjl.js') : window.sjl || {},
        contextName = 'sjl.ns.validator.ValidatorChain',
        ObjectIterator = sjl.ns.stdlib.ObjectIterator,
        Validator = sjl.ns.validator.Validator,
        ValidatorChain = function ValidatorChain(/*...options {Object}*/) {
            var _breakChainOnFailure = false,
                _validators = [];
            Object.defineProperties(this, {
                validators: {
                    get: function () {
                        return _validators;
                    },
                    set: function (value) {
                        sjl.throwTypeErrorIfNotOfType(contextName, 'validators', value, Array);
                        _validators = value;
                    }
                },
                breakChainOnFailure: {
                    get: function () {
                        return _breakChainOnFailure;
                    },
                    set: function (value) {
                        sjl.throwTypeErrorIfNotOfType(contextName, 'breakChainOnFailure', value, Boolean);
                        _breakChainOnFailure = value;
                    }
                }
            });

            // Call Validator's constructor on this with some default options
            Validator.apply( this, [{
                    breakChainOnFailure: false
                }].concat(sjl.argsToArray(arguments)) );
        };

    ValidatorChain = Validator.extend(ValidatorChain, {
        isValid: function (value) {
            var self = this,
                retVal,
                validators,
                validator;

            // Set value internally and return it or get it
            value = typeof value === 'undefined' ? self.value : value;

            // Clear any existing messages
            self.clearMessages();

            // Get validators
            validators = self.validators;

            // If we've made it this far validators are good proceed
            for (validator in validators) {
                if (!validators.hasOwnProperty(validator)) {
                    continue;
                }
                validator = validators[validator];
                if (validator.isValid(value)) {
                    continue;
                }

                // Else invalid validator found
                retVal = false;

                // Append error messages
                self.appendMessages(validator.messages);

                // Break chain if necessary
                if (self.breakChainOnFailure) {
                    break;
                }
            }

            // Return result of valid check
            return retVal;
        },

        addValidator: function (validator) {
            var self = this;
            if (this.isValidator(validator)) {
                self.validators.push(validator);
            }
            else {
                this._throwTypeError('addValidator', Validator, validator);
            }
            return self;
        },

        addValidators: function (validators) {
            if (sjl.classOfIs(validators, 'Array')) {
                validators.forEach(function (validator) {
                    this.addValidator(validator);
                }, this);
            }
            else if (sjl.classOfIs(validators, 'Object')) {
                var iterator = new ObjectIterator(validators);
                iterator.forEach(function (value, key) {
                    this.addValidator(value);
                }, this);
            }
            else {
                throw new TypeError( '`' + contextName + '.addValidators` only accepts Arrays or Objects. ' +
                    ' Type Received: "' + sjl.classOf(validators) + '".');
            }
            return this;
        },

        prependValidator: function (validator) {
            if (!this.isValidator(validator)) {
                this._throwTypeError('prependValidator', Validator, validator);
            }
            return this.validators = [validator].concat(this.validators);
        },

        isValidator: function (validator) {
            return validator instanceof Validator;
        },

        isValidatorChain: function (validatorChain) {
            return validatorChain instanceof ValidatorChain;
        },

        mergeValidatorChain: function (validatorChain) {
            if (!this.isValidatorChain(validatorChain)) {
                this._throwTypeError('mergeValidatorChain', ValidatorChain, validatorChain);
            }
            this.breakChainOnFailure = validatorChain.breakChainOnFailure;
            return this.addValidators(validatorChain.validators);
        },

        appendMessages: function (messages) {
            var self = this;
            if (sjl.isEmptyOrNotOfType(messages, Array)) {
                this._throwTypeError('appendMessages', Array, messages);
            }
            self.messages = self.messages.concat(messages);
            return self;
        },

        _throwTypeError: function (funcName, expectedType, value) {
            throw new TypeError('`' + contextName + '.' + funcName + '` only accepts subclasses/types of ' +
                '`' + expectedType.name + '`.  Type received: "' + sjl.classOf(value) + '".');
        }
    });

    if (isNodeEnv) {
        module.exports = ValidatorChain;
    }
    else {
        sjl.ns('validator.ValidatorChain', ValidatorChain);
        if (window._isAmd) {
            return ValidatorChain;
        }
    }

})();

