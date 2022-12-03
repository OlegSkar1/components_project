import { IProduct } from "models";
import { Character } from "rickmortyapi/dist/interfaces";
import {
  addProductAction,
  getCharactersAction,
  MyStateActionEnum,
  queryAction,
} from "./types";

export const reducerActionCreators = {
  addProduct: (payload: IProduct): addProductAction => ({
    type: MyStateActionEnum.ADD_PRODUCT,
    payload,
  }),
  getCharacters: (payload: Character[]): getCharactersAction => ({
    type: MyStateActionEnum.GET_CHARACTERS,
    payload,
  }),
  setQuery: (payload: string): queryAction => ({
    type: MyStateActionEnum.QUERY,
    payload,
  }),
};
