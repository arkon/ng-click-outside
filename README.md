# ng2-click-outside

[![NPM](https://nodei.co/npm/ng2-click-outside.png?compact=true)](https://nodei.co/npm/ng2-click-outside/)

**[Demo](http://echeung.me/ng2-click-outside/)**

Angular 2 directive for handling click events outside an element. Useful for things like reacting to clicking
outside of a dropdown menu or modal dialog.

Like binding to a regular Angular 2 `click` event, you can do something like this:

```HTML
<div (clickOutside)="onClickedOutside($event)">My element</div>
```


## Installation

```shell
npm install --save ng2-click-outside
```


## Usage

```typescript
import { ClickOutside } from 'ng2-click-outside';

@Component({
  selector: 'app',
  directives: [ClickOutside],
  template: `
    <div (clickOutside)="onClickedOutside($event)">Click outside this</div>
  `
})
export class AppComponent {
  onClickedOutside(e: Event) {
    console.log('clicked outside:', e);
  }
}
```

### Options

#### `attachOutsideOnClick`

By default, the outside click event handler is automatically. You can explicitely set `[attachOutsideOnClick]="true"`
so that the handler is only set when the element that `(clickOutside)` is on is clicked. The outside click event
handler will then be removed after a click outside has occurred.