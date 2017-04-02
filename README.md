# ng-click-outside

[![NPM](https://nodei.co/npm/ng-click-outside.png?compact=true)](https://nodei.co/npm/ng-click-outside/)

**[Demo](https://echeung.me/ng-click-outside/)**

*Formally called [ng2-click-outside](https://github.com/arkon/ng2-click-outside)*

Angular 2+ directive for handling click events outside an element. Useful for things like reacting to clicking
outside of a dropdown menu or modal dialog.

Like binding to a regular `click` event in a template, you can do something like this:

```HTML
<div (clickOutside)="onClickedOutside($event)">My element</div>
```


## Installation

```shell
npm install --save ng-click-outside
```


## Usage

Add `ClickOutsideModule` to your list of module imports:

```typescript
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ClickOutsideModule],
  bootstrap: [AppComponent]
})
class AppModule {}
```

You can then use the directive in your templates:

```typescript
@Component({
  selector: 'app',
  template: `
    <div (clickOutside)="onClickedOutside($event)">Click outside this</div>
  `
})
export class AppComponent {
  onClickedOutside(e: Event) {
    console.log('Clicked outside:', e);
  }
}
```

### Options

#### `attachOutsideOnClick`

By default, the outside click event handler is automatically. You can explicitely set this to `true`
so that the handler is only set when the element is clicked. The outside click event handler will
then be removed after a click outside has occurred.

Default: `false`

#### `clickoutsideevents`

By default, the outside click event is triggered on `click`. This property allows for a comma-separated list of events to cause the trigger.

Example: For mobile support add:
`[clickoutsideevents]="'click touchstart'"`

Example: For mobile exclusive support add:
`[clickoutsideevents]="'touchstart'"`

#### `exclude`

A comma-separated string of DOM element queries to exclude when clicking outside of the element. For example: `[exclude]="'button,.btn-primary'"`.

#### `excludebeforeclick`

By default clickOutside registers excluded DOM elements on init. This property refreshes the list before the clickOutside event is triggered. This is useful for ensuring that excluded elements added to the DOM after init are excluded (e.g. ng2-bootstrap popover: this allows for clicking inside the `.popover-content` area if specified in `exclude`)

Default: `false`
