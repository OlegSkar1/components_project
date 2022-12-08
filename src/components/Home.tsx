import React from "react";
import CharacterCard from "./Character";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import { useFetchData } from "hook/useFetchData";
import { useMyContext } from "hook/useMyContext";
import AccordionSort from "./AccordionSort";
import ResetSortButton from "./ResetSortButton";
import MyPagination from "./MyPagination";

export default function Home() {
  const { state } = useMyContext();
  const [error, loading] = useFetchData();
  const { characters } = state;

  return (
    <div data-testid="Home-page">
      <div className="flex flex-wrap justify-center items-start mt-5 gap-5">
        <SearchBar />
        <AccordionSort />
        <ResetSortButton />
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
      <MyPagination />
    </div>
  );
}
