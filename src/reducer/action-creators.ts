import { IProduct } from "models";
import { Character } from "rickmortyapi/dist/interfaces";
import {
  addProductAction,
  countAction,
  filtredCountAction,
  genderAction,
  getCharactersAction,
  getInfoAction,
  MyInfo,
  MyStateActionEnum,
  pageAction,
  statusAction,
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
  getInfo: (payload: MyInfo | undefined): getInfoAction => ({
    type: MyStateActionEnum.GET_INFO,
    payload,
  }),

  getCount: (payload: number): countAction => ({
    type: MyStateActionEnum.COUNT,
    payload,
  }),

  setStatus: (payload: string): statusAction => ({
    type: MyStateActionEnum.STATUS,
    payload,
  }),
  setGender: (payload: string): genderAction => ({
    type: MyStateActionEnum.GENDER,
    payload,
  }),
  setPage: (payload: number): pageAction => ({
    type: MyStateActionEnum.PAGE,
    payload,
  }),
  getFiltredCount: (payload: number): filtredCountAction => ({
    type: MyStateActionEnum.FILTRED_COUNT,
    payload,
  }),
};
