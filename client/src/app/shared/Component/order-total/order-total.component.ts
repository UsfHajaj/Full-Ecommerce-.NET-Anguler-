import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { IBasketTotal } from '../../models/Basket';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrl: './order-total.component.scss'
})
export class OrderTotalComponent implements OnInit{
  constructor(private _basketService: BasketService) { }
  basketTotal:IBasketTotal
  ngOnInit(): void {
    this._basketService.basketTotal$.subscribe({
      next: (value) => {
        this.basketTotal=value
      },
      error(err) {
        console.log(err);
      }
    })
  }

}
