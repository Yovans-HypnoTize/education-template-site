import { FormikProps } from "formik";
import { FormFieldConfig } from "../../../types/types";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";

const ColorPickerInput: React.FC<{
  formikProps: FormikProps<any>;
  fieldProps: FormFieldConfig;
}> = ({ formikProps, fieldProps }) => {
  const [color, setColor] = useState("#EA0087");

  const isValidHexColor = (value: string) => /^#([0-9A-Fa-f]{6})$/.test(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidHexColor(value)) {
      setColor(value);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    formikProps.setFieldValue(fieldProps.name, e.target.value);
  };

  const colorPickerInput = {
    width: 40,
    height: 42,
    border: "none",
    cursor: "pointer",
    borderRadius: 3,
    p: 0,
    bgcolor: "transparent",
  };

  const colorPickerTextField = {
    height: 42,
    paddingLeft: 1,
    pointerEvents: "none",
    color: "gray",
  };

  return (
    <>
      <FormControl fullWidth>
        <Box>
          <Typography mb={1}>{fieldProps.label}</Typography>
          <Box
            display="flex"
            alignItems="center"
            border="1px solid #ccc"
            borderRadius={1}
          >
            <Box
              component="input"
              type="color"
              value={color}
              onChange={handleColorPickerChange}
              sx={colorPickerInput}
            />
            <TextField
              value={color}
              onChange={handleChange}
              variant="standard"
              slotProps={{
                input: {
                  sx: colorPickerTextField,
                  disableUnderline: true,
                },
              }}
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>
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

export default ColorPickerInput;
