import { useEffect, useState } from "react";
import { reducerActionCreators } from "reducer/action-creators";
import { getCharacters } from "rickmortyapi";
import { Character } from "rickmortyapi/dist/interfaces";
import { useMyContext } from "./useMyContext";
import _ from "lodash";

interface Props {
  numOfCharacters: number;
}

function useFetchData({ numOfCharacters }: Props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useMyContext();
  const { status, gender, page, filtredCount } = state;

  const name: string = JSON.parse(localStorage.getItem("search") as string)
    .trim()
    .toLowerCase();

  useEffect(() => {
    const fetchFiltredChunks = async (currPage = 1) => {
      const filtredData = await getCharacters({
        name,
        gender,
        status,
        page: currPage,
      });
      return filtredData;
    };

    const getFiltredChunks = async () => {
      const chunks: Character[] = [];

      const filtredData = await fetchFiltredChunks();

      const resultsData = filtredData.data.results;
      const infoData = filtredData.data.info;

      resultsData && chunks.push(...resultsData);

      if (infoData && resultsData) {
        for (let i = 2; i <= infoData.pages; i++) {
          const nextPageData = await fetchFiltredChunks(i);
          const resultNextData = nextPageData.data.results;
          resultNextData && chunks.push(...resultNextData);
        }

        if (filtredCount !== infoData.count) {
          dispatch(reducerActionCreators.getFiltredCount(infoData.count));
        }

        const resultChunks = _.chunk(chunks, numOfCharacters);

        return resultChunks;
      } else if (filtredData.status === 404) {
        dispatch(reducerActionCreators.getFiltredCount(0));
      }
    };

    const fetchFiltredData = async () => {
      const filtredChunks = await getFiltredChunks();
      if (filtredChunks && filtredChunks.length > 0) {
        const currPageFiltredChunk = filtredChunks.filter((_, index) => {
          return index === page - 1;
        });

        return _.flatten(currPageFiltredChunk);
      }
    };

    const fetchData = async () => {
      const chunks: Character[] = [];

      const responseAllChar = await getCharacters({ page: 1 });
      if (responseAllChar) {
        const dataResults = responseAllChar.data.results;
        const dataInfo = responseAllChar.data.info;

        dataResults && chunks.push(...dataResults);

        dispatch(reducerActionCreators.getInfo(dataInfo));

        if (dataResults && dataInfo) {
          for (let i = 2; i <= dataInfo.pages; i++) {
            const nextPage = await getCharacters({ page: i });
            const nextDataResults = nextPage.data.results;

            nextDataResults && chunks.push(...nextDataResults);
          }
          return _.chunk(chunks, numOfCharacters);
        }
      }
    };

    const getPage = async () => {
      const allChunks = await fetchData();

      if (allChunks) {
        const currPageChunk = allChunks.filter((_, index) => {
          return index === page - 1;
        });

        return _.flatten(currPageChunk);
      }
    };

    const fetchCurrPageData = async () => {
      try {
        setError("");
        setLoading(true);

        if (name || gender || status) {
          const filtredResponse = await fetchFiltredData();

          filtredResponse &&
            dispatch(reducerActionCreators.getCharacters(filtredResponse));

          if (!filtredResponse) {
            dispatch(reducerActionCreators.getCharacters([]));
            throw new Error("Ошибка, персонаж не найден!!!");
          }
        } else {
          const response = await getPage();
          response && dispatch(reducerActionCreators.getCharacters(response));
          // dispatch(reducerActionCreators.getFiltredCount(0));
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        const e = error as Error;
        setError(e.message);
      }
    };
    fetchCurrPageData();
  }, [dispatch, filtredCount, gender, name, numOfCharacters, page, status]);
  return [error, loading];
}

export { useFetchData };
