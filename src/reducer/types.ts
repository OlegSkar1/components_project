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
  name: string;
  status: string;
  gender: string;
  page: number;
  count: number;
  filtredCount: number;
}

export enum MyStateActionEnum {
  ADD_PRODUCT = "ADD_PRODUCT",
  GET_CHARACTERS = "GET_CHARACTERS",
  GET_INFO = "GET_INFO",
  NAME = "NAME",
  STATUS = "STATUS",
  GENDER = "GENDER",
  PAGE = "PAGE",
  COUNT = "COUNT",
  FILTRED_COUNT = "FILTRED_COUNT",
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

export interface nameAction {
  type: MyStateActionEnum.NAME;
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
export interface countAction {
  type: MyStateActionEnum.COUNT;
  payload: number;
}
export interface filtredCountAction {
  type: MyStateActionEnum.FILTRED_COUNT;
  payload: number;
}

export type aggregateAction =
  | addProductAction
  | getCharactersAction
  | getInfoAction
  | nameAction
  | statusAction
  | genderAction
  | pageAction
  | countAction
  | filtredCountAction;
