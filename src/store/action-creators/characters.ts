import { Character } from "rickmortyapi/dist/interfaces";
import {
  CharactersStateActionEnum,
  CharInfo,
  filtredCountAction,
  getInfoAction,
  fetchCharsSuccessAction,
  fetchCharsErrorAction,
  fetchCharsAction,
  pageAction,
  nameAction,
  statusAction,
  genderAction,
  countAction,
} from "types/characters";

export const getInfo = (payload: CharInfo | undefined): getInfoAction => ({
  type: CharactersStateActionEnum.GET_INFO,
  payload,
});

export const getFiltredCount = (payload: number): filtredCountAction => ({
  type: CharactersStateActionEnum.FILTRED_COUNT,
  payload,
});

export const getCharactersSuccess = (
  payload: Character[]
): fetchCharsSuccessAction => ({
  type: CharactersStateActionEnum.FETCH_CHARS_SUCCESS,
  payload,
});
export const getCharactersError = (payload: string): fetchCharsErrorAction => ({
  type: CharactersStateActionEnum.FETCH_CHARS_ERROR,
  payload,
});
export const fetchCharacters = (): fetchCharsAction => ({
  type: CharactersStateActionEnum.FETCH_CHARS,
});

export const setPage = (payload: number): pageAction => ({
  type: CharactersStateActionEnum.PAGE,
  payload,
});
export const setName = (payload: string): nameAction => ({
  type: CharactersStateActionEnum.NAME,
  payload,
});
export const setStatus = (payload: string): statusAction => ({
  type: CharactersStateActionEnum.STATUS,
  payload,
});
export const setGender = (payload: string): genderAction => ({
  type: CharactersStateActionEnum.GENDER,
  payload,
});
export const getCount = (payload: number): countAction => ({
  type: CharactersStateActionEnum.COUNT,
  payload,
});
