/**
 * Created by Ely on 8/15/2015.
 */
(function () {

    var _undefined = 'undefined',
        BaseContainer = sjl.package('navigation.BaseContainer'),
        BasePage = function BasePage () {

        // Base Page's defaults
        this._internal = {
            alias: null,
            label: null,
            fragment: null,
            htmlAttribs: {
                id: null,
                class: null,
                title: null,
                target: null,
                rel: null,
                rev: null
            },
            order: 0,
            resource: null,
            privilege: null,
            permission: null,
            textDomain: null,
            active: false,
            visible: true,
            parent: null
        };

        // Merge all options in using overloaded functions
        sjl.extend(true, this._internal, options, true);
    };

    BasePage = BaseContainer.extend(BasePage, {
        label: function (label) {
            var self = this,
                isGetterCall = typeof label === _undefined,
                retVal = self;
            if (isGetterCall) {
                retVal = self._internal.label;
            }
            else {
                self._internal.label = label;
            }
            return retVal;
        },
        fragment: function (fragment) {
            var self = this,
                isGetterCall = typeof fragment === _undefined,
                retVal = self;
            if (isGetterCall) {
                retVal = self._internal.fragment;
            }
            else {
                self._internal.fragment = fragment;
            }
            return retVal;
        },
        htmlAttribs: function (attribs) {
            var self = this,
                isGetterCall = typeof attribs === _undefined,
                retVal = self;
            if (isGetterCall) {
                if (self._internal.htmlAttribs === null) {
                    self._internal.htmlAttribs = new sjl.SjlMap();
                }
                retVal = self._internal.htmlAttribs;
            }
            else if (atrribs.constructor.name === 'SjlMap'
                || attribs.constructor.name === 'Map') {
                self._internal.htmlAttribs = attribs;
            }
            else if (sjl.classOfIs(attribs, 'Array')) {
                self.htmlAttribs().clear()
                    .addFromArray(attribs);
            }
            else if (attribs.constructor.name === 'Object') {
                self.htmlAttribs().clear();
                self.addHtmlAttribs(attribs);
            }
            else {
                throw new Error ('When attempting to set htmlAttribs, the value ' +
                    'should be one of "Array", "Object", "SjlMap", or "Map".  ' +
                    ' value type recieved: "' + attribs.constructor.name + '"');
            }
            return retVal;
        },
        addHtmlAttrib: function (attribName, attribValue) {
            return this.htmlAttribs().set(attribName, attribValue);
        },
        addHtmlAttribs: function (attribsObj) {
            var self = this,
                htmlAttribs = self.htmlAttribs();
            sjl.iterable(attribsObj)[sjl.Symbol.iterator].forEach(function (key, value) {
                htmlAttribs.set(key, value);
            });
            return self;
        },
        rel: function (rel) {
            var self = this,
                isGetterCall = typeof rel === _undefined,
                retVal = self;
            if (isGetterCall) {
                if (self._internal.htmlAttribs.rel === null) {
                    self._internal.htmlAttribs.rel = new sjl.SjlSet();
                }
                retVal = self._internal.htmlAttribs.rel;
            }
            else {
                self._internal.htmlAttribs.rel = rel;
            }
            return retVal;
        },
        addRel: function (rel) {
            this.rel().add(rel);
            return this;
        },
        rev: function (rev) {
            var self = this,
                isGetterCall = typeof rev === _undefined,
                retVal = self;
            if (isGetterCall) {
                if (self._internal.htmlAttribs.rev === null) {
                    self._internal.htmlAttribs.rev = new sjl.SjlSet();
                }
                retVal = self._internal.htmlAttribs.rev;
            }
            else {
                self._internal.htmlAttribs.rev = rev;
            }
            return retVal;
        },
        addRev: function (rev) {
            this.rev().add(rev);
            return this;
        },
        order: function (order) {
            var self = this,
                isGetterCall = typeof order === _undefined,
                retVal = self;
            if (isGetterCall) {
                retVal = self._internal.order;
            }
            else {
                self._internal.order = parseInt(order, 10);
            }
            return retVal;
        },
        resource: function (resource) {
            var self = this,
                isGetterCall = typeof resource === _undefined,
                retVal = self;
            if (isGetterCall) {
                retVal = self._internal.resource;
            }
            else {
                self._internal.resource = resource;
            }
            return retVal;
        },
        privilege: function (privilege) {
            var self = this,
                isGetterCall = typeof privilege === _undefined,
                retVal = self;
            if (isGetterCall) {
                retVal = self._internal.privilege;
            }
            else {
                self._internal.privilege = privilege;
            }
            return retVal;
        },
        permission: function (permission) {
            var self = this,
                isGetterCall = typeof permission === _undefined,
                retVal = self;
            if (isGetterCall) {
                retVal = self._internal.permission;
            }
            else {
                self._internal.permission = permission;
            }
            return retVal;
        },
        textDomain: function (textDomain) {
            var self = this,
                isGetterCall = typeof textDomain === _undefined,
                retVal = self;
            if (isGetterCall) {
                retVal = self._internal.textDomain;
            }
            else {
                self._internal.textDomain = textDomain;
            }
            return retVal;
        },
        active: function (active) {
            var self = this,
                isGetterCall = typeof active === _undefined,
                retVal = self;
            if (isGetterCall) {
                retVal = self._internal.active;
            }
            else {
                self._internal.active = active;
            }
            return retVal;
        },
        visible: function (visible) {
            var self = this,
                isGetterCall = typeof visible === _undefined,
                retVal = self;
            if (isGetterCall) {
                retVal = self._internal.visible;
            }
            else {
                self._internal.visible = visible;
            }
            return retVal;
        },
        parent: function (parent) {
            var self = this,
                isGetterCall = typeof parent === _undefined,
                retVal = self;
            if (isGetterCall) {
                retVal = self._internal.parent;
            }
            else {
                self._internal.parent = parent;
            }
            return retVal;
        },
        href: function () {/** Abstract Public Method.  Extend from externally composed class. **/}
    });

    // Set basepage on package path
    sjl.package('navigation.BasePage', BasePage);

}());