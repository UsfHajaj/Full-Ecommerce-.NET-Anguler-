import { ProductParam } from './../shared/models/ProductParam';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ShopService } from './shop.service';
import { Ipagnation } from '../shared/models/pagnation';
import { IProduct } from '../shared/models/product';
import { ICategory } from '../shared/models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  constructor(
    private _shopService: ShopService,
    private toast: ToastrService
  ) {}
  product: IProduct[];
  category: ICategory[];
  productParam: ProductParam = new ProductParam();
  totalCount: number;

  sortingOption = [
    { name: 'Name', value: 'Name' },
    { name: 'Price:min-max', value: 'PriceAcn' },
    { name: 'Price:max-min', value: 'PriceDce' },
  ];

  @ViewChild('sortSelected') selected: ElementRef;
  ngOnInit(): void {
    this.productParam.sortSelected = this.sortingOption[0].value;
    this.getAllProduct();
    this.getCategory();
  }

  getAllProduct() {
    this._shopService.getProduct(this.productParam).subscribe({
      next: (value: Ipagnation) => {
        this.product = value.data;
        this.totalCount = value.totalCount;
        this.productParam.PageNumber = value.pageNumber;
        this.productParam.PageSize = value.pageSize;
        this.toast.success('Success show product', 'success');
      },
      // error: (err) => {
      //   console.log('Error', err);
      //   this.toast.error('Error loading product', 'Error');
      // },
    });
  }
  getCategory() {
    this._shopService.getCategory().subscribe({
      next: (value) => {
        this.category = value;
      },
    });
  }

  selectedId(categoryid: number) {
    this.productParam.categoryId = categoryid;
    this.getAllProduct();
  }
  sortingByPrice(sort: Event) {
    this.productParam.sortSelected = (sort.target as HTMLInputElement).value;
    console.log(this.productParam.sortSelected);
    this.getAllProduct();
  }

  onSearch() {
    // this.search = Search;
    this.getAllProduct();
  }
  resetValue() {
    this.productParam.search = '';
    this.productParam.sortSelected = this.sortingOption[0].value;
    this.selected.nativeElement.selectedIndex = 0;
    this.productParam.categoryId = 0;
    this.getAllProduct();
  }

  onChangePage(event: any) {
    this.productParam.PageNumber = event;
    this.getAllProduct();
  }
}
