import { ICharacter } from "charactersModule";
import { IProduct } from "models";
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
  getCharacters: (payload: ICharacter[]): getCharactersAction => ({
    type: MyStateActionEnum.GET_CHARACTERS,
    payload,
  }),
  setQuery: (payload: string): queryAction => ({
    type: MyStateActionEnum.QUERY,
    payload,
  }),
};
