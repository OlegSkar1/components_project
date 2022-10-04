import React, { Component } from "react";
import Product from "./Product";
import SearchBar from "./SearchBar";
import axios from "axios";
import { IProduct } from "models";

interface productsState {
  products: IProduct[];
}

export default class Home extends Component {
  state: productsState = {
    products: [],
  };

  fetchProducts = async () => {
    const response = await axios.get<IProduct[]>(
      "https://fakestoreapi.com/products"
    );
    this.setState({ products: response.data });
  };

  componentDidMount(): void {
    this.fetchProducts();
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <SearchBar />
        <div className="flex flex-grow flex-wrap items-stretch justify-center mt-10 gap-4">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </>
    );
  }
}
