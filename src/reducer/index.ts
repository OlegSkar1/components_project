import { aggregateAction, MyState, MyStateActionEnum } from "./types";

export const initialState: MyState = {
  characters: [],
  products: [],
  query: "",
};

export default (state = initialState, action: aggregateAction): MyState => {
  switch (action.type) {
    case MyStateActionEnum.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case MyStateActionEnum.GET_CHARACTERS:
      return { ...state, characters: [...action.payload] };
    case MyStateActionEnum.QUERY:
      return { ...state, query: action.payload };
    default:
      return state;
  }
};
