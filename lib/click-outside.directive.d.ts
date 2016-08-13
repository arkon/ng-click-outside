import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
export default class ClickOutsideDirective implements OnInit, OnDestroy, OnChanges {
    private _document;
    private _el;
    attachOutsideOnClick: boolean;
    clickOutside: EventEmitter<Event>;
    constructor(_document: HTMLDocument, _el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _init();
    private _initOnClickBody();
    private _onClickBody(e);
}
