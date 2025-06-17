import { Basket, IBasket, IBasketItem } from './../../shared/models/Basket';
import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  constructor(private _basket: BasketService) { }
  basket:IBasket
  ngOnInit(): void {
    this._basket.basket$.subscribe({
      next: (value) => {
        this.basket=value
      },
      error(err) {
        console.log(err);
      }
    })
  }
  removeBasket(item:IBasketItem) {
    this._basket.removeItemFromBasket(item)
  }
  incrementBasket(item: IBasketItem) {
    this._basket.incrementBasketItemQuantity(item);
  }
  decrementBasket(item: IBasketItem) {
    this._basket.decrementBasketItemQuantity(item);
  }

}
