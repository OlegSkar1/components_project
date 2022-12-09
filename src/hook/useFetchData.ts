import { useEffect, useState } from "react";
import { reducerActionCreators } from "reducer/action-creators";
import { getCharacters } from "rickmortyapi";
import { useMyContext } from "./useMyContext";

interface IOptions {
  name: string;
  status: string;
  gender: string;
  page: number;
}

function useFetchData() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useMyContext();

  const { status, gender, page } = state;
  const name = JSON.parse(localStorage.getItem("search") as string);

  useEffect(() => {
    const fetchData = async () => {
      let options: IOptions = {
        name,
        status,
        gender,
        page,
      };

      let response;
      try {
        setError("");
        setLoading(true);

        response = await getCharacters(options);

        if (name || status || gender || page) {
          options = { ...options, name, status, gender, page };
        }

        if (response.data) {
          dispatch(reducerActionCreators.getInfo(response.data.info));
        }

        if (response.data.results) {
          dispatch(reducerActionCreators.getCharacters(response.data.results));
        } else {
          dispatch(reducerActionCreators.getCharacters([]));
          throw new Error("Ошибка, персонаж не найден!!!");
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        const e = error as Error;
        setError(e.message);
      }
    };
    fetchData();
  }, [name, status, gender, page, dispatch]);
  return [error, loading];
}

export { useFetchData };
