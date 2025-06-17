import { PaginationModule } from 'ngx-bootstrap/pagination';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagnationComponent } from './Component/pagnation/pagnation.component';
import { RouterModule } from '@angular/router';
import { OrderTotalComponent } from './Component/order-total/order-total.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    PagnationComponent,
    OrderTotalComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule
  ],
  exports: [
    PaginationModule,
    PagnationComponent,
    OrderTotalComponent
  ]
})
export class SharedModule { }
