import React from "react";

import { Box, Button, Modal, Typography } from "@mui/material";
import DashboardPostContext from "../../context/DashboardPostContext";
import { ConstantType } from "../../types/PostTypes";

interface DashboardModalProps {
  type: ConstantType;
  slug: string;
  command(slug: string): void;
}

const style = {
  box: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid rgb(163,60,170)",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    rowGap: 2,
  },
  button: {
    p: 1,
    backgroundColor: null,
    borderRadius: "16px",
    textTransform: "none",
    color: "white",
  },
};

const DashboardModal: React.FC<DashboardModalProps> = ({ type, command, slug }) => {
  const { open, setOpen } = React.useContext(DashboardPostContext);

  return (
    <Modal open={open} onClose={() => setOpen((prev) => !prev)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style.box}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {type.text}
        </Typography>
        <div className="flex flex-row justify-center gap-x-3">
          <Button
            id="modal-modal-description"
            sx={{
              ...style.button,
              backgroundColor: type.color,
              "&:hover": {
                backgroundColor: type.color,
              },
            }}
            onClick={() => command(slug)}
          >
            {type.btext}
          </Button>
          <Button
            id="modal-modal-cancel"
            sx={{
              ...style.button,
              backgroundColor: "#4a4948",
              "&:hover": {
                backgroundColor: "#4a4948",
              },
            }}
            onClick={() => setOpen((prev) => !prev)}
          >
            Batalkan
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
export default DashboardModal;
