import React from "react";
import Character from "./Character";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import { ICharacter } from "charactersModule";
import { useMyContext } from "hook/useMyContext";
import { useFetchData } from "hook/useFetchData";

export default function Home() {
  const { state } = useMyContext();
  const [error, loading] = useFetchData();
  const { query, characters } = state;

  const filteredCharacters = (characters: ICharacter[]) =>
    characters.filter((character) => {
      if (query && query.length > 1) {
        return character.name.toLowerCase().includes(query.toLowerCase());
      } else return character;
    });

  return (
    <div data-testid="Home-page">
      <SearchBar />
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
