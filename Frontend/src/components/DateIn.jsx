import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateIn({disabled = false, ...props}) {
  const [value, setValue] = React.useState(null);
  const handleOnInputChange = (e, date) => {
    props.setDateInValue(e);
  };

  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disabled={disabled}
        label="date in"
        value={value}
        onSelect={handleOnInputChange}
        // onChange={handleOnInputChange.bind(this)}

        onChange={(value, keyboardInputValue) => {
          setValue(value);
          props.setDateInValue(value);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
