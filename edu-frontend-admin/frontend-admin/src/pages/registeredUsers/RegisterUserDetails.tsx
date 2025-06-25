import React, { useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Avatar, Card, CardContent, IconButton } from "@mui/material";
import { startLoading, stopLoading } from "../auth/features/authSlice";
import { GetRegisterUserById } from "./features/registeredUserSlice";
import DataGridWithHeaderCheckbox from "../../components/DataGridWithHeaderCheckbox";

interface IRegisterUserDetails {
  [key: string]: any;
}

const RegisterUserDetails: React.FC<IRegisterUserDetails> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { userDetails } = useAppSelector((state) => state.registeredUser);

  useEffect(() => {
    if (!userDetails) {
      dispatch(startLoading());
      dispatch(
        GetRegisterUserById({
          id: id,
        })
      ).finally(() => dispatch(stopLoading()));
    }
  }, [dispatch]);
  return (
    <div>
      <div className="ps-5 flex items-start gap-2">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon className="text-[#5580FF]" />
        </IconButton>
        <div>
          <p className="font-bold text-2xl mb-1">{userDetails?.data?.firstname ?? "--"}</p>
          <button onClick={() => navigate(-1)} className="text-[#5580FF] cursor-pointer">
            Registered Users
            <span className="mx-1">/</span>
          </button>
          <button className="text-[#5580FF]">{userDetails?.data?.firstname ?? "--"}</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3  min-h-[calc(100vh-240px)]">
        <Card className="w-full p-4 bg-white rounded-2xl shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="bg-pink-500" src={userDetails?.data?.profileImageUrl} sizes="large">
              {userDetails?.data?.firstname?.charAt(0)?.toUpperCase() ?? "--"}
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{userDetails?.data?.firstname ?? "--"}</h2>
              <p className="text-sm text-gray-500">joined on --</p>
            </div>
          </div>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 text-sm">
              <span className="font-medium col-span-1 flex justify-between">
                Mail
                <span className="font-medium pr-6">:</span>
              </span>

              <span className="text-gray-600 flex items-center space-x-2 col-span-1 ">
                <span>{userDetails?.data?.email ?? "--"}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 text-sm">
              <span className="font-medium col-span-1 flex justify-between">
                Organisation
                <span className="font-medium pr-6">:</span>
              </span>
              <span className="text-gray-600">--</span>
            </div>

            <div className="grid grid-cols-2 text-sm">
              <span className="font-medium col-span-1 flex justify-between">
                Organisation Name
                <span className="font-medium pr-6">:</span>
              </span>
              <span className="text-gray-600 flex items-center space-x-2">
                <span>--</span>
              </span>
            </div>

            <div className="grid grid-cols-2 text-sm">
              <span className="font-medium col-span-1 flex justify-between">
                Subscription Plan
                <span className="font-medium pr-6">:</span>
              </span>
              <span className="text-gray-600">--</span>
              <span></span>
              <span className="text-gray-600">Renewal date --</span>
            </div>

            <div className="grid grid-cols-2 text-sm">
              <span className="font-medium col-span-1 flex justify-between">
                Plan Status
                <span className="font-medium pr-6">:</span>
              </span>
              <span className="text-green-600 flex items-center space-x-2">
                <span>--</span>
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full p-4  bg-white rounded-2xl shadow-md row-span-2">
          <h2 className="text-lg font-semibold">Orders & Invoices</h2>
          <DataGridWithHeaderCheckbox
            rows={[
              {
                id: 1,
                clientName: "--",
                clientEmail: "--",
                clientPhone: "--",
                clientAddress: <span className="rounded-md bg-[#edf2ff] px-3 py-1">Paid</span>,
              },
              {
                id: 2,
                clientName: "--",
                clientEmail: "--",
                clientPhone: "--",
                clientAddress: <span className="rounded-md bg-[#E55050] px-3 py-1 text-white">Unpaid</span>,
              },
            ]}
            sortAvailable
            columns={[
              { id: "clientName", label: "INVOICE.NO" },
              { id: "clientEmail", label: "AMOUNT" },
              { id: "clientPhone", label: "DATE" },
              { id: "clientAddress", label: "STATUS" },
            ]}
            currentPage={1}
            rowsPerPage={10}
            checkboxAvailable={false}
            tableParentClassName="!rounded-none !shadow-none !border-none !p-0 !h-full"
            showActions={false}
          />
        </Card>
        <Card className="w-full p-4 bg-white rounded-2xl shadow-md ">
          <CardContent className="space-y-4">
            <h2 className="text-lg font-semibold">Billing Details</h2>
            <div className="grid grid-cols-2 text-sm">
              <span className="font-medium col-span-1 flex justify-between">
                Billing contact name
                <span className="font-medium pr-6">:</span>
              </span>

              <span className="text-gray-600 flex items-center space-x-2 col-span-1 ">
                <span>{"--"}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 text-sm">
              <span className="font-medium col-span-1 flex justify-between">
                Billing email
                <span className="font-medium pr-6">:</span>
              </span>
              <span className="text-gray-600">--</span>
            </div>

            <div className="grid grid-cols-2 text-sm">
              <span className="font-medium col-span-1 flex justify-between">
                Billing address
                <span className="font-medium pr-6">:</span>
              </span>
              <span className="text-gray-600 flex items-center space-x-2">
                <span>--</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterUserDetails;
