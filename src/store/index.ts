import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./reducers/charactersSlice";
import productsReducer from "./reducers/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    characters: charactersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
