import React, { useState, useEffect } from "react";
import Character from "./Character";
import SearchBar from "./SearchBar";
import axios, { AxiosError } from "axios";
import Loading from "./Loading";
import { ICharacter, ICharacterData } from "charactersModule";

const BASE_URL = "https://rickandmortyapi.com/api/";

export default function Home() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        setError("");
        setLoading(true);
        if (!query) {
          response = await axios.get<ICharacterData>(BASE_URL + "character");
        } else {
          response = await axios.get<ICharacterData>(
            `${BASE_URL}character/?name=${query}`
          );
        }

        setLoading(false);
        setCharacters(response.data.results);
      } catch (error) {
        setLoading(false);
        const e = error as AxiosError;
        setError(e.message);
      }
    };
    fetchData();
  }, [query]);

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
      </div>
    </div>
  );
}
