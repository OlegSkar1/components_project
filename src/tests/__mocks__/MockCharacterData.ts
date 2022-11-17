import { ICharacterData } from "charactersModule";
import MockCharacter from "./MockCharacter";

const MockCharacterData: ICharacterData = {
  info: {
    count: 3,
    pages: 1,
    next: "page=2",
  },
  results: [MockCharacter, MockCharacter, MockCharacter],
};

export default MockCharacterData;
