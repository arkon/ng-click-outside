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
export class ClickOutsideDirective implements OnInit, OnDestroy, OnChanges {
  @Input() attachOutsideOnClick: boolean = false;
  @Input() exclude: string = '';

  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  private _nodesExcluded: Array<HTMLElement> = [];

  constructor(
    @Inject(DOCUMENT) private _document /*: HTMLDocument*/,
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
    if (changes['attachOutsideOnClick'] || changes['exclude']) {
      this._init();
    }
  }

  private _init() {
    if (this.exclude) {
      try {
        const nodes = this._document.querySelectorAll(this.exclude);
        if (nodes) {
          this._nodesExcluded = nodes;
        }
      } catch (err) {
        if (console) {
          console.error('[ng-click-outside] Check your exclude selector syntax.', err);
        }
      }
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
    if (!this._el.nativeElement.contains(e.target) && !this._shouldExclude(e.target)) {
      this.clickOutside.emit(e);

      if (this.attachOutsideOnClick) {
        this._document.body.removeEventListener('click', this._onClickBody);
      }
    }
  }

  /** @internal */
  private _shouldExclude(target): boolean {
    for (let i = 0; i < this._nodesExcluded.length; i++) {
      if (this._nodesExcluded[i].contains(target)) {
        return true;
      }
    }

    return false;
  }
}
