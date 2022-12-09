import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMyContext } from "hook/useMyContext";
import { reducerActionCreators } from "reducer/action-creators";

enum statusEnum {
  ALIVE = "Alive",
  DEAD = "Dead",
  UNKNOWN = "unknown",
}
enum genderEnum {
  MALE = "Male",
  FEMALE = "Female",
  GENDERLESS = "Genderless",
  UNKNOWN = "unknown",
}

function AccordionSort() {
  const { state, dispatch } = useMyContext();
  const { status, gender } = state;

  const [statusValue, setStatusValue] = useState("");
  const [genderValue, setGenderValue] = useState("");

  useEffect(() => {
    if (!status && !gender) {
      setStatusValue("");
      setGenderValue("");
    }
  }, [status, gender]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      switch (e.target.value) {
        case statusEnum.ALIVE:
        case statusEnum.DEAD:
          {
            setStatusValue(e.target.value);
            dispatch(reducerActionCreators.setPage(1));
            dispatch(reducerActionCreators.setStatus(e.target.value));
          }
          break;
        case genderEnum.MALE:
        case genderEnum.FEMALE:
        case genderEnum.GENDERLESS:
          {
            setGenderValue(e.target.value);
            dispatch(reducerActionCreators.setPage(1));
            dispatch(reducerActionCreators.setGender(e.target.value));
          }
          break;
      }

      if (e.target.id === "statusUnknown") {
        setStatusValue(e.target.value);
        dispatch(reducerActionCreators.setPage(1));
        dispatch(reducerActionCreators.setStatus(e.target.value));
      }

      if (e.target.id === "genderUnknown") {
        setGenderValue(e.target.value);
        dispatch(reducerActionCreators.setPage(1));
        dispatch(reducerActionCreators.setGender(e.target.value));
      }
    }
  };

  return (
    <Accordion
      sx={{
        bgcolor: "#1a56db",
        color: "#fff",
      }}
    >
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
              <RadioGroup
                name="status-radio"
                value={statusValue}
                onChange={handleChange}
              >
                <FormControlLabel
                  id="status-radio"
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
            aria-controls="gender-content"
            id="gender-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <span>Gender</span>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup
                value={genderValue}
                name="gender-radio"
                onChange={handleChange}
              >
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
