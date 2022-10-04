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
    const { details } = this.state;

    const btnBgClasses = details ? "bg-yellow-500" : "bg-blue-500";
    const btnClasses = ["py-2 px-4 border rounded", btnBgClasses];

    return (
      <div className="flex flex-col items-center text-center justify-between p-6 max-w-[280px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <img src={product.image} className="w-1/2" alt={product.title} />

        <p>{product.title}</p>

        <span className="font-bold">{product.price}$</span>

        <button className={btnClasses.join(" ")} onClick={this.clickHandler}>
          {details ? "Hide details" : "Show details"}
        </button>

        {this.state.details && (
          <>
            <div className="py-2 text-justify">{product.description}</div>
            <span>{product.rating.rate}</span>
          </>
        )}
      </div>
    );
  }
}
