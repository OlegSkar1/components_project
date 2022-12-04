import React from "react";
import CharacterCard from "./Character";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import { Character } from "rickmortyapi/dist/interfaces";
import { useFetchData } from "hook/useFetchData";
import { useMyContext } from "hook/useMyContext";
import AccordionSort from "./AccordionSort";

export default function Home() {
  const { state } = useMyContext();
  const [error, loading] = useFetchData();
  const { query, characters } = state;

  const filteredCharacters = (characters: Character[]) =>
    characters.filter((character) => {
      if (query && query.length > 1) {
        return character.name.toLowerCase().includes(query.toLowerCase());
      } else return character;
    });

  return (
    <div data-testid="Home-page">
      <div className="flex justify-center items-start mt-5 gap-x-5">
        <SearchBar />
        <AccordionSort />
      </div>

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
          <CharacterCard character={character} key={character.id} />
        ))}
      </div>
    </div>
  );
}
