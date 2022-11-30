import React, { createContext, useReducer } from "react";
import reducer, { MyAction, MyState } from "reducer";

const initialState: MyState = { products: [] };

export interface MyContext {
  state: MyState;
  dispatch: React.Dispatch<MyAction>;
}

export const Context = createContext<MyContext | null>(null);

export const ContextState = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
