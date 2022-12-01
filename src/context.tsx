import React, { createContext, useReducer } from "react";
import reducer, { initialState } from "reducer";
import { aggregateAction, MyState } from "reducer/types";

export interface IContext {
  state: MyState;
  dispatch: React.Dispatch<aggregateAction>;
}

export const Context = createContext<IContext | MyState>(initialState);

export const ContextState = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
