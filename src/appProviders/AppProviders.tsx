import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from '../theme/theme';
import { TokenContextProvider } from '../contex/tokenContext/TokenContextProvider';
import { TranslationProvider } from '../contex/translations/translation';
import { SnackbarProvider } from '../contex/snackbarContext/SnackbarProvider';

import { AppProvidersTypes } from './AppProviders.types';

const queryClient = new QueryClient();
export const AppProviders = ({ children }: AppProvidersTypes) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <TranslationProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider>{children}</SnackbarProvider>
          </ThemeProvider>
        </TranslationProvider>
      </TokenContextProvider>
    </QueryClientProvider>
  );
};
