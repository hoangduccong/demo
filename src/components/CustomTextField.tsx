import React from 'react';
import { TextField } from '@material-ui/core';

function CustomTextField(props: any) {
  return (
    <TextField variant="outlined"
               fullWidth
               InputLabelProps={
                 {
                   shrink: true
                 }
               }
               {...props}
    />
  );
}

export default CustomTextField;