import { IProduct } from "models";
import { Character } from "rickmortyapi/dist/interfaces";

export interface MyInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
export interface MyState {
  products: IProduct[];
  characters: Character[];
  info: MyInfo | undefined;
  query: string;
  status: string;
  gender: string;
  page: number;
}

export enum MyStateActionEnum {
  ADD_PRODUCT = "ADD_PRODUCT",
  GET_CHARACTERS = "GET_CHARACTERS",
  GET_INFO = "GET_INFO",
  QUERY = "QUERY",
  STATUS = "STATUS",
  GENDER = "GENDER",
  PAGE = "PAGE",
}

export interface addProductAction {
  type: MyStateActionEnum.ADD_PRODUCT;
  payload: IProduct;
}

export interface getCharactersAction {
  type: MyStateActionEnum.GET_CHARACTERS;
  payload: Character[];
}
export interface getInfoAction {
  type: MyStateActionEnum.GET_INFO;
  payload: MyInfo | undefined;
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

export interface pageAction {
  type: MyStateActionEnum.PAGE;
  payload: number;
}

export type aggregateAction =
  | addProductAction
  | getCharactersAction
  | getInfoAction
  | queryAction
  | statusAction
  | genderAction
  | pageAction;
