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
    <div data-testid="CharacterPage" className="sm:p-20 bg-slate-900 rounded">
      {isLoading && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <Loading />
        </div>
      )}
      <ErrorMessage error={error} />

      <div className="flex lg:justify-start justify-center sm:flex-wrap flex-wrap items-start lg:max-w-3xl min-w-fit sm:max-w-min gap-x-10 bg-slate-700  rounded mx-auto sm:p-4">
        <div>
          <img
            className="max-w-xl h-auto rounded-lg shadow-xl dark:shadow-gray-800 mb-4 mt-4 sm:pt-0"
            src={character?.image}
            alt={character?.name}
          />
          <GoBackButton navigate={navigate} />
        </div>

        <div>
          <h1
            role={"heading"}
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-bl from-purple-600 to-blue-500">
              {character?.name}
            </span>
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
      </div>
    </div>
  );
}

export default CharacterPage;
