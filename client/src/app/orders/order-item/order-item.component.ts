import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent implements OnInit {
  orders: IOrder;
  id: number = 0;
  constructor(private route: ActivatedRoute, private _service: OrdersService) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.id = param['id'];
    });
    this._service.getCurrentOrderForUser(this.id).subscribe({
      next: (value) => {
        this.orders=value
        console.log(this.orders);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
