import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from './autofocus.directive';
import { AsyncBtnComponent } from './async-btn/async-btn.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AutofocusDirective, AsyncBtnComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AutofocusDirective, AsyncBtnComponent],
})
export class WidgetsModule {}
