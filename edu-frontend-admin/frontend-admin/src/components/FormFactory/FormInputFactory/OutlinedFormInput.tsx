import { FormControl, OutlinedInput } from "@mui/material";
import { FormikProps } from "formik";
import { FormFieldConfig } from "../../../types/types";

const OutlinedFormInput: React.FC<{
  formikProps: FormikProps<any>;
  fieldProps: FormFieldConfig;
}> = ({ formikProps, fieldProps }) => {
  return (
    <>
      <FormControl fullWidth>
        <OutlinedInput
          id="menu"
          placeholder={fieldProps.placeholder}
          value={formikProps.values[fieldProps.name]}
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          name={fieldProps.name}
          style={{ height: 40 }}
        />
      </FormControl>
      {fieldProps.required &&
        formikProps.touched[`${fieldProps.name}`] &&
        formikProps.errors[`${fieldProps.name}`] && (
          <p className="text-red-500 text-sm mt-1">
            {formikProps.errors[`${fieldProps.name}`]}
          </p>
        )}
    </>
  );
};

export default OutlinedFormInput;
