import { IProduct } from "models";
import React, { createContext, useReducer } from "react";
import reducer, { Action } from "reducer";

export interface ContextInterface {
  products: IProduct[];
}

type Props = {
  children: React.ReactNode;
};

export const Context = createContext({} as IProduct[]);
export const dispatchContext = createContext({} as React.Dispatch<Action>);

export const ContextState = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <Context.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </Context.Provider>
  );
};
