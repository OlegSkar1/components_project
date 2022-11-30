import { IProduct } from "models";

export type MyAction = { type: "addProduct"; payload: IProduct };

export interface MyState {
  products: IProduct[];
}

export default (state: MyState, action: MyAction): MyState => {
  switch (action.type) {
    case "addProduct":
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
};
