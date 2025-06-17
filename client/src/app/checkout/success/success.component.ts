import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent implements OnInit{
  constructor(private rout:ActivatedRoute){}
  ngOnInit(): void {
    this.rout.queryParams.subscribe(param => {
      this.orderId=param['orderId']
    })
  }
  orderId:number=0
}
