import { Delivery } from './../../shared/models/Delivery';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent implements OnInit {
  constructor(
    private _service: CheckoutService,
    private basketService: BasketService,
    private tost: ToastrService
  ) {}
  @Input() delivery: FormGroup;
  deliverys: Delivery[] = [];
  isCreatingPayment: boolean = false;
  ngOnInit(): void {
    this._service.getDeliveryMethod().subscribe({
      next: (value) => {
        this.deliverys = value;
      },
      error(err) {
        console.log(err);
      },
    });
  }


   CreatePayment() {
    const id = this.deliverys.find(
      (m) => m.id == this.delivery.value.delivery
    ).id;
    this.basketService.createPaymentIntent(id).subscribe({
      next: (res) => {
        this.tost.success('Payment Intent Created', 'SUCCESS');
      },
      error(err) {
        console.log(err);

      },
    });
  }
  setShippingPrice() {
    const delivery = this.deliverys.find(
      (m) => m.id == this.delivery.value.delivery
    );
    this.basketService.setShippingPrice(delivery);
  }
  getPaymentDetails() {
    return this.basketService.getPaymentDetails();
  }
  hasPaymentIntent(): boolean {
    return this.basketService.hasPaymentIntent();
  }
}
