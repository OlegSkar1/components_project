import { IProduct } from "models";
import { addProductAction, ProductsActionEnum } from "../../types/products";

export const addProduct = (payload: IProduct): addProductAction => ({
  type: ProductsActionEnum.ADD_PRODUCT,
  payload,
});
