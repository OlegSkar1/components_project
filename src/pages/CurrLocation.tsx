import React from "react";
import { ErrorMessage } from "components/ErrorMessage";
import Loading from "components/Loading";
import { UseCurrLocation } from "hook/UseCurrLocation";
import GoBackButton from "components/GoBackButton";

export const CurrLocation: React.FC = () => {
  const [navigate, charLocation, isLoading, error] = UseCurrLocation();

  return (
    <div className="bg-slate-900 rounded p-10">
      {isLoading && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <Loading />
        </div>
      )}
      <ErrorMessage error={error} />
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-100 md:text-5xl lg:text-6xl dark:text-white">
        {charLocation?.name}
      </h1>
      <GoBackButton navigate={navigate} />
    </div>
  );
};
