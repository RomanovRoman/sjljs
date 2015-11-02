/**
 * Created by Ely on 7/21/2014.
 */

'use strict';

(function (context) {

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
                    if (!validators.hasOwnProperty(validator)) {
                        continue;
                    }
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
                if (context.sjl.classOfIs(validators, 'Array')) {
                    for (var i = 0; i < validators.length; i += 1) {
                        this.addValidator(validators[i]);
                    }
                }
                else if (context.sjl.classOfIs(validators, 'Object')) {
                    for (var validator in validators) {
                        if (validator.hasOwnProperty(validator)) {
                            this.addValidator(validators[validator]);
                        }
                    }
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
                    retVal = true,
                    value;
                for (value in _interface) {
                    if (!_interface.hasOwnProperty(value)) {
                        continue;
                    }
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
                    if (!validators.hasOwnProperty(validator)) {
                        continue;
                    }
                    validator = validators[validator];
                    if (!self.verifyHasValidatorInterface(validator)) {
                        throw new Error('A validator with out the validator interface' +
                        'was found in ValidatorChain.  Please check the validators you are passing ' +
                        'in and make sure that they have the validator interface (["isValid", "getMessages"]).');
                    }
                }

                return self;
            }

        });

})(typeof window === 'undefined' ? global : window);
