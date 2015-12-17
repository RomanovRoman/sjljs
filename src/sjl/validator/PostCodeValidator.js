/**
 * Created by Ely on 4/22/2015.
 */
/**
 * Created by Ely on 7/21/2014.
 */

'use strict';

(function () {
    var isNodeEnv = typeof window === 'undefined',
        sjl = isNodeEnv ? require('../sjl.js') : window.sjl || {},
        BaseValidator = sjl.ns.validator.BaseValidator,
        PostCodeValidator = function PostCodeValidator(options) {

            // Set defaults and extend with Base validator
            BaseValidator.call(this, {
                region: 'US',
                format: null,
                service: null,
                loose: false,
                loosePostCodeRegexes: {
                    'GB': /^[ABCDEFGHIJKLMNOPRSTUWYZ]([ABCDEFGHKLMNOPQRSTUVWXY]\d[ABEHMNPRVWXY]|\d[ABCDEFGHJKPSTUW]|\d\d?|[ABCDEFGHKLMNOPQRSTUVWXY]\d\d?)(\s?\d[ABDEFGHJLNPQRSTUVWXYZ]{2})?$/i
                },
                postCodeRegexes: {
                    'GB': /^[A-PR-UWYZ]([A-HK-Y]\d[ABEHMNPRVWXY]|\d[A-HJKPSTUW]|\d\d?|[A-HK-Y]\d\d?)(\s?\d[A-HJLNP-Z]{2})?$/i,
                    //'GB': 'GIR\\s?0AA|^((A[BL]|B[ABDHLNRST]|C[ABFHMORTVW]|D[ADEGHLNTY]|E[CHNX]|F[KY]|G[LYU]|H[ADGPRSUX]|' +
                    //    'I[GMPV]|JE|K[ATWY]|L[ADELNSU]{0,1}|M[EKL]{0,1}|N[EGNPRW]{0,1}|O[LX]|P[AEHLOR]|R[GHM]|' +
                    //    'S[AEGKLMNOPRSTWY]{0,1}|T[ADFNQRSW]|UB|W[ACDFNRSV]|YO|ZE)' +
                    //    '(\\d[\\dA-Z]?\\s?\\d[ABD-HJLN-UW-Z]{2}))$|^BFPO\\s?\\d{1,4}',
                    'JE': 'JE\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}',
                    'GG': 'GY\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}',
                    'IM': 'IM\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}',
                    'US': '\\d{5}([ \\-]\\d{4})?',
                    'CA': '[ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z](?:[ ]\\d[ABCEGHJ-NPRSTV-Z]\\d)?',
                    'DE': '\\d{5}',
                    'JP': '\\d{3}-\\d{4}',
                    'FR': '(?!(0{2})|(9(6|9))[ ]?\\d{3})(\\d{2}[ ]?\\d{3})',
                    'AU': '\\d{4}',
                    'IT': '\\d{5}',
                    'CH': '\\d{4}',
                    'AT': '\\d{4}',
                    'ES': '\\d{5}',
                    'NL': '\\d{4}[ ]?[A-Z]{2}',
                    'BE': '\\d{4}',
                    'DK': '\\d{4}',
                    'SE': '\\d{3}[ ]?\\d{2}',
                    'NO': '(?!0000)\\d{4}',
                    'BR': '\\d{5}[\\-]?\\d{3}',
                    'PT': '\\d{4}([\\-]\\d{3})?',
                    'FI': '\\d{5}',
                    'AX': '22\\d{3}',
                    'KR': '\\d{3}[\\-]\\d{3}',
                    'CN': '\\d{6}',
                    'TW': '\\d{3}(\\d{2})?',
                    'SG': '\\d{6}',
                    'DZ': '\\d{5}',
                    'AD': 'AD\\d{3}',
                    'AR': '([A-HJ-NP-Z])?\\d{4}([A-Z]{3})?',
                    'AM': '(37)?\\d{4}',
                    'AZ': '\\d{4}',
                    'BH': '((1[0-2]|[2-9])\\d{2})?',
                    'BD': '\\d{4}',
                    'BB': '(BB\\d{5})?',
                    'BY': '\\d{6}',
                    'BM': '[A-Z]{2}[ ]?[A-Z0-9]{2}',
                    'BA': '\\d{5}',
                    'IO': 'BBND 1ZZ',
                    'BN': '[A-Z]{2}[ ]?\\d{4}',
                    'BG': '\\d{4}',
                    'KH': '\\d{5}',
                    'CV': '\\d{4}',
                    'CL': '\\d{7}',
                    'CR': '\\d{4,5}|\\d{3}-\\d{4}',
                    'HR': '\\d{5}',
                    'CY': '\\d{4}',
                    'CZ': '\\d{3}[ ]?\\d{2}',
                    'DO': '\\d{5}',
                    'EC': '([A-Z]\\d{4}[A-Z]|(?:[A-Z]{2})?\\d{6})?',
                    'EG': '\\d{5}',
                    'EE': '\\d{5}',
                    'FO': '\\d{3}',
                    'GE': '\\d{4}',
                    'GR': '\\d{3}[ ]?\\d{2}',
                    'GL': '39\\d{2}',
                    'GT': '\\d{5}',
                    'HT': '\\d{4}',
                    'HN': '(?:\\d{5})?',
                    'HU': '\\d{4}',
                    'IS': '\\d{3}',
                    'IN': '\\d{6}',
                    'ID': '\\d{5}',
                    'IE': '((D|DUBLIN)?([1-9]|6[wW]|1[0-8]|2[024]))?',
                    'IL': '\\d{5}',
                    'JO': '\\d{5}',
                    'KZ': '\\d{6}',
                    'KE': '\\d{5}',
                    'KW': '\\d{5}',
                    'LA': '\\d{5}',
                    'LV': '\\d{4}',
                    'LB': '(\\d{4}([ ]?\\d{4})?)?',
                    'LI': '(948[5-9])|(949[0-7])',
                    'LT': '\\d{5}',
                    'LU': '\\d{4}',
                    'MK': '\\d{4}',
                    'MY': '\\d{5}',
                    'MV': '\\d{5}',
                    'MT': '[A-Z]{3}[ ]?\\d{2,4}',
                    'MU': '(\\d{3}[A-Z]{2}\\d{3})?',
                    'MX': '\\d{5}',
                    'MD': '\\d{4}',
                    'MC': '980\\d{2}',
                    'MA': '\\d{5}',
                    'NP': '\\d{5}',
                    'NZ': '\\d{4}',
                    'NI': '((\\d{4}-)?\\d{3}-\\d{3}(-\\d{1})?)?',
                    'NG': '(\\d{6})?',
                    'OM': '(PC )?\\d{3}',
                    'PK': '\\d{5}',
                    'PY': '\\d{4}',
                    'PH': '\\d{4}',
                    'PL': '\\d{2}-\\d{3}',
                    'PR': '00[679]\\d{2}([ \\-]\\d{4})?',
                    'RO': '\\d{6}',
                    'RU': '\\d{6}',
                    'SM': '4789\\d',
                    'SA': '\\d{5}',
                    'SN': '\\d{5}',
                    'SK': '\\d{3}[ ]?\\d{2}',
                    'SI': '\\d{4}',
                    'ZA': '\\d{4}',
                    'LK': '\\d{5}',
                    'TJ': '\\d{6}',
                    'TH': '\\d{5}',
                    'TN': '\\d{4}',
                    'TR': '\\d{5}',
                    'TM': '\\d{6}',
                    'UA': '\\d{5}',
                    'UY': '\\d{5}',
                    'UZ': '\\d{6}',
                    'VA': '00120',
                    'VE': '\\d{4}',
                    'ZM': '\\d{5}',
                    'AS': '96799',
                    'CC': '6799',
                    'CK': '\\d{4}',
                    'RS': '\\d{6}',
                    'ME': '8\\d{4}',
                    'CS': '\\d{5}',
                    'YU': '\\d{5}',
                    'CX': '6798',
                    'ET': '\\d{4}',
                    'FK': 'FIQQ 1ZZ',
                    'NF': '2899',
                    'FM': '(9694[1-4])([ \\-]\\d{4})?',
                    'GF': '9[78]3\\d{2}',
                    'GN': '\\d{3}',
                    'GP': '9[78][01]\\d{2}',
                    'GS': 'SIQQ 1ZZ',
                    'GU': '969[123]\\d([ \\-]\\d{4})?',
                    'GW': '\\d{4}',
                    'HM': '\\d{4}',
                    'IQ': '\\d{5}',
                    'KG': '\\d{6}',
                    'LR': '\\d{4}',
                    'LS': '\\d{3}',
                    'MG': '\\d{3}',
                    'MH': '969[67]\\d([ \\-]\\d{4})?',
                    'MN': '\\d{6}',
                    'MP': '9695[012]([ \\-]\\d{4})?',
                    'MQ': '9[78]2\\d{2}',
                    'NC': '988\\d{2}',
                    'NE': '\\d{4}',
                    'VI': '008(([0-4]\\d)|(5[01]))([ \\-]\\d{4})?',
                    'PF': '987\\d{2}',
                    'PG': '\\d{3}',
                    'PM': '9[78]5\\d{2}',
                    'PN': 'PCRN 1ZZ',
                    'PW': '96940',
                    'RE': '9[78]4\\d{2}',
                    'SH': '(ASCN|STHL) 1ZZ',
                    'SJ': '\\d{4}',
                    'SO': '\\d{5}',
                    'SZ': '[HLMS]\\d{3}',
                    'TC': 'TKCA 1ZZ',
                    'WF': '986\\d{2}',
                    'YT': '976\\d{2}'
                },
                messageTemplates: {
                    INVALID_VALUE_TYPE: function () {
                        return 'The postal code passed in does not match any postal code formats in our database.'
                            + '  Value passed in: "' + this.value() + '".';
                    },
                    REGION_NOT_FOUND: function () {
                        return 'Unable to verify postal code "' + this.value() + '" for region '
                            + this.region() + '" was found.';
                    },
                    INVALID_VALUE: function () {
                        return 'The input does not appear to be a postal code.  Input received: "' + this.value() + '".';
                    },
                    SERVICE: 'The input does not appear to be a postal code',
                    SERVICE_FAILURE: 'An exception has been raised while validating the input'
                }
            });

            // Set options passed, if any
            this.setOptions(options);

        };

    PostCodeValidator = BaseValidator.extend(PostCodeValidator, {
        isValid: function (value) {
            var self = this,
                retVal = false,
                classOfValue,
                countryCode = self.region().toUpperCase(),
                postCodeRegexes,
                format;

            // Clear any existing messages
            self.clearMessages();

            // Set and get
            value = value || self.value();

            classOfValue = sjl.classOf(value);

            // If value is not a String or is empty (0, false, '', {}, [], null, undefined);,
            // set 'invalid type' error
            if (classOfValue !== 'String' || sjl.empty(value)) {
                self.addErrorByKey('INVALID_VALUE_TYPE');
            }

            // Get regexes
            postCodeRegexes = this.get('postCodeRegexes');

            if (!postCodeRegexes.hasOwnProperty(countryCode)) {
                self.addErrorByKey('REGION_NOT_FOUND');
            }

            // Get format regex
            format = this.format(postCodeRegexes[countryCode]).format();

            // Run the test
            retVal = format.test(value);

            // If test failed
            if (retVal === false) {
                self.addErrorByKey('INVALID_VALUE');
            }

            return retVal;
        },

        region: function (region) {
            var classOfLocale = sjl.classOf(region),
                retVal = this.get('region');
            if (classOfLocale !== 'String' && classOfLocale !== 'Undefined') {
                throw new Error('');
            }
            if (classOfLocale !== 'Undefined') {
                this.set('region', region.toUpperCase());
                retVal = this;
            }

            return retVal;
        },

        format: function (format) {
            var classOfFormat = sjl.classOf(format),
                retVal = this.get('format');
            if (classOfFormat !== 'String'
                && classOfFormat !== 'RegExp'
                && classOfFormat !== 'Undefined') {
                throw new Error('`PostCodeValidator.format` method only accepts a `format` parameter of type' +
                    ' "String", "RegExp", or "Undefined".  `format` parameter value received: "' + format + '".');
            }
            if (classOfFormat !== 'Undefined') {
                // Normalize regex
                if (classOfFormat === 'String') {
                    format = (format.indexOf('^') !== 0 ? '^' : '') + format;
                    format = format + (format.indexOf('$') !== format.length - 1 ? '$' : '');
                    format = new RegExp(format);
                }
                this.set('format', format);
                retVal = this;
            }
            return retVal;
        },

        service: function (service) {
            var classOfService = sjl.classOf(service),
                retVal = this.get('service');
            if (classOfService !== 'Function' && classOfService !== 'Undefined') {
                throw new Error('');
            }
            if (classOfService !== 'Undefined') {
                this.set('service', service);
                retVal = this;
            }
            return retVal;
        }

    });

    if (isNodeEnv) {
        module.exports = PostCodeValidator;
    }
    else {
        sjl.ns('validator.PostCodeValidator', PostCodeValidator);
        if (window.__isAmd) {
            return PostCodeValidator;
        }
    }

})();
