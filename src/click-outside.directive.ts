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

import guard from 'ts-guard-decorator';

@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective implements OnInit, OnDestroy, OnChanges {
  @Input() attachOutsideOnClick: boolean = false;
  @Input() exclude: string = '';
  @Input() excludeBeforeClick: boolean = false;
  @Input() clickOutsideEvents: string = '';

  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  private _nodesExcluded: Array<HTMLElement> = [];
  private _events: Array<string> = ['click'];

  constructor(
    @Inject(DOCUMENT) private _document /*: HTMLDocument*/,
    private _el: ElementRef) {
    this._initOnClickBody = this._initOnClickBody.bind(this);
    this._onClickBody = this._onClickBody.bind(this);
  }

  @guard(typeof window !== 'undefined')
  ngOnInit() {
    this._init();
  }

  @guard(typeof window !== 'undefined')
  ngOnDestroy() {
    if (this.attachOutsideOnClick) {
      this._events.forEach(e => this._el.nativeElement.removeEventListener(e, this._initOnClickBody));
    }

    this._events.forEach(e => this._document.body.removeEventListener(e, this._onClickBody));
  }

  @guard(typeof window !== 'undefined')
  ngOnChanges(changes: SimpleChanges) {
    if (changes['attachOutsideOnClick'] || changes['exclude']) {
      this._init();
    }
  }

  private _init() {
    if (this.clickOutsideEvents !== '') {
      this._events = this.clickOutsideEvents.split(' ');
    }
    this._excludeCheck();

    if (this.attachOutsideOnClick) {
      this._events.forEach(e => this._el.nativeElement.addEventListener(e, this._initOnClickBody));
    } else {
      this._initOnClickBody();
    }
  }

  /** @internal */
  private _initOnClickBody() {
    this._events.forEach(e => this._document.body.addEventListener(e, this._onClickBody));
  }

  /** @internal */
  private _excludeCheck() {
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
  }

  private _onClickBody(ev: Event) {
    if (this.excludeBeforeClick) {
      this._excludeCheck();
    }

    if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
      this.clickOutside.emit(ev);

      if (this.attachOutsideOnClick) {
        this._events.forEach(e => this._document.body.removeEventListener(e, this._onClickBody));
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
