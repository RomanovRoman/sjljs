/**
 * Created by Ely on 7/21/2014.
 * Initial idea borrowed from Zend Framework 2's Zend/Validator
 */

'use strict';

(function () {

    var isNodeEnv = typeof window === 'undefined',
        sjl = isNodeEnv ? require('../sjl.js') : window.sjl || {},
        Optionable = sjl.package.stdlib.Optionable,
        BaseValidator = function BaseValidator(options) {
            var self = this,
                customTemplates;

            // Extend with optionable and set preliminary defaults
            Optionable.call(self, {
                messages: [],
                messageTemplates: {},
                messageVariables: {},
                messagesMaxLength: 100,
                valueObscured: false,
                value: null
            });

            // Merge custom templates in if they are set
            if (sjl.isset(options.customMessageTemplates)) {
                customTemplates = options.customMessageTemplates;
                options.customeMessageTemplates = null;
                delete options.customeMessageTemplates;
                self.setCustomMessageTemplates(customTemplates);
            }

            // Set passed in options if (any)
            self.setOptions(options);
        };

    BaseValidator = Optionable.extend(BaseValidator, {
        getMessagesMaxLength: function () {
            var self = this,
                maxMessageLen = self.getOption('maxMessagesLength');
            return sjl.classOfIs(maxMessageLen, 'Number') ? maxMessageLen : -1;
        },

        getMessages: function () {
            var self = this,
                messages = self.getOption('messages');
            return sjl.classOfIs(messages, 'Array') ? messages : [];
        },

        setMessages: function (messages) {
            this.options.messages = sjl.classOfIs(messages, 'Array') ? messages : [];
            return this;
        },

        clearMessages: function () {
            this.options.messages = [];
        },

        isValid: function (value) {
            throw Error('Can not instantiate `BaseValidator` directly, all class named with ' +
                'a prefixed "Base" should not be instantiated.');
        },

        isValueObscured: function () {
            var self = this,
                valObscured = self.getOption('valueObscured');
            return sjl.classOfIs(valObscured, 'Boolean') ? valObscured : false;
        },

        setValue: function (value) {
            this.options.value = value;
            this.options.messages = [];
            return this;
        },

        getValue: function (value) {
            var self = this;
            return !sjl.classOfIs(value, 'Undefined') ? (function () {
                self.setValue(value);
                return value;
            })() : this.getOption('value');
        },

        value: function (value) {
            var classOfValue = sjl.classOf(value),
                retVal = this.get('value');
            if (classOfValue !== 'Undefined') {
                this.options.value = value;
                retVal = this;
            }
            return retVal;
        },

        addErrorByKey: function (key) {
            var self = this,
                messageTemplate = self.getOption('messageTemplates'),
                messages = self.getOption('messages');

            // If key is string
            if (sjl.classOfIs(key, 'String') &&
                sjl.isset(messageTemplate[key])) {
                if (typeof messageTemplate[key] === 'function') {
                    messages.push(messageTemplate[key].apply(self));
                }
                else if (sjl.classOfIs(messageTemplate[key], 'String')) {
                    messages.push(messageTemplate[key]);
                }
            }
            else if (sjl.classOfIs(key, 'function')) {
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
            self.options.messageTemplates = sjl.extend(true, self.getMessageTemplates(), templates);
            return self;
        }

    });

    if (isNodeEnv) {
        module.exports = BaseValidator;
    }
    else {
        sjl.package('validator.BaseValidator', BaseValidator);
    }

})();