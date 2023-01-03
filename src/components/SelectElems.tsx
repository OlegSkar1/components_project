import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useActions } from "hook/useActions";

interface Props {
  changeNumOfCharacters: (value: number) => void;
}

export default function SelectElems({ changeNumOfCharacters }: Props) {
  const [elems, setElems] = useState("20");
  const { setPage } = useActions();

  const handleChange = (event: SelectChangeEvent) => {
    setElems(event.target.value);
  };

  useEffect(() => {
    changeNumOfCharacters(Number(elems));
    setPage(1);
  }, [elems]);

  return (
    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
      <Select value={elems} onChange={handleChange}>
        <MenuItem value={5}>Показывать по 5</MenuItem>
        <MenuItem value={10}>Показывать по 10</MenuItem>
        <MenuItem value={20}>Показывать по 20</MenuItem>
      </Select>
    </FormControl>
  );
}
