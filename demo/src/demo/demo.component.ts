import { Component } from '@angular/core';
import { ClickOutside } from 'ng2-click-outside';

@Component({
  selector: 'demo',
  directives: [ClickOutside],
  template: `
    <div
      (click)="onClick($event)"
      (clickOutside)="onClickedOutside($event)"
      [innerHTML]="status">
    </div>
  `
})
export class DemoComponent {
  private status: string = 'Click outside this';

  private onClick(e) {
    console.info('Clicked inside:', e);
    this.status = 'Clicked inside';
  }

  private onClickedOutside(e) {
    console.info('Clicked outside:', e);
    this.status = 'Clicked outside';
  }
}
