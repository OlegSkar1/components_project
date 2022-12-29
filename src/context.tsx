import React, { createContext, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import reducer from "reducer";
import { aggregateAction, MyState } from "reducer/types";

export interface IContext {
  state: MyState;
  dispatch: React.Dispatch<aggregateAction>;
}

export let initialState: MyState = {
  characters: [],
  info: undefined,
  products: [],
  name: "",
  status: "",
  gender: "",
  page: 1,
  count: 0,
  filtredCount: 0,
};

export const Context = createContext<IContext | MyState>(initialState);

export const ContextState = ({ children }: { children: JSX.Element }) => {
  const [searchParams] = useSearchParams();

  const queryName = searchParams.get("name") || "";
  const queryGender = searchParams.get("gender") || "";
  const queryStatus = searchParams.get("status") || "";

  initialState = {
    ...initialState,
    name: queryName,
    gender: queryGender,
    status: queryStatus,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
