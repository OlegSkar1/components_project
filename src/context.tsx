import { IProduct } from "models";
import React, { createContext, useState } from "react";

export interface ContextInterface {
  products?: IProduct[];
  addProduct: (value: IProduct) => void;
}

type Props = {
  children: React.ReactNode;
};

export const Context = createContext({} as ContextInterface);

const productsArr: IProduct[] = [];

export const ContextState = ({ children }: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const addProduct = (value: IProduct) => {
    productsArr.push(value);
    setProducts(productsArr);
  };

  const value = { products, addProduct };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
