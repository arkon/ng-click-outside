import { NgModule } from '@angular/core';

import ClickOutsideDirective from './click-outside.directive';

export { ClickOutsideDirective };

@NgModule({
  declarations: [ClickOutsideDirective],
  exports: [ClickOutsideDirective]
})
export class ClickOutsideModule {}
