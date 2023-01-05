import { useEffect } from "react";
import { getCharacters } from "rickmortyapi";
import { Character } from "rickmortyapi/dist/interfaces";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./useRtkHook";
import {
  fetchChars,
  getInfo,
  setError,
  setFiltredCount,
  setGender,
  setLoading,
  setStatus,
} from "store/reducers/charactersSlice";

interface Props {
  numOfCharacters: number;
}

function useFetchData({
  numOfCharacters,
}: Props): [string | null, boolean, Character[]] {
  const dispatch = useAppDispatch();

  const {
    error,
    filtredCount,
    gender,
    loading,
    name,
    page,
    status,
    characters,
  } = useAppSelector((state) => state.characters);

  const [searchParams, setSearchParams] = useSearchParams();

  const queryName = searchParams.get("name") || "";
  const queryGender = searchParams.get("gender") || "";
  const queryStatus = searchParams.get("status") || "";

  useEffect(() => {
    dispatch(setGender(queryGender));
    dispatch(setStatus(queryStatus));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchParams({
      name,
      gender,
      status,
    });

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
          dispatch(setFiltredCount(infoData.count));
        }

        const resultChunks = _.chunk(chunks, numOfCharacters);

        return resultChunks;
      } else if (filtredData.status === 404) {
        dispatch(setFiltredCount(0));
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
        dataInfo && dispatch(getInfo(dataInfo));

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
        dispatch(setError(null));
        dispatch(setLoading(true));

        if (queryName || queryGender || queryStatus) {
          const filtredResponse = await fetchFiltredData();

          filtredResponse && dispatch(fetchChars(filtredResponse));

          if (!filtredResponse) {
            dispatch(setError("Ошибка, персонаж не найден!!!"));
          }
        } else {
          const response = await getPage();
          response && dispatch(fetchChars(response));
        }
        dispatch(setLoading(false));
      } catch (error) {
        const e = error as Error;
        dispatch(setError(e.message));
      }
    };
    fetchCurrPageData();
  }, [
    filtredCount,
    numOfCharacters,
    page,
    name,
    gender,
    status,
    setSearchParams,
    dispatch,
    queryName,
    queryGender,
    queryStatus,
  ]);
  return [error, loading, characters];
}

export { useFetchData };
