import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective implements OnInit, OnChanges, OnDestroy {

  @Input() clickOutsideEnabled: boolean = true;

  @Input() attachOutsideOnClick: boolean = false;
  @Input() delayClickOutsideInit: boolean = false;
  @Input() emitOnBlur: boolean = false;

  @Input() exclude: string = '';
  @Input() excludeBeforeClick: boolean = false;

  @Input() clickOutsideEvents: string = '';

  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  private _nodesExcluded: Array<HTMLElement> = [];
  private _events: Array<string> = ['click'];
  private _isWindowBlurListenerSet: boolean = false;

  constructor(
      private _el: ElementRef,
      private _ngZone: NgZone,
      @Inject(PLATFORM_ID) private platformId: Object) {
    this._initOnClickBody = this._initOnClickBody.bind(this);
    this._onClickBody = this._onClickBody.bind(this);
    this._onWindowBlur = this._onWindowBlur.bind(this);
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) { return; }

    this._init();
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) { return; }

    if (this.attachOutsideOnClick) {
      this._events.forEach(e => this._el.nativeElement.removeEventListener(e, this._initOnClickBody));
    }

    this._events.forEach(e => document.body.removeEventListener(e, this._onClickBody));

    if (this._isWindowBlurListenerSet) {
      window.removeEventListener('blur', this._onWindowBlur);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!isPlatformBrowser(this.platformId)) { return; }

    if (changes['attachOutsideOnClick'] || changes['exclude'] || changes['emitOnBlur']) {
      this._init();
    }
  }

  private _init() {
    if (this.clickOutsideEvents !== '') {
      this._events = this.clickOutsideEvents.split(',').map(e => e.trim());
    }

    this._excludeCheck();

    if (this.attachOutsideOnClick) {
      this._ngZone.runOutsideAngular(() => {
        this._events.forEach(e => this._el.nativeElement.addEventListener(e, this._initOnClickBody));
      });
    } else {
      this._initOnClickBody();
    }

    if (this.emitOnBlur) {
      this._ngZone.runOutsideAngular(() => {
        window.addEventListener('blur', this._onWindowBlur);
      });
      this._isWindowBlurListenerSet = true;
    }
  }

  private _initOnClickBody() {
    if (this.delayClickOutsideInit) {
      setTimeout(this._initClickListeners.bind(this));
    } else {
      this._initClickListeners();
    }
  }

  private _initClickListeners() {
    this._ngZone.runOutsideAngular(() => {
      this._events.forEach(e => document.body.addEventListener(e, this._onClickBody));
    });
  }

  private _excludeCheck() {
    if (this.exclude) {
      try {
        const nodes = Array.from(document.querySelectorAll(this.exclude)) as Array<HTMLElement>;
        if (nodes) {
          this._nodesExcluded = nodes;
        }
      } catch (err) {
        console.error('[ng-click-outside] Check your exclude selector syntax.', err);
      }
    }
  }

  private _onClickBody(ev: Event) {
    if (!this.clickOutsideEnabled) { return; }

    if (this.excludeBeforeClick) {
      this._excludeCheck();
    }

    if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
      this._emit(ev);

      if (this.attachOutsideOnClick) {
        this._events.forEach(e => document.body.removeEventListener(e, this._onClickBody));
      }
    }
  }

  /**
   * Resolves problem with outside click on iframe
   * @see https://github.com/arkon/ng-click-outside/issues/32
   */
  private _onWindowBlur(ev: Event) {
    setTimeout(() => {
      if (!document.hidden) {
        this._emit(ev);
      }
    });
  }

  private _emit(ev: Event) {
    this._ngZone.run(() => this.clickOutside.emit(ev));
  }

  private _shouldExclude(target): boolean {
    for (let excludedNode of this._nodesExcluded) {
      if (excludedNode.contains(target)) {
        return true;
      }
    }

    return false;
  }
}
