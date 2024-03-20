import { CssBaseline, CssVarsProvider, GlobalStyles } from '@mui/joy';
import React, { PropsWithChildren } from 'react';

import theme from '../utils/theme';
import IconsProvider from './IconsProvider';
import SettingsProvider from './SettingsProvider';

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ['text.dot-text']: {
            fill: 'currentColor',
          },
        }}
      />

      <SettingsProvider>
        <IconsProvider>{children}</IconsProvider>
      </SettingsProvider>
    </CssVarsProvider>
  );
};

export default AppProvider;
