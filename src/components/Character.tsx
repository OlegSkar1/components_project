import { ICharacter } from "charactersModule";
import React, { useState } from "react";
import MyModal from "./MyModal";

interface CharacterProps {
  character: ICharacter;
}

const Character = ({ character }: CharacterProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: boolean) => {
    setOpen(value);
  };

  return (
    <>
      <div
        data-testid="character-item"
        className="flex flex-col items-center text-center justify-between p-6 max-w-[280px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={handleOpen}
      >
        <img src={character.image} className="w-1/2 " alt={character.name} />

        <p className="font-bold pb-2">{character.name}</p>

        <span className="pb-2">{character.species}</span>
        <span className="pb-2">From: {character.origin.name}</span>
      </div>
      <MyModal
        handleClose={handleClose}
        modalOpen={open}
        character={character}
      />
    </>
  );
};

export default Character;
