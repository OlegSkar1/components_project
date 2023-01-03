import {
  addProductAction,
  ProductsActionEnum,
  ProductsState,
} from "types/products";

const initialState: ProductsState = {
  products: [],
};

export const productsReducer = (
  state = initialState,
  action: addProductAction
): ProductsState => {
  switch (action.type) {
    case ProductsActionEnum.ADD_PRODUCT: {
      return { ...state, products: [...state.products, action.payload] };
    }
    default:
      return state;
  }
};
