# ng-click-outside

[![NPM](https://nodei.co/npm/ng-click-outside.png?compact=true)](https://nodei.co/npm/ng-click-outside/)

**[Demo](https://echeung.me/ng-click-outside/)**

*Formally called [ng2-click-outside](https://github.com/arkon/ng2-click-outside)*

Angular 2 directive for handling click events outside an element. Useful for things like reacting to clicking
outside of a dropdown menu or modal dialog.

Like binding to a regular Angular 2 `click` event, you can do something like this:

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

#### `exclude`

A comma-seperated string of DOM element queries to exclude when clicking outside of the element.
