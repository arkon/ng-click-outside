import { Component } from '@angular/core';
import { ClickOutside } from 'ng2-click-outside';

@Component({
  selector: 'demo',
  directives: [ClickOutside],
  template: `
    <div
      (click)="onClick($event)"
      (clickOutside)="onClickedOutside($event)"
      [attachOutsideOnClick]="attachOutsideOnClick">
      <p>Clicked inside: {{countInside}}</p>
      <p>Clicked outside: {{countOutside}}</p>

      <label>
        <input type="checkbox" [(ngModel)]="attachOutsideOnClick" />
        <span>Attach on click</span>
      </label>
    </div>
  `
})
export class DemoComponent {
  private countInside: number = 0;
  private countOutside: number = 0;

  private attachOutsideOnClick = false;

  private onClick(e: Event) {
    console.info('Clicked inside:', e);
    this.countInside++;
  }

  private onClickedOutside(e: Event) {
    console.info('Clicked outside:', e);
    this.countOutside++;
  }
}
