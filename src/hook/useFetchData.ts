import axios, { AxiosError } from "axios";
import { ICharacterData } from "charactersModule";
import { useEffect, useState } from "react";
import { reducerActionCreators } from "reducer/action-creators";
import { useMyContext } from "./useMyContext";

const BASE_URL = "https://rickandmortyapi.com/api/";

function useFetchData() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useMyContext();

  const { query } = state;

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        setError("");
        setLoading(true);
        if (!query) {
          response = await axios.get<ICharacterData>(BASE_URL + "character");
        } else {
          response = await axios.get<ICharacterData>(
            `${BASE_URL}character/?name=${query}`
          );
        }

        setLoading(false);
        dispatch(reducerActionCreators.getCharacters(response.data.results));
      } catch (error) {
        setLoading(false);
        const e = error as AxiosError;
        setError(e.message);
      }
    };
    fetchData();
  }, [query, dispatch]);
  return [error, loading];
}

export { useFetchData };
