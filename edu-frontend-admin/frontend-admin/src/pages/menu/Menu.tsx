import CustomButton from "../../components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "../../components/CustomModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleTableColumns, sampleTableRows2 } from "../../utils/Constants";
import { customBtnStyles } from "../../styles/styles";
import CustomDataGridTable from "../../components/CustomDataGridTable";
import AddMenuForm from "./AddMenuForm";

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleAddMenuClick = () => {
    handleModalOpen();
    console.log("I'm clicked");
  };

  const handleTableRowClick = (value: any) => {
    console.log(value);
    const menuRouteName = value.menu.toLowerCase();

    navigate(`/menu/${menuRouteName}`);
  };

  const handleTableViewClick = (value: any) => {
    console.log(value);
  };
  const handleTableEditClick = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="ps-5">
          <p className="font-bold text-2xl">Menu</p>
          <p className="ms-1 text-[#5580FF] text-sm mt-2">Menu</p>
        </div>
        <div className="pe-2">
          <CustomButton
            title="Add New Menu"
            icon={<AddIcon sx={{ height: 20, width: 20 }} />}
            styleProps={customBtnStyles}
            onClick={handleAddMenuClick}
          />
        </div>
      </div>

      <div className="mt-3">
        <CustomDataGridTable
          columns={sampleTableColumns}
          rows={sampleTableRows2}
          pagination={false}
          key={"Menu table"}
          showActions={true}
          onRowClick={handleTableRowClick}
          onViewClick={handleTableViewClick}
          onEditClick={handleTableEditClick}
          checkboxAvailable={true}
          actionHeaderLabel="ACTIONS"
        />
      </div>
      <CustomModal
        open={open}
        title="Add New Menu"
        handleClose={handleModalClose}
      >
        <div className="mt-3">
          <AddMenuForm handleClose={handleModalClose} />
        </div>
      </CustomModal>
    </div>
  );
};

export default Menu;
