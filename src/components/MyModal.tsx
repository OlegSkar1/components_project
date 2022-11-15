import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ICharacter } from "charactersModule";
import Dropdown from "./Dropdown";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: 300,
    minHeight: 350,
    borderBottom: 0,
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface ModalProps {
  handleClose: (value: boolean) => void;
  modalOpen: boolean;
  character: ICharacter;
}

export default function CustomizedDialogs({
  handleClose,
  modalOpen,
  character,
}: ModalProps) {
  const closeHandler = () => {
    handleClose(false);
  };

  const { name, status, gender, species, episode, location } = character;

  return (
    <div>
      <BootstrapDialog
        onClose={closeHandler}
        aria-labelledby="customized-dialog-title"
        open={modalOpen}
        sx={{ minWidth: 300 }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={closeHandler}
        >
          {name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>status: {status}</Typography>
          <Typography gutterBottom>gender: {gender}</Typography>
          <Typography gutterBottom>species: {species}</Typography>
          <Typography gutterBottom>location: {location.name}</Typography>
          <Typography gutterBottom>
            <Dropdown episode={episode} />
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
