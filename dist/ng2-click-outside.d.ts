import { EventEmitter, ViewContainerRef } from '@angular/core';
export declare class ClickOutside {
    private _viewRef;
    clickOutside: EventEmitter<Event>;
    constructor(_viewRef: ViewContainerRef);
    private _onClick(e);
}
