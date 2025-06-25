import { Formik } from "formik";
import { addMenuSchema } from "../../utils/validationSchemas";
import CustomButton from "../../components/CustomButton";
import {
  initialValues,
  menuPositionOptions,
  menuTemplateOptions,
} from "../../utils/Constants";
import { customBtnStyles } from "../../styles/styles";
import FormField from "../../components/FormFactory/FormField";
import React from "react";

interface AddMenuFormProps {
  handleClose: () => void;
}

const AddMenuForm: React.FC<AddMenuFormProps> = ({ handleClose }) => {
  return (
    <>
      <Formik
        initialValues={initialValues.addMenuInitialValues}
        validationSchema={addMenuSchema}
        onSubmit={(values) => {
          console.log("submit values", values);
          handleClose();
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <div className="mb-4 mt-8">
              <FormField
                fieldProps={{
                  fieldType: "textbox-outlined",
                  name: "menu",
                  required: true,
                  placeholder: "Enter menu",
                }}
                formik={formikProps}
              />
            </div>

            <div className="mb-2">
              <FormField
                fieldProps={{
                  fieldType: "autocomplete-outlined",
                  name: "menuTemplate",
                  required: true,
                  options: menuTemplateOptions,
                  optionPlaceholder: "Select menu template",
                }}
                formik={formikProps}
              />
            </div>

            <div className="mt-4">
              <FormField
                fieldProps={{
                  fieldType: "autocomplete-outlined",
                  name: "menuPosition",
                  required: true,
                  options: menuPositionOptions,
                  optionPlaceholder: "Select menu position",
                }}
                formik={formikProps}
              />
            </div>

            <div className="pt-10  flex justify-center">
              <div>
                <CustomButton
                  title="Add New Menu"
                  key="add new menu"
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

export default AddMenuForm;
