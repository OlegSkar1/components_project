import { IProduct } from "models";

export type Action = { type: "addProduct"; payload: IProduct };

export default (state: IProduct[], action: Action) => {
  switch (action.type) {
    case "addProduct":
      return [...state, action.payload];
    default:
      return state;
  }
};
