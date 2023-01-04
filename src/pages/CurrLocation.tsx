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
  const [characters, setCharacters] = useState<Character[] | Character>([]);
  const [charError, setCharError] = useState("");

  useEffect(() => {
    const fetchChars = async () => {
      try {
        if (charactersIds.length > 1) {
          const fetch = await getCharacter(charactersIds);
          setCharacters(fetch.data);
        } else {
          const fetch = await getCharacter(charactersIds);
          setCharacters(fetch.data);
        }

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
      {charLocation && (
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl bg-gradient-to-bl from-purple-600 to-blue-500 text-transparent bg-clip-text">
          {charLocation?.name}
        </h1>
      )}
      {charLocation && (
        <div className="mb-4">
          <span className=" text-xl text-gray-100">type:</span>{" "}
          <span className="text-gray-100 font-light text-xl">
            {charLocation?.type}
          </span>
          <span className="text-xl text-gray-100 ml-10">dimension:</span>{" "}
          <span className="text-gray-100 font-light text-xl">
            {charLocation?.dimension}
          </span>
        </div>
      )}

      <GoBackButton navigate={navigate} />
      <ErrorMessage error={charError} />
      <div className="flex flex-wrap justify-center gap-3 mt-4 mb-4">
        {characters instanceof Array ? (
          characters.map((character) => (
            <CharacterCard character={character} key={character.id} />
          ))
        ) : (
          <CharacterCard character={characters} />
        )}
      </div>
    </div>
  );
};
