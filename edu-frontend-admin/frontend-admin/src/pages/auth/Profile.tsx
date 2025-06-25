import React, { useEffect } from "react";
import { Avatar, Button, Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ArrowBack } from "@mui/icons-material";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

import {
  GetCountryList,
  GetProfile,
  startLoading,
  stopLoading,
  UpdateProfileAction,
  UpdateProfileImageAction,
} from "./features/authSlice";
import { notifyError, notifySuccess, notifyWarning } from "../../utils/toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TextField from "../../components/Input/TextField";
import DatePicker from "../../components/Input/DatePicker";
import AutoComplete from "../../components/Input/AutoComplete";
import { MAX_FILE_SIZE } from "../../utils/Constants";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  dob: Yup.date().nullable().required("Date of birth is required"),
  address: Yup.string().nullable(),
  pinCode: Yup.string().nullable(),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
});

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, countryList } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetCountryList());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...user?.data,

      name: user?.data?.firstname || "",
      email: user?.data?.email || "",
      phoneNo: user?.data?.phoneNo || "",
      dob: user?.data?.dob || null,
      address: user?.data?.address || "",
      pinCode: user?.data?.pinCode || "",
      gender: user?.data?.gender || "",
      countryId: countryList?.data?.find((country: any) => country.name == user?.data?.country)?.id || "",
      state: user?.data?.state || "",
      city: user?.data?.city || "",
      profileImageUrl: user?.data?.profileImage || "",
    },
    onSubmit: async (values) => {
      dispatch(startLoading());
      try {
        // Upload profile image if it's a File
        const formData = new FormData();
        if (values.profileImage instanceof File) {
          formData.append("files", values.profileImage);
        }
        Object.keys(values).forEach((key) => {
          if (key !== "profileImageUrl") {
            formData.append(key, values[key]);
          }
        }
        );
        // Update profile
        const res: any = await dispatch(UpdateProfileAction(formData));

        if (res.type.includes("fulfilled")) {
          await dispatch(GetProfile());
          notifySuccess("Profile updated successfully");
        } else {
          notifyError(res?.payload?.message || "Profile update failed");
        }
      } catch (err) {
        notifyError("Something went wrong");
        console.error(err);
      } finally {
        dispatch(stopLoading());
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        notifyError("Only image files are allowed.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        notifyError("File size exceeds 5MB limit.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          formik.setFieldValue("profileImageUrl", reader.result);
          formik.setFieldValue("profileImage", file);
        } else {
          notifyError("Failed to load image. Please try another one.");
        }
      };

      reader.onerror = () => {
        notifyError("Error reading file. Please try again.");
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Card elevation={5} sx={{ borderRadius: 2, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Profile Settings
            </Typography>
            <Button
              type="submit"
              sx={{
                height: 30,
              }}
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                if (!formik.dirty) {
                  notifyWarning("No changes made to save.");
                  return;
                }
                formik.handleSubmit();
              }}
              endIcon={
                <ArrowBack
                  sx={{
                    rotate: "180deg",
                  }}
                />
              }
            >
              Save Changes
            </Button>
          </Box>
          <Box sx={{ display: "flex", mb: 4, width: "100%", gap: 1 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={formik.values.profileImageUrl || "/default-avatar.png"}
                sx={{ width: 100, height: 100, borderRadius: 5, boxShadow: 5 }}
              />
              <input about="file" type="file" accept="image/*" hidden id="file-input" onChange={handleFileChange} />
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(20%, 20%)",
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  filter: "drop-shadow(1px 1px 1px black)",
                  stroke: "black",
                  borderRadius: "100px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    transform: "translate(20%, 20%) scale(1.1)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },

                  color: "white",
                }}
                onClick={() => {
                  const fileInput = document.getElementById("file-input") as HTMLInputElement;
                  if (fileInput) {
                    fileInput.click();
                  }
                }}
              >
                <CenterFocusWeakIcon
                  fontSize="small"
                  sx={{
                    filter: "drop-shadow(1px 1px 1px black)",
                    stroke: "black",
                    strokeWidth: 0.5,
                  }}
                />
              </IconButton>
            </Box>
            <div className="grid grid-cols-2 gap-4 ml-4 w-full">
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formik.values.name}
                handleChange={formik.handleChange}
                disabled
                handleBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                disabled
                value={formik.values.email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Phone Number"
                disabled
                name="phoneNo"
                value={formik.values.phoneNo}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                error={formik.touched.phoneNo && formik.errors.phoneNo}
              />{" "}
              <AutoComplete
                label="Gender"
                options={genderOptions}
                optionValueKey="value"
                optionLabelKey="label"
                value={formik.values.gender}
                handleOnChange={(_event, newValue) => {
                  formik.setFieldValue("gender", newValue?.value || "");
                }}
                error={formik.touched.gender && formik.errors.gender}
              />
            </div>
          </Box>
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              label="Date of Birth"
              value={formik.values.dob ? dayjs(formik.values.dob) : null}
              handleChange={(value: any) => formik.setFieldValue("dob", value)}
              error={formik.touched.dob && formik.errors.dob}
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formik.values.address}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              multiline
              rows={2}
            />

            <TextField
              fullWidth
              label="PIN Code"
              name="pinCode"
              type="number"
              value={formik.values.pinCode}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            />
            <AutoComplete
              label="Country"
              options={countryList?.data || []}
              optionValueKey="id"
              optionLabelKey="name"
              value={formik.values.countryId}
              handleOnChange={(_event, newValue) => {
                formik.setFieldValue("countryId", newValue?.id || "");
              }}
              error={formik.touched.country && formik.errors.country}
            />
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formik.values.state}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.touched.state && formik.errors.state}
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.touched.city && formik.errors.city}
            />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
