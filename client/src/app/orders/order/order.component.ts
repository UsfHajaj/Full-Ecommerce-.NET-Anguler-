import { Component, OnInit } from '@angular/core';
import { IOrder, IOrderItem } from '../../shared/models/Order';
import { OrdersService } from '../orders.service';
declare var bootstrap: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  orders: IOrder[]=[];
  UrlImageModal: string[] = [];
  constructor(private _service: OrdersService) {}
  ngOnInit(): void {
    this._service.getAllOrderForUser().subscribe({
      next:(res)=> {
        this.orders = res
        console.log(res);
      },
      error(err) {
        console.log(err);
      },
    })
  }

  OpenModal(items: IOrderItem[]) {
    this.UrlImageModal = items.map(i => i.mainImage);
    var model = document.getElementById('ImageModal');
    var modelEle =new bootstrap.Modal(model);
    modelEle.show();
  }
   CloseModal() {
    var modal=document.getElementById('ImageModal');
    var instance= bootstrap.Modal.getInstance(modal);
    instance.hide();
  }

  getFirstImageOrderItem(order: IOrderItem[]) {
    return order.length > 0 ? order[0].mainImage : null;
  }

}
