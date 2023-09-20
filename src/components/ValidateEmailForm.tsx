import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import useValidateEmail from '../hooks/useValidateEmail';

export default function ValidateEmailForm() {
  const {
    displayResults: { color, helperText },
    error,
    isFetching,
    validateEmail,
  } = useValidateEmail();

  const [email, setEmail] = useState('');

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event?.target?.value);
  }
  function validateEmailOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    validateEmail(email);
  }

  return (
    <form onSubmit={validateEmailOnSubmit}>
      <FormControl fullWidth margin="normal" variant="standard">
        <FormLabel htmlFor="validate-email-input">
          Validate your email address
        </FormLabel>

        <TextField
          error={!!error}
          helperText={error || helperText}
          FormHelperTextProps={{ color }}
          id="validate-email-input"
          onChange={onEmailChange}
          sx={{ margin: '16px 0' }}
          value={email}
          variant="outlined"
        />
      </FormControl>

      <Button size="medium" type="submit" variant="contained">
        {isFetching ? <CircularProgress size="1rem" /> : 'Validate'}
      </Button>
    </form>
  );
}
