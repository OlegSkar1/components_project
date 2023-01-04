import React, { useEffect } from "react";
import { Pagination } from "@mui/material";
import { useTypedSelector } from "hook/useTypedSelector";
import { useActions } from "hook/useActions";

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
    useTypedSelector((state) => state.characters);

  const { getCount, setPage } = useActions();

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
      getCount(countPages);
    } else getCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtredCount, gender, info, name, numOfCharacters, status]);

  return (
    <>
      {count > 1 && (
        <Pagination
          onChange={(_, num) => setPage(num)}
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
