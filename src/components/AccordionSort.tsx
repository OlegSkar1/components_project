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
import { useTypedSelector } from "hook/useTypedSelector";
import { useActions } from "hook/useActions";
import { useSearchParams } from "react-router-dom";

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
  const { status, gender } = useTypedSelector((state) => state.characters);

  const { setPage, setStatus, setGender } = useActions();

  const [searchParams, setSearchParams] = useSearchParams();

  const queryGender = searchParams.get("gender") || "";
  const queryStatus = searchParams.get("status") || "";

  const [statusValue, setStatusValue] = useState(queryStatus);
  const [genderValue, setGenderValue] = useState(queryGender);

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
            setPage(1);
            setStatus(e.target.value);
          }
          break;
        case genderEnum.MALE:
        case genderEnum.FEMALE:
        case genderEnum.GENDERLESS:
          {
            setGenderValue(e.target.value);
            setPage(1);
            setGender(e.target.value);
          }
          break;
      }

      if (e.target.id === "statusUnknown") {
        setStatusValue(e.target.value);
        setPage(1);
        setStatus(e.target.value);
      }

      if (e.target.id === "genderUnknown") {
        setGenderValue(e.target.value);
        setPage(1);
        setGender(e.target.value);
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
