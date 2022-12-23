import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { StockRoutingModule } from './stock-routing.module';

@NgModule({
  declarations: [CreateComponent, ListComponent],
  imports: [CommonModule, StockRoutingModule, FontAwesomeModule],
})
export class StockModule {}
