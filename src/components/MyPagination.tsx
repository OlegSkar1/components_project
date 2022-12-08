import React from "react";
import { Pagination } from "@mui/material";
import { useMyContext } from "hook/useMyContext";
import { reducerActionCreators } from "reducer/action-creators";

function MyPagination() {
  const { state, dispatch } = useMyContext();

  const { info, page } = state;

  return (
    <>
      {info && info.pages > 1 && (
        <Pagination
          onChange={(_, num) => dispatch(reducerActionCreators.setPage(num))}
          count={info?.pages}
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
