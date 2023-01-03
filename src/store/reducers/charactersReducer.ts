import actionCreators from "store/action-creators";
import {
  CharactersAction,
  CharactersState,
  CharactersStateActionEnum,
} from "types/characters";

const initialState: CharactersState = {
  characters: [],
  info: undefined,
  count: 0,
  filtredCount: 0,
  page: 1,
  gender: "",
  name: "",
  status: "",
  loading: false,
  error: null,
};

export const charactersReducer = (
  state = initialState,
  action: CharactersAction
): CharactersState => {
  switch (action.type) {
    case CharactersStateActionEnum.FETCH_CHARS:
      return { ...state, loading: true };
    case CharactersStateActionEnum.FETCH_CHARS_SUCCESS:
      return { ...state, loading: false, characters: [...action.payload] };
    case CharactersStateActionEnum.FETCH_CHARS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        characters: [],
      };
    case CharactersStateActionEnum.GET_INFO:
      return {
        ...state,
        info: action.payload,
      };
    case CharactersStateActionEnum.FILTRED_COUNT:
      return {
        ...state,
        filtredCount: action.payload,
      };
    case CharactersStateActionEnum.PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case CharactersStateActionEnum.NAME:
      return {
        ...state,
        name: action.payload,
      };
    case CharactersStateActionEnum.STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case CharactersStateActionEnum.GENDER:
      return {
        ...state,
        gender: action.payload,
      };
    case CharactersStateActionEnum.COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};
