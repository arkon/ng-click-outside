"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var ClickOutside = (function () {
    function ClickOutside(_document, _el) {
        this._document = _document;
        this._el = _el;
        this.attachOutsideOnClick = false;
        this.clickOutside = new core_1.EventEmitter();
        this._initOnClickBody = this._initOnClickBody.bind(this);
        this._onClickBody = this._onClickBody.bind(this);
    }
    ClickOutside.prototype.ngOnInit = function () {
        this._init();
    };
    ClickOutside.prototype.ngOnDestroy = function () {
        if (this.attachOutsideOnClick) {
            this._el.nativeElement.removeEventListener('click', this._initOnClickBody);
        }
        this._document.body.removeEventListener('click', this._onClickBody);
    };
    ClickOutside.prototype.ngOnChanges = function (changes) {
        if (changes['attachOutsideOnClick'].previousValue !== changes['attachOutsideOnClick'].currentValue) {
            this._init();
        }
    };
    ClickOutside.prototype._init = function () {
        if (this.attachOutsideOnClick) {
            this._el.nativeElement.addEventListener('click', this._initOnClickBody);
        }
        else {
            this._initOnClickBody();
        }
    };
    ClickOutside.prototype._initOnClickBody = function () {
        this._document.body.addEventListener('click', this._onClickBody);
    };
    ClickOutside.prototype._onClickBody = function (e) {
        if (!this._el.nativeElement.contains(e.target)) {
            this.clickOutside.emit(e);
            if (this.attachOutsideOnClick) {
                this._document.body.removeEventListener('click', this._onClickBody);
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
        core_1.Directive({ selector: '[clickOutside]' }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [HTMLDocument, core_1.ElementRef])
    ], ClickOutside);
    return ClickOutside;
}());
exports.ClickOutside = ClickOutside;
