import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
export declare class ClickOutside implements OnInit, OnDestroy, OnChanges {
    private _document;
    private _el;
    attachOutsideOnClick: boolean;
    clickOutside: EventEmitter<Event>;
    constructor(_document: HTMLDocument, _el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    private _init();
    private _initOnClickBody();
    private _onClickBody(e);
}
