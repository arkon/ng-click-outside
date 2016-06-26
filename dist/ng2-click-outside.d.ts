import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
export declare class ClickOutside implements OnInit, OnDestroy, OnChanges {
    private _viewRef;
    attachOutsideOnClick: boolean;
    clickOutside: EventEmitter<Event>;
    constructor(_viewRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _init();
    private _initOnClickBody();
    private _onClickBody(e);
}
