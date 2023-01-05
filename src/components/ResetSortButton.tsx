import React from "react";
import { Button } from "@mui/material";
import { useAppDispatch } from "hook/useRtkHook";
import { setGender, setPage, setStatus } from "store/reducers/charactersSlice";

function ResetSortButton() {
  const dispatch = useAppDispatch();

  const resetHandler = () => {
    dispatch(setStatus(""));
    dispatch(setGender(""));
    dispatch(setPage(1));
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
