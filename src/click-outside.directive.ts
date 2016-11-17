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
import {DOCUMENT} from '@angular/platform-browser';

@Directive({selector: '[clickOutside]'})
export class ClickOutsideDirective implements OnInit, OnDestroy, OnChanges {
  @Input() attachOutsideOnClick: boolean = false;
  @Input() exclude: string = " ";
  private nodeExcluded = [];
  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(@Inject(DOCUMENT) private _document /*: HTMLDocument*/,
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
    if ( this.validateChanges(changes['attachOutsideOnClick']) ||
         this.validateChanges(changes['exclude'])) {
      this._init();
    }
  }

  validateChanges(object:any): boolean {
    return (object && object.previousValue !== object.currentValue)
  }

  private _init() {
    if (this.exclude) {
      this.exclude.split(',').forEach((selector) => {
        if (selector) {
          try {
            let node = this._document.querySelector(selector);
            if (node) this.nodeExcluded.push(node);
          } catch (error) {
            console.error("Check your selector syntax.")
          }
        }
      });
    }

    if (this.attachOutsideOnClick) {
      this._el.nativeElement.addEventListener('click', this._initOnClickBody);
    } else {
      this._initOnClickBody();
    }
  }

  /** @internal */
  private _initOnClickBody() {
    this._document.body.addEventListener('click', this._onClickBody);
  }

  /** @internal */
  private _onClickBody(e: Event) {
    if (!this._el.nativeElement.contains(e.target) && !this.isExclude(e.target)) {
      this.clickOutside.emit(e);

      if (this.attachOutsideOnClick) {
        this._document.body.removeEventListener('click', this._onClickBody);
      }
    }
  }

  private isExclude(target): boolean {
    var flag = false;

    for (let c = 0; c < this.nodeExcluded.length; c++) {
      if (this.nodeExcluded[c].contains(target) || target == this.nodeExcluded[c]) {
        flag = true;
        break;
      }
    }
    return flag;
  }
}
