/// reference path="../charactersModule.d.ts" /
import React, { useState, useEffect } from "react";
import Character from "./Character";
import SearchBar from "./SearchBar";
import MyModal from "./MyModal";
import axios, { AxiosError } from "axios";
import { IProduct } from "models";
import Loading from "./Loading";
import { Context, ContextInterface } from "../context";
import { ICharacter, ICharacterData } from "charactersModule";

const BASE_URL = "https://rickandmortyapi.com/api/";

export default function Home() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await axios.get<ICharacterData>(
          BASE_URL + "character"
        );
        setLoading(false);
        setCharacters(response.data.results);
      } catch (error) {
        setLoading(false);
        const e = error as AxiosError;
        setError(e.message);
      }
    };
    fetchData();
  }, [query, page]);

  const updateData = (value: string) => {
    setQuery(value);
  };

  const filteredCharacters = (characters: ICharacter[]) =>
    characters.filter((character) => {
      if (query && query.length > 1) {
        return character.name.toLowerCase().includes(query.toLowerCase());
      } else return character;
    });

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
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {filteredCharacters(characters).map((character) => (
          <Character character={character} key={character.id} />
        ))}
        {/* {contextProducts &&
          products.length !== 0 &&
          filteredProducts(contextProducts).map((character) => (
            <Character character={character} key={product.id} />
          ))} */}

        {/* {characters.map((character) => (
          <div
            className="flex gap-x-2 justify-center items-center"
            key={character.id}
          >
            <div>{character.name}</div>
            <img src={character.image} />
          </div>
        ))} */}
      </div>
    </div>
  );
}
