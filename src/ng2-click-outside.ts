import {
  Directive,
  Output,
  EventEmitter,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  host: {
    '(document:click)': '_onClickDocument($event)'
  }
})
export class ClickOutside {
  @Output()
  public clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private _viewRef: ViewContainerRef) {
  }

  private _onClickDocument(e: Event) {
    if (!this._viewRef.element.nativeElement.contains(e.target)) {
      this.clickOutside.emit(e);
    }
  }
}
