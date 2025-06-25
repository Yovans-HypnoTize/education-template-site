import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormikProps } from "formik";
import { FormFieldConfig } from "../../../types/types";
import { FormControl } from "@mui/material";

const AutoCompleteWithoutLabel: React.FC<{
  formikProps: FormikProps<any>;
  fieldProps: FormFieldConfig;
}> = ({ formikProps, fieldProps }) => {
  return (
    <>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          value={formikProps.values[fieldProps.name]}
          onChange={(_, value) =>
            formikProps.setFieldValue(fieldProps.name, value.value)
          }
          options={fieldProps.options}
          name={fieldProps.name}
          sx={{
            "& .MuiInputBase-root": {
              paddingTop: 0,
              paddingBottom: 0,
              height: 42,
            },
            "& .MuiOutlinedInput-input": {
              padding: "0 !important",
            },
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder={fieldProps.optionPlaceholder} />
          )}
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

export default AutoCompleteWithoutLabel;
