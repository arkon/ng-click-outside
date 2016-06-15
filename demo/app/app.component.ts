import { Component } from '@angular/core';
import { ClickOutsideDirective } from '../../src/click-outside';

import '../style/style.scss';

@Component({
  selector: 'app',
  directives: [ClickOutsideDirective],
  template: require('./app.component.html')
})
export class AppComponent {
  onClickedOutside(e) {
    console.log('app:', e);
  }
}
