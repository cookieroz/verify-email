import * as React from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ValidateEmailForm from '../components/ValidateEmailForm';
import TrackEmailValidationContextProvider from '../contexts/TrackEmailValidationContextProvider';
import EmailValidationTracker from '../components/EmailValidationTracker';

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
      <TrackEmailValidationContextProvider>
        <ValidateEmailForm />
        <Divider
          sx={{ borderColor: '#000000', margin: '32px 0 16px 0' }}
          variant="middle"
        />
        <EmailValidationTracker />
      </TrackEmailValidationContextProvider>
    </Container>
  );
}
