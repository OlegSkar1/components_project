import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch } from "hook/useRtkHook";
import { setPage } from "store/reducers/charactersSlice";

interface Props {
  changeNumOfCharacters: (value: number) => void;
}

export default function SelectElems({ changeNumOfCharacters }: Props) {
  const [elems, setElems] = useState("20");
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setElems(event.target.value);
  };

  useEffect(() => {
    changeNumOfCharacters(Number(elems));
    dispatch(setPage(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
