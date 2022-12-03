import MockCharacter from "./MockCharacter";
import { Character, Info } from "rickmortyapi/dist/interfaces";

const MockCharacterData: Info<Character[]> = {
  info: {
    count: 3,
    pages: 1,
    next: "page=2",
    prev: null,
  },
  results: [MockCharacter, MockCharacter, MockCharacter],
};

export default MockCharacterData;
