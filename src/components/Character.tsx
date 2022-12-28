import React from "react";
import { Character } from "rickmortyapi/dist/interfaces";
import { Link } from "react-router-dom";

interface CharacterProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterProps) => {
  return (
    <Link to={`/character/${character.id}`} className="flex">
      <div
        data-testid="character-item"
        className="flex flex-col items-center text-center justify-between p-6 max-w-[280px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <img src={character.image} className="w-1/2 " alt={character.name} />

        <p className="font-bold pb-2">{character.name}</p>

        <span className="pb-2">{character.species}</span>
        <span className="pb-2">From: {character.origin.name}</span>
      </div>
    </Link>
  );
};

export default CharacterCard;
