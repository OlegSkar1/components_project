import { useEffect, useState } from "react";
import { reducerActionCreators } from "reducer/action-creators";
import { getCharacters } from "rickmortyapi";
import { useMyContext } from "./useMyContext";

interface IOptions {
  name: string;
  status: string;
  gender: string;
}

function useFetchData() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useMyContext();

  const { query, status, gender } = state;

  useEffect(() => {
    const fetchData = async () => {
      const name = JSON.parse(localStorage.getItem("search") as string);
      let options: IOptions = {
        name,
        status,
        gender,
      };

      let response;
      try {
        setError("");
        setLoading(true);

        response = await getCharacters(options);

        if (name || status || gender) {
          options = { ...options, name, status, gender };
        }

        setLoading(false);
        if (response.data.results) {
          dispatch(reducerActionCreators.getCharacters(response.data.results));
        } else {
          throw new Error("Ошибка, персонаж не найден!!!");
        }
      } catch (error) {
        setLoading(false);
        const e = error as Error;
        setError(e.message);
      }
    };
    fetchData();
  }, [query, status, gender, dispatch]);
  return [error, loading];
}

export { useFetchData };
