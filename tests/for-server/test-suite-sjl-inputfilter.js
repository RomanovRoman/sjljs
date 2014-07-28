/**
 * Created by edelacruz on 7/28/2014.
 */
/**
 * Created by edelacruz on 7/28/2014.
 */
// Make test suite directly interoperable with the browser
if (typeof window === 'undefined') {
    var chai = require('chai');
    require('./../../sjl.js');
}

// Get chai.expect
if (typeof expect === 'undefined') {
    var expect = chai.expect;
}

describe('Sjl InputFilter', function () {

    "use strict";

    describe ('Should have the appropriate interface', function () {
        var inputFilter = new sjl.input.InputFilter();
        var methods = [
            'add', 'get','has',
            'remove', 'setData', 'getData',
            'isValid', 'getInvalidInputs',
            'getValidInputs', 'getValue',
            'getValues', 'getRawValue',
            'getRawValues',
            'getMessages'
        ],
            method;

        for (method in methods) {
            method = methods[method];
            it ('it should a `' + method + '`.', function () {
                expect(typeof inputFilter[method]).to.equal('function');
            });
        }
    });

    it ('Should have a static method "factory"', function () {
        expect (typeof sjl.input.InputFilter.factory).to.equal('function');
    });

    describe ('Should create an autopopulated instance via it\'s static method "factory"', function () {
        var inputFilter = sjl.input.InputFilter.factory({
            inputs: {
                'id': {
                    required: true,
                    validators: [
                        new sjl.validator.RegexValidator({pattern: /^\d{1,20}$/})
                    ]
                },
                'alias': {
                    required: false,
                    validators: [
                        new sjl.validator.RegexValidator({pattern: /^[a-z\-_\d]{1,55}$/i})
                    ]
                }
            }
        });

        it ('should have 2 new created inputs', function () {
            expect(Object.keys(inputFilter.getInputs()).length).to.equal(2);
        });

        it ('should validate to true on valid values', function () {
            // Set data
            inputFilter.setData({id: 999, alias: 'hello-world'});
            expect(Object.keys(inputFilter.getMessages()).length).to.equal(0);
            console.log(inputFilter.getMessages());
        });

        it ('should validate to false on invalid values and should have error messages for each input datum', function () {
            // Set data
            inputFilter.setData({id: '99abc', alias: 'hello -world'});
            expect(Object.keys(inputFilter.getMessages()).length).to.equal(2);
            console.log(inputFilter.getMessages());
        });

    });

});



