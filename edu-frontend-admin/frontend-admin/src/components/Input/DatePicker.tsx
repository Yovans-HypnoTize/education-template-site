import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

interface IDatePicker extends Omit<DatePickerProps<any>, "onChange" | "onBlur"> {
  handleChange?: (date: Dayjs | null) => void;
  handleBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string | false | undefined | null | any;
}

const DatePicker: React.FC<IDatePicker> = (props) => {
  const { value, error, handleChange, handleBlur, name, label, ...rest } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        {...rest}
        label={label}
        value={value ? dayjs(value) : null}
        onChange={(date) => handleChange && handleChange(date)}
        name={name}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
            error: Boolean(error),
            helperText: error,
            size: "small",
            onBlur: handleBlur,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
