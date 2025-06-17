import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ipagnation } from '../shared/models/pagnation';
import { Observable } from 'rxjs';
import { ICategory } from '../shared/models/category';
import { ProductParam } from '../shared/models/ProductParam';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = "https://localhost:44375/api/";
  product!:IProduct[]
  constructor(private _http: HttpClient) { }

  getProduct(productParam:ProductParam) {
    let param = new HttpParams();
    if (productParam.categoryId) {
      param=param.append("categoryId",productParam.categoryId)
    }
    if (productParam.sortSelected) {
      param=param.append("Sort",productParam.sortSelected)
    }
    if (productParam.search) {
      param=param.append("Search",productParam.search)
    }
    param = param.append("PageNumber", productParam.PageNumber)
    param=param.append("PageSize",productParam.PageSize)
    return this._http.get<Ipagnation>(this.baseUrl+"Products/get-all",{params:param});
  }

  getCategory() {
    return this._http.get<ICategory[]>(this.baseUrl+"Categories/get-all")
  }
  getProductDetails(id:number) {
    return this._http.get<IProduct>(this.baseUrl+'Products/get-by-id/'+id)
  }


}

