"use strict";
var core_1 = require('@angular/core');
var click_outside_directive_1 = require('./click-outside.directive');
var ClickOutsideModule = (function () {
    function ClickOutsideModule() {
    }
    ClickOutsideModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [click_outside_directive_1.ClickOutsideDirective],
                    exports: [click_outside_directive_1.ClickOutsideDirective]
                },] },
    ];
    /** @nocollapse */
    ClickOutsideModule.ctorParameters = [];
    return ClickOutsideModule;
}());
exports.ClickOutsideModule = ClickOutsideModule;
