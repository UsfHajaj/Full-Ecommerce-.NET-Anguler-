import { Delivery } from './../../shared/models/Delivery';
import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { ICreateOrder } from '../../shared/models/Order';
import { IBasket } from '../../shared/models/Basket';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  constructor(
    private _service: CheckoutService,
    private tost: ToastrService,
    private basketService: BasketService,
    private rout:Router
  ) { }
  @Input() delivery: FormGroup;
  @Input() shipAddress: FormGroup
  ngOnInit(): void {

  }
  createOrder() {
    const basket = this.basketService.getCurrentValue();
    const order = this.getOrderCreate(basket);
    this._service.createOreder(order).subscribe({
      next: (value) => {
        this.basketService.deleteBasket();
        this.rout.navigate(['/checkout/success'],{queryParams:{orderId:value.id}})
        this.tost.success("Order has been Created","SUCCESS")
      },
      error:(err)=> {
        console.log(err)
        this.tost.error("Error While Create Order","ERROR")
      },
    })
  }
  getOrderCreate(basket:IBasket):ICreateOrder {
    return {
      basketId: basket.id,
      deliveryMethodId: this.delivery.value.delivery,
      shipAddress:this.shipAddress.value
    }
  }

}
