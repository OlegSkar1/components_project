import { ICharacter } from "charactersModule";
import { IProduct } from "models";
import React, { createContext, useReducer } from "react";
import reducer, { MyAction, MyState } from "reducer";

const initialState: MyState = { products: [], characters: [], query: "" };

export interface MyContext {
  state: MyState;
  dispatch: React.Dispatch<MyAction>;
  addProduct: (value: IProduct) => void;
  getCharacters: (value: ICharacter[]) => void;
  setQuery: (value: string) => void;
}

export const Context = createContext<MyContext | null>(null);

export const ContextState = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addProduct = (value: IProduct) => {
    dispatch({ type: "addProduct", payload: value });
  };

  const getCharacters = (characters: ICharacter[]) => {
    dispatch({ type: "getCharacters", payload: characters });
  };

  const setQuery = (query: string) => {
    dispatch({ type: "query", payload: query });
  };

  return (
    <Context.Provider
      value={{ state, dispatch, addProduct, getCharacters, setQuery }}
    >
      {children}
    </Context.Provider>
  );
};
