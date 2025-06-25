import { Avatar, Card, CardContent, Chip, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle as ResolvedIcon,
  PendingActions as PendingIcon,
  Cancel as RejectedIcon,
} from "@mui/icons-material";
import { useAppSelector } from "../../app/hooks";
import dayjs from "dayjs";
import { useEffect } from "react";
import { GetTicketById, GetUserById } from "./features/ticketSlice";
import { useAppDispatch } from "../../app/hooks";
import { startLoading, stopLoading } from "../auth/features/authSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface ITicketDetails {
  [key: string]: any;
}
type TicketStatus = "Pending" | "Resolved" | "Rejected";
const statusStyle: Record<TicketStatus, { icon: React.ReactElement; text: string; className: string }> = {
  Pending: {
    icon: <PendingIcon className="!text-yellow-800" />,
    text: "Pending",
    className: "!bg-yellow-200 !text-yellow-800",
  },
  Resolved: {
    icon: <ResolvedIcon className="!text-green-800" />,
    text: "Resolved",
    className: "!bg-green-200 !text-green-800",
  },
  Rejected: {
    icon: <RejectedIcon className="!text-red-800" />,
    text: "Rejected",
    className: "!bg-red-200 !text-red-800 ",
  },
};
const TicketDetails: React.FC<ITicketDetails> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ticketDetails } = useAppSelector((state) => state.ticket);
  const { id } = useParams();
  useEffect(() => {
    if (!ticketDetails) {
      dispatch(startLoading());
      dispatch(
        GetTicketById({
          id: id,
        })
      )
        .then((res: any) => {
          if (res?.type.includes("fulfilled")) {
          }
        })
        .finally(() => dispatch(stopLoading()));
    }
  }, [dispatch]);

  return (
    <div>
      {/* <DateRangePicker /> */}
      <div className="ps-5 flex items-start gap-2">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon className="text-[#5580FF]" />
        </IconButton>
        <div>
          <p className="font-bold text-2xl mb-2">{id ?? "--"}</p>
          <button onClick={() => navigate(-1)} className="text-[#5580FF] cursor-pointer">
            Tickets
            <span className="mx-1">/</span>
          </button>
          <button className="text-[#5580FF]">{id ?? "--"}</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5 min-h-[calc(100vh-250px)]">
        <Card className="w-full p-6 bg-white rounded-2xl shadow-md col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <Typography variant="h6" className="mb-4 font-bold">
              {ticketDetails?.data?.name ?? "--"}
            </Typography>
            <Chip
              size="medium"
              label={ticketDetails?.data?.supportTicketIssueStatus ?? "--"}
              className={`!rounded-lg !px-2 !py-1 ${
                statusStyle[(ticketDetails?.data?.supportTicketIssueStatus as TicketStatus) ?? "Pending"]?.className
              }`}
              onDelete={() => {}}
              deleteIcon={
                statusStyle[(ticketDetails?.data?.supportTicketIssueStatus as TicketStatus) ?? "Pending"]
                  ?.icon as React.ReactElement
              }
            />
          </div>

          <div className="flex justify-between">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="bg-pink-500" src={ticketDetails?.data?.userProfileUrl}>
                {ticketDetails?.data?.userName?.charAt(0)?.toUpperCase() ?? "--"}
              </Avatar>
              <div>
                <h2 className="text-md font-medium">{ticketDetails?.data?.userName ?? "--"}</h2>
                <p className="text-sm text-gray-500">{ticketDetails?.data?.userEmail ?? "--"}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {dayjs(ticketDetails?.data?.createdAt).isValid()
                ? dayjs(ticketDetails?.data?.createdAt).format("DD/MM/YYYY")
                : "--"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">{ticketDetails?.data?.description ?? "--"}</p>
          <PhotoProvider easing={() => "ease-in-out"}>
            <div className="flex flex-wrap items-center ">
              {ticketDetails?.data?.files?.map((item: any, index: number) => (
                <PhotoView key={index} src={item.url}>
                  <img src={item.url} alt="" className="mr-2 mb-2 w-24 h-24 cursor-pointer object-cover" />
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
          <Divider className="!my-4" />
          {ticketDetails?.data?.remarks ? (
            <>
              <div className="flex justify-between">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="bg-pink-500" src={ticketDetails?.data?.responseUserProfileUrl}>
                    {ticketDetails?.data?.responseUser?.charAt(0)?.toUpperCase() ?? "--"}
                  </Avatar>
                  <div>
                    <h2 className="text-md font-medium">{ticketDetails?.data?.responseUser ?? "--"}</h2>
                    <p className="text-sm text-gray-500">{ticketDetails?.data?.responseUserEmail ?? "--"}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {dayjs(ticketDetails?.data?.lastModifiedDate).isValid()
                    ? dayjs(ticketDetails?.data?.lastModifiedDate).format("DD/MM/YYYY")
                    : "--"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{ticketDetails?.data?.remarks ?? "--"}</p>
            </>
          ) : null}
        </Card>
        <Card className="p-2 shadow-md rounded-lg border border-gray-200">
          <CardContent>
            <Typography variant="h6" className="mb-4 font-bold">
              Ticket Details
            </Typography>

            <div className="flex items-center gap-3 mb-3">
              <Avatar className="bg-pink-500" src={ticketDetails?.data?.userProfileUrl}>
                {ticketDetails?.data?.userName?.charAt(0)?.toUpperCase() ?? "--"}
              </Avatar>
              <div className="grid grid-cols-3 gap-1">
                <div className="col-span-1">
                  <Typography className="font-semibold">User</Typography>
                  <Typography title={ticketDetails?.data?.userName} className="text-sm text-gray-500 truncate">{ticketDetails?.data?.userName ?? "--"}</Typography>
                </div>
                <div className="col-span-2">
                  <Typography className="font-semibold">Email</Typography>
                  <Typography title={ticketDetails?.data?.userEmail} className="text-sm text-gray-500 truncate">{ticketDetails?.data?.userEmail ?? "--"}</Typography>
                </div>
              </div>
            </div>

            <div className="ml-12 mb-4">
              <Typography className="text-gray-500">Subscription</Typography>
              <Typography className="text-black">--</Typography>
            </div>

            <Divider />

            {/* <div className="flex items-center gap-3 mt-4 mb-3">
              <Avatar className="bg-pink-500" src={ticketDetails?.data?.responseUserProfileUrl}>
                {ticketDetails?.data?.responseUser?.charAt(0)?.toUpperCase() ?? "--"}
              </Avatar>
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Typography className="font-semibold">Agent</Typography>
                    <Typography className="text-sm text-gray-500">
                      {ticketDetails?.data?.responseUser ?? "--"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="font-semibold">Email</Typography>
                    <Typography className="text-sm text-gray-500">
                      {ticketDetails?.data?.responseUserEmail ?? "--"}
                    </Typography>
                  </div>
                </div>
              </div>
            </div> */}
            <Divider />
            <Typography variant="h6" className="!mt-4 !mb-2 !   font-bold">
              Update History
            </Typography>
            <div className="relative pl-6 font-sans">
              <div className="absolute left-[12px] top-2 h-[calc(100%-16px)] w-px bg-gray-300" />

              <div className="relative pb-6">
                <div className="flex flex-col">
                  <div className="absolute left-[-17px] top-2 h-3 w-3 rounded-full  bg-gray-500" />
                  <p className="text-sm text-gray-500">Created on</p>
                  <p className="text-base text-gray-900 font-medium">
                    {dayjs(ticketDetails?.data?.createdAt).isValid()
                      ? dayjs(ticketDetails?.data?.createdAt).format("DD/MM/YYYY")
                      : "--"}
                  </p>
                </div>

                <div className="absolute left-[-17px] top-[81px] h-3 w-3 rounded-full  bg-gray-500" />
                <div className="pt-8">
                  <p className="text-sm text-gray-500">Updated on</p>
                  <p className="text-base text-gray-900 font-medium">
                    {" "}
                    {dayjs(ticketDetails?.data?.lastModifiedDate).isValid()
                      ? dayjs(ticketDetails?.data?.lastModifiedDate).format("DD/MM/YYYY")
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketDetails;
