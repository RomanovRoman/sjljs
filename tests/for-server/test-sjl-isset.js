/**
 * Created by elydelacruz on 4/16/16.
 */
describe ('sjl.isset', function () {

    // ~~~ STRIP ~~~
    // This part gets stripped out when
    // generating browser version of test(s).
    'use strict';
    var chai = require('chai'),
        sjl = require('./../../src/sjl'),
        expect = chai.expect;
    // These variables get set at the top IIFE in the browser.
    // ~~~ /STRIP ~~~

    it('should return false for null value.', function () {
        expect(sjl.isset(null)).to.equal(false);
    });
    it('should return false for undefined value.', function () {
        expect(sjl.isset(undefined)).to.equal(false);
    });
    it('should return true for a defiend value (1).', function () {
        // Defined values
        [true, false, function () {}, 'hello', {}].forEach(function (value) {
            expect(sjl.isset(value)).to.equal(true);
        });
    });
    it('should return `false` when called without arguments.', function () {
        expect(sjl.isset()).to.be.false();
    });
});
