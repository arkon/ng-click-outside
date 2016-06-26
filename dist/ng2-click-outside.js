"use strict";
var core_1 = require('@angular/core');
var ClickOutside = (function () {
    function ClickOutside(_viewRef) {
        this._viewRef = _viewRef;
        this.attachOutsideOnClick = false;
        this.clickOutside = new core_1.EventEmitter();
        this._initOnClickBody = this._initOnClickBody.bind(this);
        this._onClickBody = this._onClickBody.bind(this);
    }
    ClickOutside.prototype.ngOnInit = function () {
        if (this.attachOutsideOnClick) {
            this._viewRef.element.nativeElement.addEventListener('click', this._initOnClickBody);
        }
        else {
            this._initOnClickBody();
        }
    };
    ClickOutside.prototype.ngOnDestroy = function () {
        if (this.attachOutsideOnClick) {
            this._viewRef.element.nativeElement.removeEventListener('click', this._initOnClickBody);
        }
        document.body.removeEventListener('click', this._onClickBody);
    };
    ClickOutside.prototype._initOnClickBody = function () {
        document.body.addEventListener('click', this._onClickBody);
    };
    ClickOutside.prototype._onClickBody = function (e) {
        if (!this._viewRef.element.nativeElement.contains(e.target)) {
            this.clickOutside.emit(e);
            if (this.attachOutsideOnClick) {
                document.body.removeEventListener('click', this._onClickBody);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ClickOutside.prototype, "attachOutsideOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ClickOutside.prototype, "clickOutside", void 0);
    ClickOutside = __decorate([
        core_1.Directive({
            selector: '[clickOutside]'
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], ClickOutside);
    return ClickOutside;
}());
exports.ClickOutside = ClickOutside;
