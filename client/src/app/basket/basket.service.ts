import { Basket, IBasket, IBasketItem, IBasketTotal } from './../shared/models/Basket';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { Delivery } from '../shared/models/Delivery';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private _http: HttpClient) { }
  baseUrl = environment.baseUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketSourceTotal = new BehaviorSubject<IBasketTotal>(null);
  basketTotal$ = this.basketSourceTotal.asObservable();
  shippingPrice: number = 0;

  createPaymentIntent(deleveryMethodId:number=3) {
    return this._http.post<IBasket>(this.baseUrl +
      `Payment/create?busketId=${this.getCurrentValue().id}&deleveryMethodId=${deleveryMethodId}`, {})
      .pipe(map((value: IBasket) => {
        this.basketSource.next(value);

        console.log(value)

      }));
  }
  getPaymentDetails() {
    const basket = this.getCurrentValue();
    return {
      paymentIntentID: basket?.paymentIntentID || null,
      clientSecret: basket?.clientSecret || null
    };
  }
  hasPaymentIntent(): boolean {
    const basket = this.getCurrentValue();
    return !!(basket?.paymentIntentID && basket?.clientSecret);
  }
  deleteBasket() {
    this.basketSource.next(null)
    this.basketSourceTotal.next(null)
    localStorage.removeItem('basketId')
  }
  setShippingPrice(delivery:Delivery) {
    this.shippingPrice = delivery.price
    this.calculateTotal()
  }
  calculateTotal() {
    const basket = this.getCurrentValue();
    if (!basket || !basket.basketItems) return;
    const shipping = this.shippingPrice;
    const subtotal = basket.basketItems.reduce((a, c) => {
      return (c.price*c.quanatity)+a
    }, 0)
    const total = shipping + subtotal;
    this.basketSourceTotal.next({shipping,subtotal,total})
  }
  GetBasket(id: string) {
    return this._http.get(this.baseUrl + 'Basket/get-basket-item/' + id).pipe(
      map((res: IBasket) => {
        this.basketSource.next(res);
        this.calculateTotal()
        return res
      })
    );
  }

  postBasket(basket: IBasket) {
    const basketToSend = {
      ...basket,
      paymentIntentID: basket.paymentIntentID || "",
      clientSecret: basket.clientSecret || ""
    };
    return this._http
      .post(this.baseUrl + 'Basket/update-basket', basketToSend)
      .subscribe({
        next: (value: IBasket) => {
          this.basketSource.next(value);
          this.calculateTotal()
          console.log(value);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  getCurrentValue() {
    return this.basketSource.value;
  }
  addItemToBasket(product: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.mapProductToBasketItem(
      product,
      quantity
    );
    let basket = this.getCurrentValue()
    if (!basket || basket.id == null) {

      basket= this.CreateBasket();
    }
    basket.basketItems = this.AddOrUpdate(
      basket.basketItems,
      itemToAdd,
      quantity
    );
    return this.postBasket(basket);
  }
  private AddOrUpdate(
    basketItems: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = basketItems.findIndex((i) => i.id === itemToAdd.id);
    if (index == -1) {
      itemToAdd.quanatity = quantity;
      basketItems.push(itemToAdd);
    } else {
      basketItems[index].quanatity += 1;
    }
    return basketItems;
  }
  private CreateBasket(): IBasket {
    const basket = new Basket();
    // basket.paymentIntentID = ''
    // basket.clientSecret=''
    localStorage.setItem('basketId', basket.id);
    return basket;
  }
  private mapProductToBasketItem(
    product: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: product.id,
      category: product.categoryName,
      image: product.photos[0].imageName,
      name: product.name,
      price: product.newPrice,
      quanatity: quantity,
      description:product.description
    };
  }
  incrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentValue();
    const basketIndex = basket.basketItems.findIndex(i => i.id === item.id)
    basket.basketItems[basketIndex].quanatity++;
    this.postBasket(basket);
  }
  decrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentValue();
    const basketIndex = basket.basketItems.findIndex(i => i.id === item.id)
    if (basket.basketItems[basketIndex].quanatity >1) {
        basket.basketItems[basketIndex].quanatity--;
        this.postBasket(basket);
    }
    else {
      this.removeItemFromBasket(item);
    }

  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentValue();
    if (basket.basketItems.some(i => i.id === item.id)) {
      basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.postBasket(basket);
      }
      else {
        this.deleteBasketItem(basket);
      }
    }

  }
  deleteBasketItem(basket: IBasket) {
    return this._http.delete(this.baseUrl + 'Basket/delete-basket/' + basket.id).subscribe({
      next: (value) => {
        console.log("basket id :",basket.id)
        this.basketSource.next(null);
        localStorage.removeItem("basketId");
      },
      error(err) {
        console.log(err);
      }
    })
  }
}
