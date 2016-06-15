import { Component } from '@angular/core';
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
    console.log('app:', e);
  }
}
