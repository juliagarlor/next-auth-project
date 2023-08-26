import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (    
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <CssBaseline />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  )
}
