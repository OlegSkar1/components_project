import React from "react";
import { ErrorMessage } from "components/ErrorMessage";
import GoBackButton from "components/GoBackButton";
import ImacIcons from "components/ImacIcons";
import Loading from "components/Loading";
import { useFetchCharPage } from "hook/useFetchCharPage";
import { Link } from "react-router-dom";

function CharacterPage() {
  const [navigate, character, episode, location, isLoading, error] =
    useFetchCharPage();

  return (
    <div className="p-10 bg-slate-900 rounded">
      {isLoading && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <Loading />
        </div>
      )}
      <ErrorMessage error={error} />

      <div className="flex justify-center">
        <img
          className="max-w-xl h-auto rounded-lg shadow-xl dark:shadow-gray-800 mb-4"
          src={character?.image}
          alt={character?.name}
        />
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-100 md:text-5xl lg:text-6xl dark:text-white">
          {character?.name}
        </h1>

        <div className="flex items-center mb-2">
          {character && <ImacIcons status={character.status} />}
          <span className="font-medium text-gray-100">{`${character?.status} - ${character?.species}`}</span>
        </div>

        <div className="font-normal text-lg">
          <p className="text-gray-400">Last known location:</p>
          <Link
            to={`/location/${location?.id}`}
            className="text-gray-100 pb-2 hover:text-yellow-500 hover:transition-colors"
          >
            {character?.location.name}
          </Link>
          <p className="text-gray-400">First seen in:</p>
          {character && (
            <Link
              to={`/episode/${episode?.id}`}
              className="text-gray-100 hover:text-yellow-500 hover:transition-colors"
            >
              {episode?.name}
            </Link>
          )}
        </div>
      </div>

      <GoBackButton navigate={navigate} />
    </div>
  );
}

export default CharacterPage;
