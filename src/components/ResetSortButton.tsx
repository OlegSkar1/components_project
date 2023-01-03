import React from "react";
import { Button } from "@mui/material";
import { useActions } from "hook/useActions";

function ResetSortButton() {
  const { setGender, setStatus, setPage } = useActions();

  const resetHandler = () => {
    setStatus("");
    setGender("");
    setPage(1);
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
