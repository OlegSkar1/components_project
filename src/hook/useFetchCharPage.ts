import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { getCharacter, getEpisode, getLocation } from "rickmortyapi";
import { Character, Episode, Location } from "rickmortyapi/dist/interfaces";

type CharPage = [
  navigate: NavigateFunction,
  character: Character | undefined,
  episode: Episode | undefined,
  location: Location | undefined,
  isLoading: boolean,
  error: string
];

export const useFetchCharPage = (): CharPage => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character>();
  const [episode, setEpisode] = useState<Episode>();
  const [location, setLocation] = useState<Location>();
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChar = async () => {
      try {
        const charData = await getCharacter(Number(id));
        setCharacter(charData.data);

        const regExp = /(\d+$)/gs;
        const episodeId = charData.data.episode[0].match(regExp)?.join();

        const getFirstEpisode = await getEpisode(Number(episodeId));
        setEpisode(getFirstEpisode.data);

        const locationId = charData.data.location.url.match(regExp);
        const getCurrLocation = await getLocation(Number(locationId));
        setLocation(getCurrLocation.data);

        setisLoading(false);
      } catch (error) {
        setisLoading(false);
        const e = error as Error;
        setError(e.message);
      }
    };
    fetchChar();
  }, [id]);
  return [navigate, character, episode, location, isLoading, error];
};
