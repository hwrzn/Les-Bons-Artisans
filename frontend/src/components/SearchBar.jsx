import React from "react";
import TextField from "@mui/material/TextField";

function SearchBar({ placeholder, value, onChange }) {
  return (
    <TextField
      label={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      fullWidth
    />
  );
}

export default SearchBar;
