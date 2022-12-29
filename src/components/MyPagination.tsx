import React, { useEffect } from "react";
import { Pagination } from "@mui/material";
import { useMyContext } from "hook/useMyContext";
import { reducerActionCreators } from "reducer/action-creators";

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
  const { state, dispatch } = useMyContext();

  const { info, page, gender, status, count, filtredCount, name } = state;

  useEffect(() => {
    const getCountPages = () => {
      if (name || gender || status) {
        if (filtredCount > 0) {
          return Math.ceil(filtredCount / numOfCharacters);
        }
      } else {
        return info && Math.ceil(info.count / numOfCharacters);
      }
    };

    const countPages = getCountPages();

    if (countPages) {
      dispatch(reducerActionCreators.getCount(countPages));
    } else dispatch(reducerActionCreators.getCount(0));
  }, [dispatch, filtredCount, gender, info, name, numOfCharacters, status]);

  return (
    <>
      {count > 1 && (
        <Pagination
          onChange={(_, num) => dispatch(reducerActionCreators.setPage(num))}
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
