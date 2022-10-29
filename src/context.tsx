import { IProduct } from "models";
import React, { createContext, Component } from "react";

export interface ContextInterface {
  product?: IProduct;
  addProduct: (value: IProduct) => void;
}

type Props = {
  children: React.ReactNode;
};

export const Context = createContext({} as ContextInterface);

export class ContextState extends Component<Props> {
  addProduct = (value: IProduct) => {
    this.setState({ product: value });
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
