import React, { PropsWithChildren } from 'react';
import { CssBaseline, CssVarsProvider } from '@mui/joy';

import SettingsProvider from './SettingsProvider';
import IconsProvider from './IconsProvider';

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <SettingsProvider>
        <IconsProvider>{children}</IconsProvider>
      </SettingsProvider>
    </CssVarsProvider>
  );
};

export default AppProvider;
