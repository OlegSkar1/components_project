import { ICharacter } from "charactersModule";

const MockCharacter: ICharacter = {
  id: 1,
  name: "Test",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth",
    url: "http://localhost:8080",
  },
  location: {
    name: "test location",
    url: "http://localhost:8080",
  },
  image: "test image",
  episode: ["episode-1", "episode-2"],
  url: "http://localhost:8080",
  created: new Date("2017-11-04T18:48:46.250Z"),
};

export default MockCharacter;
