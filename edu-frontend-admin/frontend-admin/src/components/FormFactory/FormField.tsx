import { FormikProps } from "formik";
import { FormFieldConfig } from "../../types/types";
import OutlinedFormInput from "./FormInputFactory/OutlinedFormInput";
import BasicFormSelectInput from "./FormInputFactory/BasicFormSelectInput";
import AutoCompleteWithoutLabel from "./FormInputFactory/AutoCompleteWithoutLabel";
import ColorPickerInput from "./FormInputFactory/ColorPickerInput";
import ImageUploaderInput from "./FormInputFactory/ImageUploaderInput";
import OutlinePhoneNoInput from "./FormInputFactory/OutlinePhoneNoInput";

const FormField: React.FC<{
  formik: FormikProps<any>;
  fieldProps: FormFieldConfig;
}> = ({ formik, fieldProps }) => {
  if (fieldProps.fieldType === "textbox-outlined") {
    return (
      <OutlinedFormInput
        fieldProps={fieldProps}
        formikProps={formik}
        key={"textbox-outlined"}
      />
    );
  } else if (fieldProps.fieldType === "basic-select") {
    return (
      <BasicFormSelectInput
        fieldProps={fieldProps}
        formikProps={formik}
        key={"basic-select"}
      />
    );
  } else if (fieldProps.fieldType === "autocomplete-outlined") {
    return (
      <AutoCompleteWithoutLabel
        fieldProps={fieldProps}
        formikProps={formik}
        key={"autocomplete-outlined"}
      />
    );
  } else if (fieldProps.fieldType === "color-picker") {
    return (
      <ColorPickerInput
        fieldProps={fieldProps}
        formikProps={formik}
        key={"color-picker"}
      />
    );
  } else if (fieldProps.fieldType === "image-upload") {
    return (
      <ImageUploaderInput
        fieldProps={fieldProps}
        formikProps={formik}
        key={"image-upload"}
      />
    );
  } else if (fieldProps.fieldType === "outlined-phone-input") {
    return (
      <OutlinePhoneNoInput
        fieldProps={fieldProps}
        formikProps={formik}
        key={"image-upload"}
      />
    );
  } else {
    return <>Nothing to render</>;
  }
};

export default FormField;
