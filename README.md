# ng2-click-outside

[![npm version](http://img.shields.io/npm/v/ng2-click-outside.svg)](https://www.npmjs.com/package/ng2-click-outside)

**[Demo](http://echeung.me/ng2-click-outside/)**

Angular 2 directive for handling click events outside an element.

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

By default, the outside click event handler is automatically. You can explicitely set
`[attachOutsideOnClick]="true"` so that the handler is only set when the element that
`(clickOutside)` is on is clicked. The outside click event handler will then be removed
after a click outside has occurred.