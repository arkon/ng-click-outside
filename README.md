# ng2-click-outside

[![npm version](http://img.shields.io/npm/v/ng2-click-outside.svg)](https://www.npmjs.com/package/ng2-click-outside)

**[Demo](http://echeung.me/ng2-click-outside/)**

A simple Angular 2 directive for handling click events _outside_ of an element.

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
  onClickedOutside(e) {
    console.log('clicked outside:', e);
  }
}
```
