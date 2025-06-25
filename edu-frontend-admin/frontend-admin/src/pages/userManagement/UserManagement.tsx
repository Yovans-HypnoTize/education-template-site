import CustomButton from "../../components/CustomButton";
import { userManagementTableColumns } from "../../utils/Constants";
import { useEffect, useState } from "react";
import { customBtnStyles } from "../../styles/styles";
import DataGridWithHeaderCheckbox from "../../components/DataGridWithHeaderCheckbox";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "../../components/CustomModal";
import AddUserForm from "./AddUserForm";

const UserManagement = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSortClick = (value: any) => {
    console.log("sort value", value);
  };

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
  };

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  const handleAddUserClick = () => {
    handleModalOpen();
    console.log("I'm clicked");
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <div className="ps-5">
          <p className="font-bold text-2xl">User management</p>
          <p className="ms-1 text-[#5580FF] text-sm mt-2">User management</p>
        </div>
        <div className="pe-2">
          <CustomButton
            title="Add New User"
            icon={<AddIcon sx={{ height: 20, width: 20 }} />}
            styleProps={customBtnStyles}
            onClick={handleAddUserClick}
          />
        </div>
      </div>

      <div className="mt-3">
        <DataGridWithHeaderCheckbox
          columns={userManagementTableColumns}
          rows={[]}
          pagination={true}
          key={"Menu table"}
          showActions={true}
          checkboxAvailable={false}
          showHeaderCheckbox={false}
          sortAvailable={true}
          onSortClick={handleSortClick}
          handleChangePage={handlePageChange}
          handleChangeRowsPerPage={handleRowsPerPageChange}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          isDeleteAvailable={true}
          onDeleteClick={(value: any) => {
            console.log(value);
          }}
          actionHeaderLabel="ACTION"
        />
      </div>
      <CustomModal
        open={open}
        title="Add New User"
        handleClose={handleModalClose}
      >
        <div className="mt-3">
          <AddUserForm handleClose={handleModalClose} />
        </div>
      </CustomModal>
    </div>
  );
};

export default UserManagement;

const sampleUserManagementTableRows = [
  {
    name: "Kathir",
    role: "ADMIN",
    email: "admin@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "5 mins ago",
  },
  {
    name: "Nubia",
    role: "Client",
    email: "client@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "Online",
  },
  {
    name: "Kathir",
    role: "ADMIN",
    email: "admin@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "5 mins ago",
  },
  {
    name: "Nubia",
    role: "Client",
    email: "client@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "Online",
  },
  {
    name: "Kathir",
    role: "ADMIN",
    email: "admin@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "5 mins ago",
  },
  {
    name: "Nubia",
    role: "Client",
    email: "client@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "Online",
  },
  {
    name: "Kathir",
    role: "ADMIN",
    email: "admin@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "5 mins ago",
  },
  {
    name: "Nubia",
    role: "Client",
    email: "client@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "Online",
  },
  {
    name: "Kathir",
    role: "ADMIN",
    email: "admin@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "5 mins ago",
  },
  {
    name: "Nubia",
    role: "Client",
    email: "client@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "Online",
  },
  {
    name: "Kathir",
    role: "ADMIN",
    email: "admin@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "5 mins ago",
  },
  {
    name: "Nubia",
    role: "Client",
    email: "client@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "Online",
  },
  {
    name: "Kathir",
    role: "ADMIN",
    email: "admin@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "5 mins ago",
  },
  {
    name: "Nubia",
    role: "Client",
    email: "client@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "Online",
  },
  {
    name: "Kathir",
    role: "ADMIN",
    email: "admin@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "5 mins ago",
  },
  {
    name: "Nubia",
    role: "Client",
    email: "client@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "Online",
  },
  {
    name: "Kathir",
    role: "ADMIN",
    email: "admin@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "5 mins ago",
  },
  {
    name: "Nubia",
    role: "Client",
    email: "client@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "Online",
  },
  {
    name: "Kathir",
    role: "ADMIN",
    email: "admin@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "5 mins ago",
  },
  {
    name: "Nubia",
    role: "Client",
    email: "client@gmail.com",
    phone: "+91 1234567898",
    lastActivity: "Online",
  },
];
