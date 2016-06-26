import { Component } from '@angular/core';
import { ClickOutside } from 'ng2-click-outside';

@Component({
  selector: 'demo',
  directives: [ClickOutside],
  template: `
    <div
      (click)="onClick($event)"
      (clickOutside)="onClickedOutside($event)">
      <p>Clicked inside: {{countInside}}</p>
      <p>Clicked outside: {{countOutside}}</p>
    </div>
  `
})
export class DemoComponent {
  private countInside: number = 0;
  private countOutside: number = 0;

  private onClick(e) {
    console.info('Clicked inside:', e);
    this.countInside++;
  }

  private onClickedOutside(e) {
    console.info('Clicked outside:', e);
    this.countOutside++;
  }
}
