import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTrackEmailValidationContext } from '../contexts/TrackEmailValidationContextProvider';
import EmailValidationTrackerTable from './EmailValidationTrackerTable';

export default function EmailValidationTracker() {
  const { emailValidationRequests } = useTrackEmailValidationContext();

  return (
    <Box sx={{ maxHeight: '45vh', overflowY: 'auto' }}>
      {emailValidationRequests.length > 0 ? (
        <EmailValidationTrackerTable
          emailValidationRequests={emailValidationRequests}
        />
      ) : (
        <Typography variant="subtitle1" gutterBottom>
          No email validation requests tracked
        </Typography>
      )}
    </Box>
  );
}
