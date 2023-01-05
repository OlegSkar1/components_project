import React, { useEffect } from "react";
import { Pagination } from "@mui/material";
import { useAppSelector, useAppDispatch } from "hook/useRtkHook";
import { setCount, setPage } from "store/reducers/charactersSlice";

export enum numbersEnumCharacters {
  FIVE = 5,
  TEN = 10,
  FIFTEEN = 15,
  TWENTY = 20,
}

interface Props {
  numOfCharacters: number;
}

function MyPagination({ numOfCharacters }: Props) {
  const { name, gender, status, filtredCount, info, count, page } =
    useAppSelector((state) => state.characters);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCountPages = () => {
      if (name || gender || status) {
        return Math.ceil(filtredCount / numOfCharacters);
      } else {
        return info && Math.ceil(info.count / numOfCharacters);
      }
    };

    const countPages = getCountPages();

    if (countPages) {
      dispatch(setCount(countPages));
    } else dispatch(setCount(0));
  }, [dispatch, filtredCount, gender, info, name, numOfCharacters, status]);

  return (
    <>
      {count > 1 && (
        <Pagination
          onChange={(_, num) => dispatch(setPage(num))}
          count={count}
          page={page}
          color={"primary"}
          sx={{
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
          }}
          showFirstButton
          showLastButton
        />
      )}
    </>
  );
}

export default MyPagination;
