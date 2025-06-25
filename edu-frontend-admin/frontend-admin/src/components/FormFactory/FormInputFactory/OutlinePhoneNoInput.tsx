import {
    FormControl,
    OutlinedInput,
    MenuItem,
    Select,
    Box,
  } from "@mui/material";
  import { FormikProps } from "formik";
  import { FormFieldConfig } from "../../../types/types";
  
  const countryCodes = [
    { code: "+91", label: "IN" },
    { code: "+1", label: "US" },
    { code: "+44", label: "UK" },
    { code: "+61", label: "AU" },
  ];
  
  const OutlinePhoneNoInput: React.FC<{
    formikProps: FormikProps<any>;
    fieldProps: FormFieldConfig;
  }> = ({ formikProps, fieldProps }) => {
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      formikProps.setFieldValue(fieldProps.name, {
        ...formikProps.values[fieldProps.name],
        number: e.target.value,
      });
    };
  
    const handleCountryCodeChange = (
      e: React.ChangeEvent<{ value: unknown }>
    ) => {
      formikProps.setFieldValue(fieldProps.name, {
        ...formikProps.values[fieldProps.name],
        code: e.target.value as string,
      });
    };
  
    const value = formikProps.values[fieldProps.name] || {
      code: "+91",
      number: "",
    };
  
    return (
      <>
        <Box display="flex" alignItems="center" gap={1}>
          <FormControl style={{ minWidth: 80 }}>
            <Select
              value={value.code}
              onChange={handleCountryCodeChange}
              size="small"
            >
              {countryCodes.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <FormControl fullWidth>
            <OutlinedInput
              placeholder={fieldProps.placeholder}
              value={value.number}
              onChange={handlePhoneChange}
              onBlur={formikProps.handleBlur}
              name={fieldProps.name}
              style={{ height: 40 }}
            />
          </FormControl>
        </Box>
  
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
  
  export default OutlinePhoneNoInput;
  