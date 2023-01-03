import { Character } from "rickmortyapi/dist/interfaces";

export interface CharInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
export interface CharactersState {
  characters: Character[];
  info: CharInfo | undefined;
  name: string;
  status: string;
  gender: string;
  page: number;
  count: number;
  filtredCount: number;
  loading: boolean;
  error: null | string;
}

export enum CharactersStateActionEnum {
  FETCH_CHARS = "FETCH_CHARS",
  FETCH_CHARS_SUCCESS = "FETCH_CHARS_SUCCESS",
  FETCH_CHARS_ERROR = "FETCH_CHARS_ERROR",
  GET_INFO = "GET_INFO",
  NAME = "NAME",
  STATUS = "STATUS",
  GENDER = "GENDER",
  PAGE = "PAGE",
  COUNT = "COUNT",
  FILTRED_COUNT = "FILTRED_COUNT",
}

export interface fetchCharsAction {
  type: CharactersStateActionEnum.FETCH_CHARS;
}
export interface fetchCharsSuccessAction {
  type: CharactersStateActionEnum.FETCH_CHARS_SUCCESS;
  payload: Character[];
}
export interface fetchCharsErrorAction {
  type: CharactersStateActionEnum.FETCH_CHARS_ERROR;
  payload: string;
}
export interface getInfoAction {
  type: CharactersStateActionEnum.GET_INFO;
  payload: CharInfo | undefined;
}

export interface nameAction {
  type: CharactersStateActionEnum.NAME;
  payload: string;
}

export interface statusAction {
  type: CharactersStateActionEnum.STATUS;
  payload: string;
}
export interface genderAction {
  type: CharactersStateActionEnum.GENDER;
  payload: string;
}

export interface pageAction {
  type: CharactersStateActionEnum.PAGE;
  payload: number;
}
export interface countAction {
  type: CharactersStateActionEnum.COUNT;
  payload: number;
}
export interface filtredCountAction {
  type: CharactersStateActionEnum.FILTRED_COUNT;
  payload: number;
}

export type CharactersAction =
  | fetchCharsAction
  | fetchCharsSuccessAction
  | fetchCharsErrorAction
  | getInfoAction
  | nameAction
  | statusAction
  | genderAction
  | pageAction
  | countAction
  | filtredCountAction;
