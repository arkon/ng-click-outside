"use strict";
var core_1 = require('@angular/core');
var ClickOutside = (function () {
    function ClickOutside(_viewRef) {
        this._viewRef = _viewRef;
        this.clickOutside = new core_1.EventEmitter();
    }
    ClickOutside.prototype._onClick = function (e) {
        if (!this._viewRef.element.nativeElement.contains(e.target)) {
            this.clickOutside.emit(e);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ClickOutside.prototype, "clickOutside", void 0);
    __decorate([
        core_1.HostListener('document:click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], ClickOutside.prototype, "_onClick", null);
    ClickOutside = __decorate([
        core_1.Directive({
            selector: '[clickOutside]'
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], ClickOutside);
    return ClickOutside;
}());
exports.ClickOutside = ClickOutside;
