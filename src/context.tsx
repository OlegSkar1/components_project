import { IProduct } from "models";
import React, { createContext, Component } from "react";

export interface ContextInterface {
  products?: IProduct[];
  addProduct: (value: IProduct) => void;
}

type Props = {
  children: React.ReactNode;
};

export const Context = createContext({} as ContextInterface);

const productsArr: IProduct[] = [];
export class ContextState extends Component<Props> {
  addProduct = (value: IProduct) => {
    productsArr.push(value);
    this.setState({ products: productsArr });
  };

  state = {
    addProduct: this.addProduct,
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
