import React from "react";
import { ErrorMessage } from "components/ErrorMessage";
import GoBackButton from "components/GoBackButton";
import Loading from "components/Loading";
import { useFetchFirstEpisode } from "hook/useFetchFirstEpisode";

export const FirstEpisode: React.FC = () => {
  const [navigate, episode, isLoading, error] = useFetchFirstEpisode();

  return (
    <div className="bg-slate-900 rounded p-10">
      {isLoading && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <Loading />
        </div>
      )}
      <ErrorMessage error={error} />
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-100 md:text-5xl lg:text-6xl dark:text-white">
        {episode?.name}
      </h1>
      <GoBackButton navigate={navigate} />
    </div>
  );
};
