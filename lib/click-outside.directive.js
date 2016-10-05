"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var ClickOutsideDirective = (function () {
    function ClickOutsideDirective(_document /*: HTMLDocument*/, _el) {
        this._document = _document;
        this._el = _el;
        this.attachOutsideOnClick = false;
        this.clickOutside = new core_1.EventEmitter();
        this._initOnClickBody = this._initOnClickBody.bind(this);
        this._onClickBody = this._onClickBody.bind(this);
    }
    ClickOutsideDirective.prototype.ngOnInit = function () {
        this._init();
    };
    ClickOutsideDirective.prototype.ngOnDestroy = function () {
        if (this.attachOutsideOnClick) {
            this._el.nativeElement.removeEventListener('click', this._initOnClickBody);
        }
        this._document.body.removeEventListener('click', this._onClickBody);
    };
    ClickOutsideDirective.prototype.ngOnChanges = function (changes) {
        if (changes['attachOutsideOnClick'] &&
            changes['attachOutsideOnClick'].previousValue !== changes['attachOutsideOnClick'].currentValue) {
            this._init();
        }
    };
    ClickOutsideDirective.prototype._init = function () {
        if (this.attachOutsideOnClick) {
            this._el.nativeElement.addEventListener('click', this._initOnClickBody);
        }
        else {
            this._initOnClickBody();
        }
    };
    ClickOutsideDirective.prototype._initOnClickBody = function () {
        this._document.body.addEventListener('click', this._onClickBody);
    };
    ClickOutsideDirective.prototype._onClickBody = function (e) {
        if (!this._el.nativeElement.contains(e.target)) {
            this.clickOutside.emit(e);
            if (this.attachOutsideOnClick) {
                this._document.body.removeEventListener('click', this._onClickBody);
            }
        }
    };
    ClickOutsideDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[clickOutside]' },] },
    ];
    /** @nocollapse */
    ClickOutsideDirective.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
        { type: core_1.ElementRef, },
    ];
    ClickOutsideDirective.propDecorators = {
        'attachOutsideOnClick': [{ type: core_1.Input },],
        'clickOutside': [{ type: core_1.Output },],
    };
    return ClickOutsideDirective;
}());
exports.ClickOutsideDirective = ClickOutsideDirective;
