import React, { Component } from "react";
import Product from "./Product";
import SearchBar from "./SearchBar";
import axios, { AxiosError } from "axios";
import { IProduct } from "models";
import Loading from "./Loading";
import { Context, ContextInterface } from "../context";

interface productsState {
  products: IProduct[];
  loading: boolean;
  error: string;
  search?: string;
}

export default class Home extends Component {
  static contextType = Context;

  state: productsState = {
    products: [],
    loading: false,
    error: "",
  };

  fetchProducts = async () => {
    try {
      this.setState({ error: "" });
      this.setState({ loading: true });
      const response = await axios.get<IProduct[]>(
        "https://fakestoreapi.com/products"
      );
      this.setState({ products: response.data });
      this.setState({ loading: false });
    } catch (error: unknown) {
      this.setState({ loading: false });
      const e = error as AxiosError;
      this.setState({ error: e.message });
    }
  };

  updateData = (value: string) => {
    this.setState({ search: value });
  };

  componentDidMount(): void {
    this.fetchProducts();
  }

  render() {
    const { products, loading, search, error } = this.state;
    const context = this.context;
    const { products: contextProducts } = context as ContextInterface;

    const filteredProducts = (data: IProduct[]) =>
      data.filter((product) => {
        if (search && search.length > 1) {
          return product.title.toLowerCase().includes(search.toLowerCase());
        } else return product;
      });
    return (
      <div data-testid="Home-page">
        <SearchBar updateData={this.updateData} />
        {loading && <Loading />}
        {error && (
          <p
            data-testid="error"
            className="text-center mt-10 text-red-600 text-lg"
          >
            {error}
          </p>
        )}
        <div className="flex flex-grow flex-wrap items-stretch justify-center mt-10 gap-4">
          {filteredProducts(products).map((product) => (
            <Product product={product} key={product.id} />
          ))}
          {contextProducts &&
            products.length !== 0 &&
            filteredProducts(contextProducts).map((product) => (
              <Product product={product} key={product.id} />
            ))}
        </div>
      </div>
    );
  }
}
