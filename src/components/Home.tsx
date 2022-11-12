/// reference path="../charactersModule.d.ts" /
import React, { useState, useEffect } from "react";
import Product from "./Product";
import SearchBar from "./SearchBar";
import axios, { AxiosError } from "axios";
import { IProduct } from "models";
import Loading from "./Loading";
import { Context, ContextInterface } from "../context";

const BASE_URL = "https://rickandmortyapi.com/api/";

interface productsState {
  products: IProduct[];
  loading: boolean;
  error: string;
  search?: string;
}

export default function Home() {
  const [character, setCharacter] = useState<Character.Result[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Character.Character>(
          BASE_URL + "character"
        );
        const characterData = response.data.results;
        setCharacter(characterData);
      } catch (error) {}
    };
    fetchData();
  }, [query, page]);

  const updateData = (value: string) => {
    setQuery(value);
  };

  // const filteredProducts = (data: IProduct[]) =>
  //   data.filter((product) => {
  //     if (query && query.length > 1) {
  //       return product.title.toLowerCase().includes(query.toLowerCase());
  //     } else return product;
  //   });

  return (
    <div data-testid="Home-page">
      <SearchBar updateData={updateData} />
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
        {/* {filteredProducts(products).map((product) => (
          <Product product={product} key={product.id} />
        ))}
        {contextProducts &&
          products.length !== 0 &&
          filteredProducts(contextProducts).map((product) => (
            <Product product={product} key={product.id} />
          ))} */}

        {character.map((character) => (
          <div
            className="flex gap-x-2 justify-center items-center"
            key={character.id}
          >
            <div>{character.name}</div>
            <img src={character.image} />
          </div>
        ))}
      </div>
    </div>
  );
}
