import { aggregateAction, MyState, MyStateActionEnum } from "./types";

export const initialState: MyState = {
  characters: [],
  info: undefined,
  products: [],
  query: "",
  status: "",
  gender: "",
  page: 1,
};

export default (state = initialState, action: aggregateAction): MyState => {
  switch (action.type) {
    case MyStateActionEnum.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case MyStateActionEnum.GET_CHARACTERS:
      return { ...state, characters: [...action.payload] };
    case MyStateActionEnum.GET_INFO:
      return { ...state, info: action.payload };
    case MyStateActionEnum.QUERY:
      return { ...state, query: action.payload };
    case MyStateActionEnum.STATUS:
      return { ...state, status: action.payload };
    case MyStateActionEnum.GENDER:
      return { ...state, gender: action.payload };
    case MyStateActionEnum.PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
