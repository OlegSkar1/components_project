import { combineReducers } from "redux";
import { charactersReducer } from "./charactersReducer";
import { productsReducer } from "./productsReducer";

export const rootReducer = combineReducers({
  products: productsReducer,
  characters: charactersReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
