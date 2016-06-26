import {
  OnInit,
  OnDestroy,
  Directive,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutside implements OnInit, OnDestroy {
  @Input() attachOutsideOnClick: boolean = false;
  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private _viewRef: ViewContainerRef) {
    this._initOnClickBody = this._initOnClickBody.bind(this);
    this._onClickBody = this._onClickBody.bind(this);
  }

  ngOnInit() {
    if (this.attachOutsideOnClick) {
      this._viewRef.element.nativeElement.addEventListener('click', this._initOnClickBody);
    } else {
      this._initOnClickBody();
    }
  }

  ngOnDestroy() {
    if (this.attachOutsideOnClick) {
      this._viewRef.element.nativeElement.removeEventListener('click', this._initOnClickBody);
    }

    document.body.removeEventListener('click', this._onClickBody);
  }

  private _initOnClickBody() {
    document.body.addEventListener('click', this._onClickBody);
  }

  private _onClickBody(e: Event) {
    if (!this._viewRef.element.nativeElement.contains(e.target)) {
      this.clickOutside.emit(e);

      if (this.attachOutsideOnClick) {
        document.body.removeEventListener('click', this._onClickBody);
      }
    }
  }
}
