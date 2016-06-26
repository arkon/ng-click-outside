import { OnInit, OnDestroy, EventEmitter, ViewContainerRef } from '@angular/core';
export declare class ClickOutside implements OnInit, OnDestroy {
    private _viewRef;
    attachOutsideOnClick: boolean;
    clickOutside: EventEmitter<Event>;
    constructor(_viewRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private _initOnClickBody();
    private _onClickBody(e);
}
