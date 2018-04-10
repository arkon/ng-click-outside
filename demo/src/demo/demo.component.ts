import { Component } from '@angular/core';

@Component({
  selector: 'demo',
  template: `
    <div
      (click)="onClick($event)"
      (clickOutside)="onClickedOutside($event)"
      [attachOutsideOnClick]="attachOutsideOnClick"
      [clickOutsideEnabled]="enabled"
      [emitOnBlur]="true">
      <p>Clicked inside: {{countInside}}</p>
      <p>Clicked outside: {{countOutside}}</p>

      <label>
        <input type="checkbox" [checked]="attachOutsideOnClick" (click)="_toggleAttachOutsideOnClick()" />
        <span>Attach on click</span>
      </label>

      <label>
        <input type="checkbox" [checked]="enabled" (click)="_toggleEnabled()" />
        <span>Enabled</span>
      </label>
    </div>
  `
})
export class DemoComponent {
  private countInside: number = 0;
  private countOutside: number = 0;

  private attachOutsideOnClick = false;
  private enabled = true;

  private _toggleAttachOutsideOnClick() {
    this.attachOutsideOnClick = !this.attachOutsideOnClick;
  }

  private _toggleEnabled() {
    this.enabled = !this.enabled;
  }

  private onClick(e: Event) {
    console.info('Clicked inside:', e);
    this.countInside++;
  }

  private onClickedOutside(e: Event) {
    console.info('Clicked outside:', e);
    this.countOutside++;
  }
}
