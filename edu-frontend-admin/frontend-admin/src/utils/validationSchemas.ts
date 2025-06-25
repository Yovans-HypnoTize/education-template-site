import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().min(6, "Too Short!").required("Password is required"),
});

export const addMenuSchema = Yup.object().shape({
  menu: Yup.string().required("Required"),
  menuTemplate: Yup.string().required("Select at least one"),
  menuPosition: Yup.string().required("Select at least one"),
});

export const addSubMenuSchema = Yup.object().shape({
  submenu: Yup.string().required("Required"),
  submenuTemplate: Yup.string().required("Select at least one"),
  submenuPosition: Yup.string().required("Select at least one"),
  saveSubmenu: Yup.string().required("Required"),
  currentSubmenuTitle: Yup.string().required("Required"),
});

export const addUserSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Select at least one"),
  phoneNo: Yup.object().shape({
    code: Yup.string().required("Code is required"),
    number: Yup.string().required("Phone number is required"),
  }),
  role: Yup.string().required("Required"),
  userName: Yup.string().required("Required"),
  Password: Yup.string().required("Required"),
});
