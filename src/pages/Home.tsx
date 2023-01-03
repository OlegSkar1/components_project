import React, { useState } from "react";
import CharacterCard from "../components/Character";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import { useFetchData } from "hook/useFetchData";
import { useMyContext } from "hook/useMyContext";
import AccordionSort from "../components/AccordionSort";
import ResetSortButton from "../components/ResetSortButton";
import MyPagination from "../components/MyPagination";
import SelectElems from "../components/SelectElems";
import { ErrorMessage } from "components/ErrorMessage";

export default function Home() {
  const [numOfCharacters, setNumOfCharacters] = useState(20);
  // const { state } = useMyContext();
  const [error, loading, characters] = useFetchData({ numOfCharacters });

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
      {error && <ErrorMessage error={error} />}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </div>
      <MyPagination numOfCharacters={numOfCharacters} />
    </div>
  );
}
