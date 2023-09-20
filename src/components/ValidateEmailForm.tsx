import * as React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

export default function ValidateEmailForm() {
  return (
    <form>
      <FormControl fullWidth margin="normal" variant="standard">
        <FormLabel htmlFor="my-input">Validate your email address</FormLabel>

        <TextField
          id="outlined-basic"
          sx={{ margin: '16px 0' }}
          variant="outlined"
        />
      </FormControl>

      <Button size="medium" type="submit" variant="contained">
        Validate
      </Button>
    </form>
  );
}
