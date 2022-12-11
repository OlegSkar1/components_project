import React from "react";
import { Button } from "@mui/material";
import { useMyContext } from "hook/useMyContext";
import { reducerActionCreators } from "reducer/action-creators";

function ResetSortButton() {
  const { dispatch, state } = useMyContext();
  const { gender, status } = state;

  const resetHandler = () => {
    dispatch(reducerActionCreators.setStatus(""));
    dispatch(reducerActionCreators.setGender(""));
    dispatch(reducerActionCreators.setPage(1));
  };

  return (
    <Button
      onClick={resetHandler}
      sx={{ bgcolor: "#1a56db" }}
      variant="contained"
    >
      <span>Очистить сортировку</span>
    </Button>
  );
}

export default ResetSortButton;
