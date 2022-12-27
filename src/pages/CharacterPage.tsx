import ImacIcons from "components/ImacIcons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacter } from "rickmortyapi";
import { ApiResponse, Character } from "rickmortyapi/dist/interfaces";

function CharacterPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    const fetchChar = async () => {
      const charData = await getCharacter(Number(id));
      setCharacter(charData.data);
    };
    fetchChar();
  }, [id]);

  return (
    <div className="pt-10">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {character?.name}
      </h1>
      {character && <ImacIcons status={character.status} />}
      <span className="font-medium dark:text-gray-400">{`${character?.status} - ${character?.species}`}</span>

      <img
        className="max-w-xl h-auto rounded-lg shadow-xl dark:shadow-gray-800"
        src={character?.image}
        alt={character?.name}
      />

      <a
        href="#"
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Learn more
        <svg
          className="ml-2 -mr-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  );
}

export default CharacterPage;
