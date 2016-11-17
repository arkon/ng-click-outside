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
      this.exclude.split(',').forEach((selector) => {
        if (selector) {
          try {
            const node = this._document.querySelector(selector.trim());
            if (node) {
              this._nodesExcluded.push(node);
            }
          } catch (err) {
            if (window.console) {
              window.console.error('[ng2-click-outside] Check your exclude selector syntax.', err);
            }
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
      if (this._nodesExcluded.indexOf(target) > -1) {
        return true;
      }
    }

    return false;
  }
}
