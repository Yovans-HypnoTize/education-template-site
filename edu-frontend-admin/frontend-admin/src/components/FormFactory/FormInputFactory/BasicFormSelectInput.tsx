import { FormControl, MenuItem, Select } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { FormFieldConfig } from "../../../types/types";

const BasicFormSelectInput: React.FC<{
  formikProps: FormikProps<any>;
  fieldProps: FormFieldConfig;
}> = ({ formikProps, fieldProps }) => {
  return (
    <>
      <FormControl fullWidth>
        <Select
          value={formikProps.values[fieldProps.name]}
          onChange={formikProps.handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          name={fieldProps.name}
          style={{ height: 40 }}
        >
          <MenuItem value="">
            <p>{fieldProps.optionPlaceholder}</p>
          </MenuItem>
          {fieldProps.options.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
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

export default BasicFormSelectInput;
