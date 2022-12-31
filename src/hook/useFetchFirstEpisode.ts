import { useEffect, useState } from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { getEpisode } from "rickmortyapi";
import { Episode, ResourceBase } from "rickmortyapi/dist/interfaces";

type FetchEpisode = [
  navigate: NavigateFunction,
  episode: Episode | undefined,
  isLoading: boolean,
  error: string,
  charactersIds: number[]
];

interface IEpisode extends ResourceBase {
  air_date: string;
  episode: string;
  characters: string[];
}

export const useFetchFirstEpisode = (): FetchEpisode => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<Episode>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [charactersIds, setCharactersIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const fetch = await getEpisode(Number(id));
        setEpisode(fetch.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const e = error as Error;
        setError(e.message);
      }
    };

    fetchEpisode();
  }, [id]);

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const regExp = /(\d+$)/gs;

        if (episode) {
          const myEpisode = episode as unknown as IEpisode;

          const charIds = myEpisode.characters.map((char) => {
            const id = char.match(regExp)?.join("");
            return Number(id);
          });

          setCharactersIds(charIds);
        }
      } catch (error) {
        setIsLoading(false);
        const e = error as Error;
        setError(e.message);
      }
    };
    fetchChars();
  }, [episode]);
  return [navigate, episode, isLoading, error, charactersIds];
};
