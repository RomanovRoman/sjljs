/**
 * Created by Ely on 4/21/2014.
 */
var chai = require('chai'),
    expect = chai.expect;

require('./../sjl.js');

describe ('Sjl String', function () {

    var funcToCaseAndResultMap = {
            lcaseFirst: {
                'LOWER-CASE-FIRST-':        'lOWER-CASE-FIRST-',
                '-LOWER-CASE-FIRST-':       '-lOWER-CASE-FIRST-',
                '->%^&*LOWER-CASE-FIRST':   '->%^&*lOWER-CASE-FIRST'
            },
            ucaseFirst: {
                'upper-case-first': 'Upper-case-first',
                '-upper-case-first': '-Upper-case-first',
                '-!@#$%^upper-case-first': '-!@#$%^Upper-case-first'
            },
            camelCase: {
                'to-camel-case1': 'toCamelCase1',
                '-to-camel-case-2': 'toCamelCase2',
                '-!@#$%^to-^&*camel)(*|}{-case$3#@!': 'toCamelCase3',
                'to-class-case1': 'ToClassCase1',
                '-to-class-case-2': 'ToClassCase2',
                '-!@#$%^to-^&*class)(*|}{-case$3#@!': 'ToClassCase3'
            }
    };

    describe('#`lcaseFirst`', function () {
        var map = funcToCaseAndResultMap.lcaseFirst;
        Object.keys(map).forEach(function (key) {
            it('should convert "' + key + '" ~~ to ~~ "' + map[key] + '"', function () {
                expect(sjl.lcaseFirst(key)).to.equal(map[key]);
            });
        });
    });

    describe('#`ucaseFirst`', function () {
        var map = funcToCaseAndResultMap.ucaseFirst;
        Object.keys(map).forEach(function (key) {
            it('should convert "' + key + '" ~~ to ~~ "' + map[key] + '"', function () {
                expect(sjl.ucaseFirst(key)).to.equal(map[key]);
            });
        });
    });

    describe('#`camelCase`', function () {
        var map = funcToCaseAndResultMap.camelCase;
        Object.keys(map).forEach(function (key) {
            it('should convert "' + key + '" ~~ to ~~ "' + map[key] + '"', function () {
                if (key.toLowerCase().indexOf('class') !== -1) {
                    expect(sjl.camelCase(key, true)).to.equal(map[key]);
                }
                else {
                    console.log(sjl.camelCase(key, true));
                    expect(sjl.camelCase(key)).to.equal(map[key]);
                }
            });
        });
    });

});