import { Formik } from "formik";
import { addUserSchema } from "../../utils/validationSchemas";
import CustomButton from "../../components/CustomButton";
import {
  initialValues,
  menuPositionOptions,
  menuTemplateOptions,
} from "../../utils/Constants";
import { customBtnStyles } from "../../styles/styles";
import FormField from "../../components/FormFactory/FormField";
import React from "react";

interface AddUserFormFormProps {
  handleClose: () => void;
}

const AddUserForm: React.FC<AddUserFormFormProps> = ({ handleClose }) => {
  return (
    <>
      <Formik
        initialValues={initialValues.addUserInitialValues}
        validationSchema={addUserSchema}
        onSubmit={(values) => {
          console.log("submit values", values);
          handleClose();
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <div className="my-5 pt-3">
              <FormField
                fieldProps={{
                  fieldType: "textbox-outlined",
                  name: "name",
                  required: true,
                  placeholder: "Enter name",
                }}
                formik={formikProps}
              />
            </div>

            <div className="my-5 ">
              <FormField
                fieldProps={{
                  fieldType: "textbox-outlined",
                  name: "email",
                  required: true,
                  placeholder: "Enter email",
                }}
                formik={formikProps}
              />
            </div>

            <div className="my-5 ">
              <FormField
                fieldProps={{
                  fieldType: "outlined-phone-input",
                  name: "phoneNo",
                  required: true,
                  placeholder: "Enter phone",
                }}
                formik={formikProps}
              />
            </div>

            <div className="my-5 ">
              <FormField
                fieldProps={{
                  fieldType: "autocomplete-outlined",
                  name: "role",
                  required: true,
                  options: menuTemplateOptions,
                  optionPlaceholder: "Select role",
                }}
                formik={formikProps}
              />
            </div>
            <div className="my-5 ">
              <FormField
                fieldProps={{
                  fieldType: "textbox-outlined",
                  name: "userName",
                  required: true,
                  placeholder: "Enter userName",
                }}
                formik={formikProps}
              />
            </div>

            <div className="my-5 ">
              <FormField
                fieldProps={{
                  fieldType: "textbox-outlined",
                  name: "Password",
                  required: true,
                  placeholder: "Enter Password",
                }}
                formik={formikProps}
              />
            </div>

            <div className="pt-10  flex justify-center">
              <div>
                <CustomButton
                  title="Add New User"
                  key="add new user"
                  type="submit"
                  styleProps={customBtnStyles}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddUserForm;
