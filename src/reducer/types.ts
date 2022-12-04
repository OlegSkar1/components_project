import { IProduct } from "models";
import { Character } from "rickmortyapi/dist/interfaces";

export interface MyState {
  products: IProduct[];
  characters: Character[];
  query: string;
  status: string;
  gender: string;
}

export enum MyStateActionEnum {
  ADD_PRODUCT = "ADD_PRODUCT",
  GET_CHARACTERS = "GET_CHARACTERS",
  QUERY = "QUERY",
  STATUS = "STATUS",
  GENDER = "GENDER",
}

export interface addProductAction {
  type: MyStateActionEnum.ADD_PRODUCT;
  payload: IProduct;
}

export interface getCharactersAction {
  type: MyStateActionEnum.GET_CHARACTERS;
  payload: Character[];
}

export interface queryAction {
  type: MyStateActionEnum.QUERY;
  payload: string;
}

export interface statusAction {
  type: MyStateActionEnum.STATUS;
  payload: string;
}
export interface genderAction {
  type: MyStateActionEnum.GENDER;
  payload: string;
}

export type aggregateAction =
  | addProductAction
  | getCharactersAction
  | queryAction
  | statusAction
  | genderAction;
