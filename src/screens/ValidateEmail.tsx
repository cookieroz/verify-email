import * as React from 'react';
import Container from '@mui/material/Container';
import ValidateEmailForm from '../components/ValidateEmailForm';

export default function ValidateEmail() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <ValidateEmailForm />
    </Container>
  );
}
