/**
 * Created by elydelacruz on 4/16/16.
 */
describe('sjl.isEmpty', function () {

    // ~~~ STRIP ~~~
    // This part gets stripped out when
    // generating browser version of test(s).
    'use strict';
    var chai = require('chai'),
        sjl = require('./../../src/sjl'),
        expect = chai.expect;
    // These variables get set at the top IIFE in the browser.
    // ~~~ /STRIP ~~~

    var emptyTestArgs = [
        [[], '[]'],
        [{}, '{}'],
        ['', '""'],
        [0, '0'],
        [false, 'false'],
        [null, 'null'],
        [undefined, 'undefined']
    ],
        emptyValueReps = emptyTestArgs.map(function (args) {
            return args[1];
        }),
        nonEmptyTestArgs = [
            [['hello'], '["hello"]'],
            [{someProp: 'some-prop-value'}, '{someProp: "some-prop-value"}'],
            ['hello-world', 'hello-world'],
            [1, '1'],
            [-1, '-1'],
            [true, 'true'],
            [function () {}, 'function () {}']
        ],
        nonEmptyValueReps = emptyTestArgs.map(function (args) {
            return args[1];
        });

    it ('should return true for empty values [' + emptyValueReps.join(',') + '].', function () {
        emptyTestArgs.forEach(function (args) {
            expect(sjl.isEmpty(args[0])).to.be.true();
        });
    });

    it ('should return false for non empty values [' + nonEmptyValueReps.join(',') + '].', function () {
        nonEmptyTestArgs.forEach(function (args) {
            expect(sjl.isEmpty(args[0])).to.be.false();
        });
    });

    it ('should return true when no params are passed in.', function () {
        expect(sjl.isEmpty()).to.equal(true);
    });

});
