import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';

const DropdownMenu = (props) => {
  return (
    <TextField
      required
      error={props.error}
      variant="outlined"
      size="small"
      select
      label={props.label}
      onChange={props.onChange}
      value={props.value}
      fullWidth
    >
      {props.options.map((option) => (
        <MenuItem
          key={option}
          value={option}
        >
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DropdownMenu;
