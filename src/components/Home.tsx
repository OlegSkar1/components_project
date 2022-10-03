import React, { Component } from "react";
import Product from "./Product";
import SearchBar from "./SearchBar";
import products from "data/products";

export default class Home extends Component {
  render() {
    return (
      <>
        <SearchBar />
        <div className="flex flex-wrap items-center justify-center mt-10 gap-4">
          <Product product={products[0]} />
          <Product product={products[0]} />
          <Product product={products[0]} />
          <Product product={products[0]} />
        </div>
      </>
    );
  }
}
