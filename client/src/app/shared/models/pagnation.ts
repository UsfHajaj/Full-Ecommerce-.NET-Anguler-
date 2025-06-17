import { IProduct } from "./product"

export interface Ipagnation {
  pageNumber: number
  pageSize: number
  totalCount: number
  data: IProduct[]
}

