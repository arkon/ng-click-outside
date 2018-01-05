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
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/observable/merge';
import { takeUntil } from 'rxjs/operators/takeUntil';

@Injectable()
@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective implements OnInit, OnChanges, OnDestroy {

  @Input() attachOutsideOnClick: boolean = false;
  @Input() delayClickOutsideInit: boolean = false;
  @Input() exclude: string = '';
  @Input() excludeBeforeClick: boolean = false;
  @Input() set clickOutsideEvents(events: string) {
    this._events = events.split(',').map(e => e.trim());
  }
  @Input() clickOutsideEnabled: boolean = true;

  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  private _nodesExcluded: Array<HTMLElement> = [];
  private _events: Array<string> = ['click'];
  private _isPlatformBrowser: boolean = isPlatformBrowser(this.platformId);

  private _beforeInit: Subject<void> = new Subject<void>();
  private _onDestroy: Subject<void> = new Subject<void>();
  private _onOutsideClick: Subject<void> = new Subject<void>();

  constructor(private _el: ElementRef,
              private _renderer2: Renderer2,
              private _ngZone: NgZone,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this._initOnClickBody = this._initOnClickBody.bind(this);
    this._onClickBody = this._onClickBody.bind(this);
  }

  ngOnInit() {
    if (!this._isPlatformBrowser) { return; }

    this._init();
  }

  ngOnDestroy() {
    if (!this._isPlatformBrowser) { return; }

    this._onDestroy.next();
    this._onDestroy.complete();

    this._onOutsideClick.complete();
    this._beforeInit.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._isPlatformBrowser) { return; }

    if (changes['attachOutsideOnClick'] || changes['exclude']) {
      this._init();
    }
  }

  private _init() {
    this._beforeInit.next();

    this._excludeCheck();

    if (this.attachOutsideOnClick) {
      this._ngZone.runOutsideAngular(() => {
        this._listenAll(this._el.nativeElement, ...this._events)
          .subscribe(this._initOnClickBody);
      });
    } else {
      this._initOnClickBody();
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
      this._listenAll('body', ...this._events)
        .pipe(
          takeUntil(this._onOutsideClick),
        )
        .subscribe(this._onClickBody);
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
    if (!this.clickOutsideEnabled) {
      return;
    }

    if (this.excludeBeforeClick) {
      this._excludeCheck();
    }

    if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
      this._ngZone.run(() => this.clickOutside.emit(ev));

      if (this.attachOutsideOnClick) {
        this._onOutsideClick.next();
      }
    }
  }

  private _shouldExclude(target): boolean {
    return this._nodesExcluded.some(excludedNode => excludedNode.contains(target));
  }

  private _listenAll(target:  'window' | 'document' | 'body' | any, ...eventNames: string[]): Observable<Event> {
    const sources = eventNames.map(eventName => {
      return new Observable<Event>(observer => this._renderer2.listen(target, eventName, ev => observer.next(ev)));
    });

    return merge(...sources)
      .pipe(
        takeUntil(this._beforeInit),
        takeUntil(this._onDestroy),
      );
  }
}
