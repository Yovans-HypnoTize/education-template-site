import CustomButton from "../../components/CustomButton";
import { monthOptions, registeredUsersTableColumns } from "../../utils/Constants";
import { useEffect, useMemo, useState } from "react";
import { customOutlineBtnStyles } from "../../styles/styles";
import SearchInput from "../../components/FormFactory/FormInputFactory/SearchInput";
import uploadFileIcon from "../../assets/icons/upload-file-icon.png";
import filterIcon from "../../assets/icons/filter-icon.png";
import MuiAutocomplete from "../../components/MuiAutocomplete";
import { SelectOption } from "../../types/types";
import DataGridWithHeaderCheckbox from "../../components/DataGridWithHeaderCheckbox";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetRegisterUserById, GetRegisterUserList } from "./features/registeredUserSlice";
import { debounce } from "@mui/material";
import { startLoading, stopLoading } from "../auth/features/authSlice";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../../components/Input/DateRangePicker";
import dayjs from "dayjs";
import { capitalizeWords } from "../../utils/Utilities";

const RegisteredUsers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { registeredUserList } = useAppSelector((state) => state.registeredUser);
  const [selectOption, setSelectOption] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | number>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleSearchTermChange = (value: any) => {
    debounce(() => {
      setSearchTerm(value);
    }, 500)();
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

  useEffect(() => {
    dispatch(startLoading());
    dispatch(
      GetRegisterUserList({
        page: currentPage,
        size: rowsPerPage,
        search: searchTerm,
        // @ts-ignore
        fromDate: selectOption?.start ? dayjs(selectOption?.start).format("YYYY-MM-DD") : null,
        toDate: selectOption?.end ? dayjs(selectOption?.end).format("YYYY-MM-DD") : null,
      })
    ).finally(() => dispatch(stopLoading()));
  }, [dispatch, currentPage, rowsPerPage, searchTerm, selectOption]);

  const registeredTableRows = useMemo(() => {
    return (
      registeredUserList?.data?.content?.map((item: any) => ({
        ...item,
        name: capitalizeWords(item?.firstname) ?? "--",
        email: item?.email ?? "--",
        Profession: item?.profession ?? "--",
        subscription: item?.subscription ?? "--",
        joinedDate: dayjs(item?.joinedDate).isValid() ? dayjs(item?.joinedDate).format("DD/MM/YYYY") : "--",
        lastLogin: item?.lastLogin ?? "--",
      })) || []
    );
  }, [registeredUserList]);

  const handleViewClick = (val: any) => {
    dispatch(startLoading());
    dispatch(
      GetRegisterUserById({
        id: val?.id,
      })
    )
      .then((res: any) => {
        if (res.type.includes("fulfilled")) {
          navigate(`/registered-users/${val?.id}`);
        } else {
          console.log("user details failed", res);
          notifyError(res?.payload?.message || "user details failed");
        }
      })
      .finally(() => dispatch(stopLoading()));
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <div className="ps-5">
          <p className="font-bold text-2xl">Registered users</p>
          <p className="ms-1 text-[#5580FF] text-sm mt-2">Registered users</p>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <div className="w-[350px] ml-1 flex items-center">
          <SearchInput onChange={handleSearchTermChange} />
        </div>
        <div className="pe-2 flex">
          <div className="pr-2 ">
            {/* <MuiAutocomplete
              onChange={(_, value) => {
                setSelectOption(value);
              }}
              optionPlaceholder="Select"
              options={monthOptions}
              value={selectOption}
              key={"month select option"}
            /> */}
            <DateRangePicker
              onChange={(value: any) => {
                setSelectOption(value);
              }}
            />
          </div>
          {/* <CustomButton
            title="Export"
            icon={<img src={uploadFileIcon} alt="upload file" width={15} height={15} />}
            styleProps={customOutlineBtnStyles}
            onClick={() => {}}
          /> */}
        </div>
      </div>

      <div className="mt-3">
        <DataGridWithHeaderCheckbox
          columns={registeredUsersTableColumns}
          rows={registeredTableRows}
          pagination={true}
          key={"Menu table"}
          showActions={!true}
          checkboxAvailable={!true}
          showHeaderCheckbox={!true}
          sortAvailable={true}
          onSortClick={handleSortClick}
          handleChangePage={handlePageChange}
          handleChangeRowsPerPage={handleRowsPerPageChange}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          // actionHeaderLabel="ACTION"
          onViewClick={handleViewClick}
        />
      </div>
    </div>
  );
};

export default RegisteredUsers;
