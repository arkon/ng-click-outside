import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({ selector: '[clickOutside]' })
export default class ClickOutsideDirective implements OnInit, OnDestroy, OnChanges {
  @Input() attachOutsideOnClick: boolean = false;
  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(
    @Inject(DOCUMENT) private _document: HTMLDocument,
    private _el: ElementRef) {
    this._initOnClickBody = this._initOnClickBody.bind(this);
    this._onClickBody = this._onClickBody.bind(this);
  }

  ngOnInit() {
    this._init();
  }

  ngOnDestroy() {
    if (this.attachOutsideOnClick) {
      this._el.nativeElement.removeEventListener('click', this._initOnClickBody);
    }

    this._document.body.removeEventListener('click', this._onClickBody);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attachOutsideOnClick'] &&
      changes['attachOutsideOnClick'].previousValue !== changes['attachOutsideOnClick'].currentValue) {
      this._init();
    }
  }

  private _init() {
    if (this.attachOutsideOnClick) {
      this._el.nativeElement.addEventListener('click', this._initOnClickBody);
    } else {
      this._initOnClickBody();
    }
  }

  private _initOnClickBody() {
    this._document.body.addEventListener('click', this._onClickBody);
  }

  private _onClickBody(e: Event) {
    if (!this._el.nativeElement.contains(e.target)) {
      this.clickOutside.emit(e);

      if (this.attachOutsideOnClick) {
        this._document.body.removeEventListener('click', this._onClickBody);
      }
    }
  }
}
