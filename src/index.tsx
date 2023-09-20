import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import ColorModeThemeContextProvider from './contexts/ColorModeThemeContextProvider';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <ColorModeThemeContextProvider>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ColorModeThemeContextProvider>,
);
