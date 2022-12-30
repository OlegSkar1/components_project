import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { getLocation } from "rickmortyapi";
import { Location } from "rickmortyapi/dist/interfaces";

type CurrLocation = [
  navigate: NavigateFunction,
  charLocation: Location | undefined,
  isLoading: boolean,
  error: string,
  charactersIds: number[]
];

export const UseCurrLocation = (): CurrLocation => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [charLocation, setCharLocation] = useState<Location>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [charactersIds, setCharactersIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await getLocation(Number(id));
        setCharLocation(fetch.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const e = error as Error;
        setError(e.message);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const regExp = /(\d+$)/gs;

        if (charLocation) {
          const charIds = charLocation.residents.map((char) => {
            const id = char.toString().match(regExp)?.join("");
            return Number(id);
          });

          setCharactersIds(charIds);
        }
      } catch (error) {}
    };
    fetchChars();
  }, [charLocation]);
  return [navigate, charLocation, isLoading, error, charactersIds];
};
