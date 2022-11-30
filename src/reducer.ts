import { ICharacter } from "charactersModule";
import { IProduct } from "models";

export type MyAction =
  | { type: "addProduct"; payload: IProduct }
  | { type: "getCharacters"; payload: ICharacter[] }
  | { type: "query"; payload: string };

export interface MyState {
  products: IProduct[];
  characters: ICharacter[];
  query: string;
}

export default (state: MyState, action: MyAction): MyState => {
  switch (action.type) {
    case "addProduct":
      return { ...state, products: [...state.products, action.payload] };
    case "getCharacters":
      return { ...state, characters: [...action.payload] };
    case "query":
      return { ...state, query: action.payload };
    default:
      return state;
  }
};
