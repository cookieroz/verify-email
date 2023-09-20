import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { EmailValidationRequestType } from '../contexts/TrackEmailValidationContextProvider';

type EmailValidationRequestsType = {
  emailValidationRequests: EmailValidationRequestType[] | [];
};

export default function EmailValidationTrackerTable({
  emailValidationRequests,
}: EmailValidationRequestsType) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table displaying tracked email requests" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Email validated</TableCell>
            <TableCell>Validation results</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {emailValidationRequests.map((emailRequest) => (
            <TableRow
              key={emailRequest.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {emailRequest.email}
              </TableCell>
              <TableCell>{emailRequest.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
