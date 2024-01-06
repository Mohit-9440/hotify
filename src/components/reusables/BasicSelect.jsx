/* eslint-disable quotes */
import { Box, MenuItem, FormControl, Select } from "@mui/material";

import React from "react";

import './resuable.css';

export default function BasicSelect({ menuItems }) {
  const [selectedValue, setSelectedValue] = React.useState(menuItems?.length > 0 ? menuItems[0].value : "");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box className="w-1/5">
      <FormControl classes={{ root: 'bg-black rounded w-full' }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          onChange={handleChange}
          className="basic-select"
          sx={{
            '.MuiOutlinedInput-notchedOutline': { border: 'black' },
          }}
        >
          {menuItems?.map((item) => (
            <MenuItem classes={{ input: 'bg-red' }} key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
