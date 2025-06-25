import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl } from "@mui/material";
import { SelectOption } from "../types/types";

const MuiAutocomplete: React.FC<{
  value: any;
  onChange: (_:any, value: any) => void;
  options: SelectOption[];
  className?: string;
  optionPlaceholder: string;
}> = ({ value, onChange, optionPlaceholder, options,className }) => {
  return (
    <>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          value={value}
          onChange={onChange}
          options={options}
          sx={{
            "& .MuiInputBase-root": {
              paddingTop: 0,
              paddingBottom: 0,
              height: 38,
              backgroundColor: "#fff",
            },
            "& .MuiOutlinedInput-input": {
              padding: "0 !important",
            },
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder={optionPlaceholder} className={className} />
          )}
        />
      </FormControl>
    </>
  );
};

export default MuiAutocomplete;
