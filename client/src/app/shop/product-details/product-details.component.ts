import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _shopService: ShopService,
    private _route: ActivatedRoute,
    private _tost: ToastrService,
    private _basket:BasketService
  ) {}
  product: IProduct;
  id: number;
  mainImage: string;
  quantity:number=1
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.id = parseInt(this._route.snapshot.paramMap.get('id'));
    this._shopService
      .getProductDetails(parseInt(this._route.snapshot.paramMap.get('id')))
      .subscribe({
        next: (value) => {
          this.product = value;
          this.mainImage = this.product.photos[0].imageName;
        },
      });
  }
  ReplaceImage(src: string) {
    this.mainImage = src;
  }

  incrementBasket() {
    if (this.quantity < 10) {
      this.quantity++;
      this._tost.success("Item Has Been Added To Basket", "Success");

    } else {
      this._tost.error('You Hav Add More Than 10 Items','Error')
    }
  }
  decrementBasket() {
    if (this.quantity > 1) {
      this.quantity--;
      this._tost.warning("Item Has Been Decrement To Basket", "Enough");

    } else {
      this._tost.error('You Hav Remove All Items','Error')
    }
  }
  AddToBasket() {
    this._basket.addItemToBasket(this.product);
  }
  calculateDiscound(oldPrice:number, newPrice:number):number {
    return parseFloat(
      Math.round(((oldPrice-newPrice)/oldPrice)*100).toFixed(1)
    )
  }
}
