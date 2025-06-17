
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Basket } from './../shared/models/Basket';
import { Injectable } from '@angular/core';
import { Delivery } from '../shared/models/Delivery';
import { ICreateOrder, IOrder } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl=environment.baseUrl
  constructor(private http: HttpClient) { }

  uppdateAdderss(form:any) {
    return this.http.put(this.baseUrl+"Account/update-address",form)
  }
  getUserAdderss() {
    return this.http.get(this.baseUrl + "Account/get-address-for-user");
  }
  getDeliveryMethod() {
    return this.http.get<Delivery[]>(this.baseUrl + "Orders/get-delivery");
  }
  createOreder(order:ICreateOrder) {
    return this.http.post<IOrder>(this.baseUrl+"Orders/create-order",order)
  }
}
