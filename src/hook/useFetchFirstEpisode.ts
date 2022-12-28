import { useEffect, useState } from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { getEpisode } from "rickmortyapi";
import { Episode } from "rickmortyapi/dist/interfaces";

type FetchEpisode = [
  navigate: NavigateFunction,
  episode: Episode | undefined,
  isLoading: boolean,
  error: string
];

export const useFetchFirstEpisode = (): FetchEpisode => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<Episode>();
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const fetch = await getEpisode(Number(id));
        setEpisode(fetch.data);
        setisLoading(false);
      } catch (error) {
        setisLoading(false);
        const e = error as Error;
        setError(e.message);
      }
    };

    fetchEpisode();
  }, [id]);
  return [navigate, episode, isLoading, error];
};
