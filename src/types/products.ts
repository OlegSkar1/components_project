import { IProduct } from "models";

export interface ProductsState {
  products: IProduct[];
}

export enum ProductsActionEnum {
  ADD_PRODUCT = "ADD_PRODUCT",
}

export interface addProductAction {
  type: ProductsActionEnum.ADD_PRODUCT;
  payload: IProduct;
}
