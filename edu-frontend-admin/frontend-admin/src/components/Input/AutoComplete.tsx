import React, { memo, ReactNode } from "react";
import { Autocomplete, TextField, Box, FormHelperText, Typography, debounce } from "@mui/material";
import EmergencyIcon from "@mui/icons-material/Emergency";

interface ISelectOption {
  [key: string]: string | number;
}

interface ISelectProps {
  label?: string;
  name?: string;
  options: ISelectOption[];
  error?: string | false | undefined | any;
  value?: string | number | null;
  placeholder?: string;
  handleOnChange: (event: any, value: any) => void;
  sx?: object;
  optionLabelKey?: keyof ISelectOption;
  optionValueKey?: keyof ISelectOption;
  renderValue?: (val: string | number | null) => ReactNode;
  handleDebounce?: (event: any) => void;
  disabled?: boolean;
  required?: boolean;
}

const AutoComplete: React.FC<ISelectProps> = memo(
  ({
    label,
    options = [],
    optionValueKey = "value",
    optionLabelKey = "label",
    placeholder = "",
    sx,
    name,
    error,
    required,
    value,
    disabled,
    handleOnChange,
    handleDebounce = () => {},
  }) => {
    const memoizedOptions = React.useMemo(() => options, [options]);


    return (
      <Box width="100%">
        <Autocomplete
          size="small"
          options={memoizedOptions}
          disabled={disabled}
          getOptionLabel={(option) => option[optionLabelKey] as string}
          getOptionKey={(option) => option[optionValueKey] as string}
          value={memoizedOptions.find((option) => option[optionValueKey] === value) || null}
          onChange={(event, newValue) => handleOnChange(event, newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <Box display="flex" alignItems="center">
                  {label}
                  {required && (
                    <Typography color="error.main" fontSize={12} marginLeft={0.5}>
                      *
                    </Typography>
                  )}
                </Box>
              }
              placeholder={placeholder}
              name={name}
              error={!!error}
              sx={{
                ...sx,
                width: "100%",
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: error ? "error.main" : undefined,
                },
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={`${option[optionValueKey]} ${option[optionLabelKey]}`}>
              {option[optionLabelKey]}
            </li>
          )}
          noOptionsText="No options"
          isOptionEqualToValue={(option, newValue) => option[optionValueKey] === newValue[optionValueKey]}
        />
        {error && <FormHelperText className="Mui-error">{error}</FormHelperText>}
      </Box>
    );
  }
);

export default memo(AutoComplete);
