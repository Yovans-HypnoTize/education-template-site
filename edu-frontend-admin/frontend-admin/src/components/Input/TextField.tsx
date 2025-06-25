import React from "react";
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";

interface ITextField extends Omit<TextFieldProps, "onChange" | "onBlur"> {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: any;
}

const TextField: React.FC<ITextField> = (props) => {
  const { value, handleChange, handleBlur, error, name, label, ...rest } = props;
  return (
    <MuiTextField
      {...rest}
      size="small"
      fullWidth
sx={{
  "& .Mui-disabled": {
    color:"black"
  }, 
}}
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(error)}
      helperText={error}
    />
  );
};

export default TextField;
