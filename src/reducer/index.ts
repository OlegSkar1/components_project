import { initialState } from "context";
import { aggregateAction, MyState, MyStateActionEnum } from "./types";

export default (state = initialState, action: aggregateAction): MyState => {
  switch (action.type) {
    case MyStateActionEnum.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case MyStateActionEnum.GET_CHARACTERS:
      return { ...state, characters: [...action.payload] };
    case MyStateActionEnum.GET_INFO:
      return { ...state, info: action.payload };
    case MyStateActionEnum.COUNT:
      return { ...state, count: action.payload };
    case MyStateActionEnum.NAME:
      return { ...state, name: action.payload };
    case MyStateActionEnum.STATUS:
      return { ...state, status: action.payload };
    case MyStateActionEnum.GENDER:
      return { ...state, gender: action.payload };
    case MyStateActionEnum.PAGE:
      return { ...state, page: action.payload };
    case MyStateActionEnum.FILTRED_COUNT:
      return { ...state, filtredCount: action.payload };
    default:
      return state;
  }
};
