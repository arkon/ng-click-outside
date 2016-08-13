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

Using a module:

```typescript
import { ClickOutsideModule } from 'ng2-click-outside';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ClickOutsideModule],
  bootstrap: [AppComponent]
})
class AppModule {}
```

If you're not using the module, be sure to add the directive to your component's decorator:

```typescript
import { ClickOutsideDirective } from 'ng2-click-outside';

@Component({
  selector: 'app',
  directives: [ClickOutsideDirective],
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

By default, the outside click event handler is automatically. You can explicitely set this to `true`
so that the handler is only set when the element is clicked. The outside click event handler will
then be removed after a click outside has occurred.

Default: `false`