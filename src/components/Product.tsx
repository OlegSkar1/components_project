import { IProduct } from "models";
import React, { Component } from "react";

interface ProductProps {
  product: IProduct;
}

interface ProductState {
  details: boolean;
}

export default class Product extends Component<ProductProps, ProductState> {
  constructor(props: ProductProps) {
    super(props);
    this.state = {
      details: false,
    };
  }

  clickHandler = () => {
    this.setState((prev) => ({
      details: !prev.details,
    }));
  };

  render() {
    const { product } = this.props;
    return (
      <div className="max-w-[300px] border py-2 px-4 rounded flex flex-col items-center text-center">
        <img src={product.image} className="w-1/2" alt={product.title} />

        <p>{product.title}</p>

        <span className="font-bold">{product.price}</span>

        <button
          className="py-2 px-4 border bg-yellow-500 rounded"
          onClick={this.clickHandler}
        >
          Show details
        </button>

        {this.state.details && <div>{product.description}</div>}
      </div>
    );
  }
}
