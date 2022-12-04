import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMyContext } from "hook/useMyContext";
import { reducerActionCreators } from "reducer/action-creators";

export enum statusEnum {
  ALIVE = "Alive",
  DEAD = "Dead",
  UNKNOWN = "unknown",
}
export enum genderEnum {
  MALE = "Male",
  FEMALE = "Female",
  GENDERLESS = "Genderless",
  UNKNOWN = "unknown",
}

function AccordionSort() {
  const { dispatch } = useMyContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      switch (e.target.value) {
        case statusEnum.ALIVE:
        case statusEnum.DEAD:
          return dispatch(reducerActionCreators.setStatus(e.target.value));
        case genderEnum.MALE:
        case genderEnum.FEMALE:
        case genderEnum.GENDERLESS:
          return dispatch(reducerActionCreators.setGender(e.target.value));
      }

      if (e.target.id === "statusUnknown") {
        return dispatch(reducerActionCreators.setStatus(e.target.value));
      }

      if (e.target.id === "genderUnknown") {
        return dispatch(reducerActionCreators.setGender(e.target.value));
      }
    }
  };

  return (
    <Accordion sx={{ bgcolor: "#1a56db", color: "#fff" }}>
      <AccordionSummary
        aria-controls="sort-content"
        id="sort-header"
        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
      >
        <span>Сортировать</span>
      </AccordionSummary>
      <AccordionDetails>
        <Accordion>
          <AccordionSummary
            aria-controls="status-content"
            id="status-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <span>Status</span>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup name="status-radio" onChange={handleChange}>
                <FormControlLabel
                  value="Alive"
                  control={<Radio />}
                  label="Alive"
                />
                <FormControlLabel
                  value="Dead"
                  control={<Radio />}
                  label="Dead"
                />
                <FormControlLabel
                  value="unknown"
                  control={<Radio id="statusUnknown" />}
                  label="Unknown"
                />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            aria-controls="status-content"
            id="status-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <span>Gender</span>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup name="gender-radio" onChange={handleChange}>
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Genderless"
                  control={<Radio />}
                  label="Genderless"
                />
                <FormControlLabel
                  value="unknown"
                  control={<Radio id="genderUnknown" />}
                  label="Unknown"
                />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionSort;
