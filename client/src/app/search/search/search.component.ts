import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ProductParam } from '../../shared/models/ProductParam';
import { ShopService } from '../../shop/shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  products: IProduct[] = [];
  loading: boolean = false;
  productParams: ProductParam = new ProductParam();
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const query = params['query'];
    if (query) {
      this.productParams.search = query;
      this.getProducts();
    }
  });
}


  getProducts() {
    this.loading = true; // إضافة تفعيل الـ loading
    this.shopService.getProduct(this.productParams).subscribe({
      next: (res) => {
        this.products = res.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }
  trackByFn(index: number, item: IProduct): any {
    return item.id || index;
  }
}
