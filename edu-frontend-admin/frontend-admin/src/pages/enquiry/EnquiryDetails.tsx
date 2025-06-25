import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { useAppSelector } from "../../app/hooks";
import { capitalizeWords } from "../../utils/Utilities";

const EnquiryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enquiryList } = useAppSelector((state) => state.enquiry);
  const enquiryData =   enquiryList?.data?.content?.find((item:any) => item.id === Number(id)) || {};
  const displayFields = [
    { label: "First Name", value: enquiryData?.firstName },
    { label: "Last Name", value: enquiryData?.lastName },
    { label: "Email", value: enquiryData?.email },
    { label: "Phone Number", value: enquiryData?.phoneNo },
    { label: "Website", value: enquiryData?.website || "N/A" },
    { label: "Organization", value: enquiryData?.organisationName },
    { label: "Country", value: `${enquiryData?.country?.name} (${enquiryData?.country?.phoneCode})` },
    { label: "State", value: capitalizeWords( enquiryData?.state ??"") },
    { label: "City",value: capitalizeWords( enquiryData?.city ??"") },
    { label: "Zip Code", value: enquiryData?.zipcode },
    { label: "Category", value: enquiryData?.category },
    { label: "Message", value: enquiryData?.message },
    { label: "Created Date", value: new Date(enquiryData?.createdDate).toLocaleString() },
  ];

  return (
    <>
      <div className="ps-5 flex items-start gap-2 mb-3">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon className="text-[#5580FF]" />
        </IconButton>
        <div>
          <p className="font-bold text-2xl mb-1">
            {enquiryData?.firstName && enquiryData?.lastName
              ? `${enquiryData?.firstName} ${enquiryData?.lastName}`
              : "--"}
          </p>
          <button onClick={() => navigate(-1)} className="text-[#5580FF] cursor-pointer">
            Enquiry Users
            <span className="mx-1">/</span>
          </button>
          <button className="text-[#5580FF]">
            {enquiryData?.firstName && enquiryData?.lastName
              ? `${enquiryData?.firstName} ${enquiryData?.lastName}`
              : "--"}
          </button>
        </div>
      </div>
      <div className=" p-6 bg-white rounded-2xl shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {displayFields.map((field, index) => (
            <div
              key={index}
              className={field.label === "Message" || field.label === "Created Date" ? "sm:col-span-2" : ""}
            >
              <p className="text-sm text-gray-500">{field.label}</p>
              <p className="font-medium">{field.value || "--"}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EnquiryDetails;
