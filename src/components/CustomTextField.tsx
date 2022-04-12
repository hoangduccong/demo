import React from 'react';
import { TextField } from '@material-ui/core';
import { useStyle } from './componentStyles';

function CustomTextField(props: any) {
  const classes = useStyle();
  return (
    <TextField
      className={classes.textField}
      variant="outlined"
      fullWidth
      
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
}

export default CustomTextField;