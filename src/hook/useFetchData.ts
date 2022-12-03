import { useEffect, useState } from "react";
import { reducerActionCreators } from "reducer/action-creators";
import { getCharacters } from "rickmortyapi";
import { useMyContext } from "./useMyContext";

function useFetchData() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useMyContext();

  const { query } = state;

  useEffect(() => {
    const fetchData = async () => {
      const searchQuery = localStorage.getItem("search");
      let response;
      try {
        setError("");
        setLoading(true);

        if (searchQuery) {
          response = await getCharacters({ name: JSON.parse(searchQuery) });
        } else {
          response = await getCharacters();
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
  }, [query, dispatch]);
  return [error, loading];
}

export { useFetchData };
