import { NgModule } from '@angular/core';

import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [ClickOutsideDirective],
  exports: [ClickOutsideDirective]
})
export class ClickOutsideModule {}
