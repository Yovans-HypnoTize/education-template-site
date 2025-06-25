import CustomButton from "../../components/CustomButton";
import { enquiryColumns } from "../../utils/Constants";
import { useEffect, useMemo, useState } from "react";
import { customOutlineBtnStyles } from "../../styles/styles";
import SearchInput from "../../components/FormFactory/FormInputFactory/SearchInput";
import uploadFileIcon from "../../assets/icons/upload-file-icon.png";
import DataGridWithHeaderCheckbox from "../../components/DataGridWithHeaderCheckbox";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetEnquiryList } from "./features/enquirySlice";
import { debounce, Tooltip } from "@mui/material";
import { startLoading, stopLoading } from "../auth/features/authSlice";
import DateRangePicker from "../../components/Input/DateRangePicker";
import dayjs from "dayjs";

import { notifyError } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

const Enquiry = () => {
  const dispatch = useAppDispatch();
  const { enquiryList } = useAppSelector((state) => state.enquiry);
  const [selectOption, setSelectOption] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | number>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const navigate = useNavigate();
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
      GetEnquiryList({
        page: currentPage,
        size: rowsPerPage,
        search: searchTerm,
        // @ts-ignore
        fromDate: selectOption?.start ? dayjs(selectOption?.start).format("YYYY-MM-DD") : null,
        toDate: selectOption?.end ? dayjs(selectOption?.end).format("YYYY-MM-DD") : null,
      })
    ).finally(() => dispatch(stopLoading()));
  }, [dispatch, currentPage, rowsPerPage, searchTerm, selectOption]);

  const enquiryTableRows = useMemo(() => {
    return (
      enquiryList?.data?.content?.map((item: any, index: number) => ({
        ...item,
        sNo: (currentPage - 1) * rowsPerPage + index + 1,
        name: item?.firstName && item?.lastName ? `${item?.firstName} ${item?.lastName}` : "--",
        countryName: item?.country?.name || "--",
        createdDate: new Date(item?.createdDate).toDateString(),
      })) || []
    );
  }, [enquiryList]);
  const handleViewClick = (val: any) => {
    dispatch(startLoading());

    new Promise<{ type: string; payload?: any }>((resolve) => {
      setTimeout(() => {
        resolve({ type: "GetUserDetails/fulfilled" });
      }, 500); // Simulate async delay
    })
      .then((res) => {
        if (res.type.includes("fulfilled")) {
          navigate(`/enquiry/${val?.id}`);
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
          <p className="font-bold text-2xl">Enquiry</p>
          <p className="ms-1 text-[#5580FF] text-sm mt-2">Enquiry List</p>
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
          checkboxAvailable={!true}
          columns={enquiryColumns}
          showActions
          rows={enquiryTableRows}
          pagination={true}
          key={"Menu table"}
          sortAvailable={true}
          actionHeaderLabel="Actions"
          onSortClick={handleSortClick}
          handleChangePage={handlePageChange}
          handleChangeRowsPerPage={handleRowsPerPageChange}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onViewClick={handleViewClick}
        />
      </div>
    </div>
  );
};

export default Enquiry;
