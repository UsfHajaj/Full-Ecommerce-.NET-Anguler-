import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IOrder } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.baseUrl

  getCurrentOrderForUser(id: number) {
    return this.http.get<IOrder>(this.baseUrl+"Orders/get-order-by-id/"+id)
  }

  getAllOrderForUser() {
    return this.http.get<IOrder[]>(this.baseUrl+'Orders/get-orders-for-user')
  }
}
