import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import ValidateEmail from './screens/ValidateEmail';
import { useColorModeContext } from './contexts/ColorModeThemeContextProvider';

export default function App() {
  const theme = useTheme();
  const colorMode = useColorModeContext();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Container sx={{ margin: '0 auto' }}>
      <FormControlLabel
        control={
          <Switch checked={isDarkMode} onChange={colorMode.toggleColorMode} />
        }
        label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '3vh auto 0 auto',
        }}
      />
      <ValidateEmail />
    </Container>
  );
}
