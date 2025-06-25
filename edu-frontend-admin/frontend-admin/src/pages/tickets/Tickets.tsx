import dayjs from "dayjs";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Autocomplete, Avatar, Button, Chip, IconButton, TextField, Tooltip } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

import { ticketTableColumns } from "../../utils/Constants";
import { customOutlineBtnStyles } from "../../styles/styles";
import SearchInput from "../../components/FormFactory/FormInputFactory/SearchInput";
import uploadFileIcon from "../../assets/icons/upload-file-icon.png";
import MuiAutocomplete from "../../components/MuiAutocomplete";
import {
  CheckCircle as ResolvedIcon,
  PendingActions as PendingIcon,
  Cancel as RejectedIcon,
} from "@mui/icons-material";
import DataGridWithHeaderCheckbox from "../../components/DataGridWithHeaderCheckbox";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { startLoading, stopLoading } from "../auth/features/authSlice";
import { GetTicketById, GetTicketList, UpdateTicketById } from "./features/ticketSlice";
import { notifyError, notifySuccess } from "../../utils/toast";
import CustomModal from "../../components/CustomModal";
import DateRangePicker from "../../components/Input/DateRangePicker";

type TicketStatus = "Pending" | "Resolved" | "Rejected";
const statusStyle: Record<TicketStatus, { icon: React.ReactElement; text: string; className: string }> = {
  Pending: {
    icon: <PendingIcon className="!text-white" />,
    text: "Pending",
    className: "!bg-yellow-200 !text-yellow-800",
  },
  Resolved: {
    icon: <ResolvedIcon className="!text-white" />,
    text: "Resolved",
    className: "!bg-green-200 !text-green-800",
  },
  Rejected: {
    icon: <RejectedIcon className="!text-white" />,
    text: "Rejected",
    className: "!bg-red-200 !text-red-800 ",
  },
};
const Tickets = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { ticketList } = useAppSelector((state) => state.ticket);
  const [selectOption, setSelectOption] = useState<any | null>("All");
  const [searchTerm, setSearchTerm] = useState<string | number>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [modalDetails, setModalDetails] = useState<any>({
    type: "",
    data: null,
  });

  const handleSearchTermChange = (value: any) => {
    setSearchTerm(value);
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

  const fetchTickets = useCallback(() => {
    dispatch(startLoading());
    dispatch(
      GetTicketList({
        page: currentPage,
        size: rowsPerPage,
        search: searchTerm,
        // @ts-ignore
        ticketStatus: selectOption?.value === "All" ? null : selectOption?.value,
        fromDate: selectedDate?.start ? dayjs(selectedDate?.start).format("YYYY-MM-DD") : null,
        toDate: selectedDate?.end ? dayjs(selectedDate?.end).format("YYYY-MM-DD") : null,
      })
    )
      .then((res: any) => {
        if (res.type.includes("rejected")) {
          notifyError(res?.payload?.message || "Ticket details failed");
        }
      })

      .finally(() => dispatch(stopLoading()));
  }, [dispatch, currentPage, rowsPerPage, searchTerm, selectOption, selectedDate]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const ticketTableRows = useMemo(() => {
    return (
      ticketList?.data?.content?.map((item: any) => ({
        ...item,
        ticketId: item?.id ?? "--",
        subject: (
          <Tooltip title={item?.description ?? "--"} placement="top" arrow>
            <p className="truncate w-[270px]">{item?.description ?? "--"}</p>
          </Tooltip>
        ),
        userName: item?.userName ?? "--",
        createdOn: dayjs(item?.createdDate).isValid() ? dayjs(item?.createdDate).format("DD/MM/YYYY") : "--",
        closedOn: ["Rejected", "Resolved"].includes(item?.supportTicketIssueStatus)
          ? dayjs(item?.lastModifiedDate).isValid()
            ? dayjs(item?.lastModifiedDate).format("DD/MM/YYYY")
            : "--"
          : "--",
        assignedTo: (
          <div className="flex items-center gap-2">
            <Avatar
              className="bg-pink-500"
              sizes="small"
              src={item?.assignedTo?.profileImageUrl}
              alt={item?.assignedTo?.firstname?.charAt(0)?.toUpperCase() ?? "--"}
            >
              {item?.assignedTo?.firstname?.charAt(0)?.toUpperCase() ?? "--"}
            </Avatar>
            <p className="text-sm font-medium float-left">{item?.assignedTo?.firstname ?? "--"}</p>
          </div>
        ),
        status: (
          <Chip
            size="medium"
            label={item?.supportTicketIssueStatus ?? "--"}
            className={`!rounded-lg !px-2 !py-1 ${
              statusStyle[(item?.supportTicketIssueStatus as TicketStatus) ?? "Pending"]?.className
            }`}
          />
        ),
        action: (
          <div className="flex gap-2">
            <Tooltip title="View ticket" placement="top">
              <IconButton onClick={() => handleViewClick(item)}>
                <VisibilityIcon className="text-[#5580FF] cursor-pointer" fontSize="small" />
              </IconButton>
            </Tooltip>
            {item?.supportTicketIssueStatus === "Pending" && (
              <Tooltip title="Update status" placement="top">
                <IconButton onClick={() => setModalDetails({ type: "STATUS", data: item })}>
                  <CreditScoreIcon className="text-[#5580FF] cursor-pointer" fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        ),
      })) || []
    );
  }, [ticketList]);

  const ticketStatusForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...modalDetails?.data,
      status: modalDetails?.data?.supportTicketIssueStatus ?? "",
      remarks: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(startLoading());
      dispatch(
        UpdateTicketById({
          id: modalDetails?.data?.id,
          description: modalDetails?.data?.description,
          ticketStatus: values?.status,
          remarks: values?.remarks,
          name: modalDetails?.data?.name,
          files: [],
        })
      )
        .then((res: any) => {
          if (res.type.includes("fulfilled")) {
            notifySuccess("Ticket status updated successfully");
            fetchTickets();
          } else {
            console.log("ticket details failed", res);
            notifyError(res?.payload?.message || "Ticket details failed");
          }
        })
        .finally(() => {
          dispatch(stopLoading());
          setModalDetails({ type: "", data: null });
        });
    },
  });

  const handleViewClick = (val: any) => {
    dispatch(startLoading());

    dispatch(
      GetTicketById({
        id: val?.id,
      })
    )
      .then((res: any) => {
        if (res?.type.includes("fulfilled")) {
          navigate(`/tickets/${val?.id}`);
        } else {
          console.log("ticket details failed", res);
          notifyError(res?.payload?.message || "Ticket details failed");
        }
      })

      .finally(() => dispatch(stopLoading()));
  };
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <div className="ps-5">
          <p className="font-bold text-2xl">Tickets</p>
          <p className="ms-1 text-[#5580FF] text-sm mt-2">Tickets</p>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <div className="w-[350px] ml-1">
          <SearchInput onChange={handleSearchTermChange} />
        </div>
        <div className="pe-2 flex ">
          <div className="pr-2 flex gap-2 w-[500px]">
            <MuiAutocomplete
              className="w-[200px]"
              onChange={(_, value) => {
                setSelectOption(value);
              }}
              optionPlaceholder="Select status"
              options={[
                { label: "All", value: "All" },
                { label: "Pending", value: "Pending" },
                { label: "Resolved", value: "Resolved" },
                { label: "Rejected", value: "Rejected" },
              ]}
              value={selectOption}
            />
            <DateRangePicker
              onChange={(value: any) => {
                setSelectedDate(value);
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
          columns={ticketTableColumns}
          rows={ticketTableRows}
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
        />
      </div>
      <CustomModal
        title="Ticket Status"
        open={modalDetails.type === "STATUS"}
        handleClose={() => setModalDetails({ type: "", data: null })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-col gap-4 mt-4">
          <Autocomplete
            key={"ticket status"}
            size="small"
            options={["Pending", "Resolved", "Rejected"]}
            value={ticketStatusForm.values.status}
            disableClearable
            // @ts-ignore
            onChange={(_event, value) => {
              if (!value) {
                return;
              }
              ticketStatusForm.setFieldValue("status", value ?? null);
            }}
            renderInput={(params) => <TextField {...params} label="" placeholder="Select status" />}
          />

          <TextField
            size="small"
            label=""
            className="w-full  mt-2"
            aria-label="minimum height"
            minRows={3}
            multiline
            name="remarks"
            value={ticketStatusForm.values.remarks}
            onChange={ticketStatusForm.handleChange}
            placeholder="Enter remarks"
          />
          <Button variant="contained" color="primary" onClick={() => ticketStatusForm.handleSubmit()}>
            Submit
          </Button>
        </div>
      </CustomModal>
    </div>
  );
};

export default Tickets;
