import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopModule } from '../shop/shop.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    ShopModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
