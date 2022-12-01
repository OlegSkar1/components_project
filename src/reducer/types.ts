import { ICharacter } from "charactersModule";
import { IProduct } from "models";

export interface MyState {
  products: IProduct[];
  characters: ICharacter[];
  query: string;
}

export enum MyStateActionEnum {
  ADD_PRODUCT = "ADD_PRODUCT",
  GET_CHARACTERS = "GET_CHARACTERS",
  QUERY = "QUERY",
}

export interface addProductAction {
  type: MyStateActionEnum.ADD_PRODUCT;
  payload: IProduct;
}

export interface getCharactersAction {
  type: MyStateActionEnum.GET_CHARACTERS;
  payload: ICharacter[];
}

export interface queryAction {
  type: MyStateActionEnum.QUERY;
  payload: string;
}

export type aggregateAction =
  | addProductAction
  | getCharactersAction
  | queryAction;
