import { useLocation } from "react-router-dom";
import { getCurrentPathName } from "../../../utils/Utilities";
import BreadCrumbContainer from "../../../components/BreadCrumbContainer";
import nextIcon from "../../../assets/icons/next-icon.png";
import SubmenuAccordion from "./SubmenuAccordion";
import CustomButton from "../../../components/CustomButton";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "../../../components/CustomModal";
import AddSubMenuForm from "./AddSubMenuForm";
import { customOutlineBtnStyles } from "../../../styles/styles";

const SubmenuItem = () => {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="ps-5">
          <p className="font-bold text-2xl">
            {getCurrentPathName(location.pathname)}
          </p>
          <BreadCrumbContainer path={location.pathname} />
        </div>
        <div className="pe-2 flex ">
          <div className="pe-2">
            <CustomButton
              title="Add New Menu"
              icon={<AddIcon sx={{ height: 20, width: 20 }} />}
              styleProps={customOutlineBtnStyles}
              onClick={handleModalOpen}
            />
          </div>
          <img src={nextIcon} alt="next icon" className="w-9 h-9" />
        </div>
      </div>
      <div className="mt-3">
        <SubmenuAccordion />
      </div>
      <CustomModal
        open={open}
        title="Add New Menu"
        handleClose={handleModalClose}
      >
        <div className="mt-3">
          <AddSubMenuForm handleClose={handleModalClose} />
        </div>
      </CustomModal>
    </div>
  );
};

export default SubmenuItem;
