import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "rickmortyapi/dist/interfaces";

interface CharInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
interface CharactersState {
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

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    fetchChars(state, action: PayloadAction<Character[]>) {
      state.characters = action.payload;
    },
    getInfo(state, action: PayloadAction<CharInfo>) {
      state.info = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setFiltredCount(state, action: PayloadAction<number>) {
      state.filtredCount = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  fetchChars,
  getInfo,
  setCount,
  setFiltredCount,
  setGender,
  setName,
  setPage,
  setStatus,
  setError,
  setLoading,
} = charactersSlice.actions;

export default charactersSlice.reducer;
