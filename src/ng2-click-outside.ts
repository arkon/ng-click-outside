import {
  Directive,
  Output,
  EventEmitter,
  ViewContainerRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutside {
  @Output()
  public clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private _viewRef: ViewContainerRef) {
  }

  @HostListener('document:click', ['$event'])
  private _onClick(e: Event) {
    if (!this._viewRef.element.nativeElement.contains(e.target)) {
      this.clickOutside.emit(e);
    }
  }
}
