import React, { useEffect, useState } from "react";
import { ErrorMessage } from "components/ErrorMessage";
import Loading from "components/Loading";
import { UseCurrLocation } from "hook/UseCurrLocation";
import GoBackButton from "components/GoBackButton";
import CharacterCard from "components/Character";
import { getCharacter } from "rickmortyapi";
import { Character } from "rickmortyapi/dist/interfaces";

export const CurrLocation: React.FC = () => {
  const [navigate, charLocation, isLoading, error, charactersIds] =
    UseCurrLocation();

  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [charError, setCharError] = useState("");

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const fetch = await getCharacter(charactersIds);
        setCharacters(fetch.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const e = error as Error;
        setCharError(e.message);
      }
    };
    fetchChars();
  }, [charactersIds]);

  return (
    <div className="bg-slate-900 rounded p-10">
      {isLoading && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <Loading />
        </div>
      )}
      {loading && (
        <div className="absolute top-40 left-1/2 -translate-x-1/2">
          <Loading />
        </div>
      )}
      <ErrorMessage error={error} />
      <ErrorMessage error={charError} />
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-100 md:text-5xl lg:text-6xl dark:text-white">
        {charLocation?.name}
      </h1>
      <span className="text-xl text-gray-100">type:</span>{" "}
      <span className="mb-3 text-gray-100 font-light text-xl">
        {charLocation?.type}
      </span>
      <span className="text-xl text-gray-100 ml-10">dimension:</span>{" "}
      <span className="mb-3 text-gray-100 font-light text-xl">
        {charLocation?.dimension}
      </span>
      <div className="flex flex-wrap justify-center gap-3 mt-4 mb-4">
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </div>
      <GoBackButton navigate={navigate} />
    </div>
  );
};
