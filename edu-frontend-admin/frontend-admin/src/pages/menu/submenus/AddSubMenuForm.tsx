import { Formik } from "formik";
import { addSubMenuSchema } from "../../../utils/validationSchemas";
import CustomButton from "../../../components/CustomButton";
import {
  initialValues,
  menuPositionOptions,
  menuTemplateOptions,
} from "../../../utils/Constants";
import CustomModernCheckbox from "../../../components/CustomModernCheckbox";
import { customBtnStyles } from "../../../styles/styles";
import React from "react";
import FormField from "../../../components/FormFactory/FormField";

interface AddSubMenuFormProps {
  handleClose: () => void;
}

const AddSubMenuForm: React.FC<AddSubMenuFormProps> = ({ handleClose }) => {
  return (
    <>
      <Formik
        initialValues={initialValues.addSubmenuInitialValues}
        validationSchema={addSubMenuSchema}
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
                  name: "submenu",
                  required: true,
                  placeholder: "Enter sub menu",
                }}
                formik={formikProps}
              />
            </div>

            <div className="mb-2">
              <FormField
                fieldProps={{
                  fieldType: "autocomplete-outlined",
                  name: "submenuTemplate",
                  required: true,
                  options: menuTemplateOptions,
                  optionPlaceholder: "Select sub menu template",
                }}
                formik={formikProps}
              />
            </div>

            <div className="my-5">
              <FormField
                fieldProps={{
                  fieldType: "autocomplete-outlined",
                  name: "submenuPosition",
                  required: true,
                  options: menuPositionOptions,
                  optionPlaceholder: "Select sub menu position",
                }}
                formik={formikProps}
              />
            </div>

            <div className="my-5 flex items-center">
              <CustomModernCheckbox
                setFieldValue={formikProps.setFieldValue}
                values={formikProps.values}
              />
              <span className="text-sm mt-1 ml-2">
                Save current menu blocks to new sub menu
              </span>
            </div>

            <div className="my-4">
              <FormField
                fieldProps={{
                  fieldType: "textbox-outlined",
                  name: "currentSubmenuTitle",
                  required: true,
                  placeholder: "Enter current sub menu title",
                }}
                formik={formikProps}
              />
            </div>

            <div className="pt-10  flex justify-center">
              <div>
                <CustomButton
                  title="Add Sub Menu"
                  key="add sub menu"
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

export default AddSubMenuForm;
