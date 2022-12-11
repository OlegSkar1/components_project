import React, { useState, useEffect, useCallback } from "react";
import CharacterCard from "./Character";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import { useFetchData } from "hook/useFetchData";
import { useMyContext } from "hook/useMyContext";
import AccordionSort from "./AccordionSort";
import ResetSortButton from "./ResetSortButton";
import MyPagination, { numbersEnumCharacters } from "./MyPagination";
import SelectElems from "./SelectElems";

export default function Home() {
  const [numOfCharacters, setNumOfCharacters] = useState(20);
  const { state } = useMyContext();
  const [error, loading] = useFetchData({ numOfCharacters });
  const { characters, page } = state;

  const changeNumOfCharacters = (value: number) => {
    setNumOfCharacters(value);
  };

  return (
    <div data-testid="Home-page">
      <div className="flex flex-wrap justify-center items-start mt-5 gap-5">
        <SearchBar />
        <AccordionSort />
        <ResetSortButton />
        <SelectElems changeNumOfCharacters={changeNumOfCharacters} />
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
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </div>
      <MyPagination numOfCharacters={numOfCharacters} />
    </div>
  );
}
