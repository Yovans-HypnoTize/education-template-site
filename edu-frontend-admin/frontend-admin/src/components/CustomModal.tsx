import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  maxHeight: 600,
};

interface CustomModalProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  open,
  handleClose,
  children,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <p id="modal-modal-title" className="font-semibold text-xl">
              {title}
            </p>
            <div className="bg-[#EDF2FF] rounded-full py-[2px] px-[5px]">
              <CloseIcon
                sx={{
                  fontSize: 20,
                  color: "#5580FF",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              />
            </div>
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
