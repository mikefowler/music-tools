import React, { PropsWithChildren, useContext, useMemo, useState } from 'react';
import { KeyType } from '../components/KeySlider';
import SettingsContext, { Settings } from './settingsContext';

const defaultSettings: Settings = {
  // Tonic + Mode
  tonic: 'C',
  mode: 'ionian',

  // Drawer
  drawerIsOpen: false,
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error('useSettings must be used within SettingsProvider');
  }

  return context;
};

const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const toggleDrawer = (open?: boolean) =>
    setSettings((previous) => ({
      ...previous,
      drawerIsOpen: open || !previous.drawerIsOpen,
    }));

  const setTonic = (tonic: KeyType) =>
    setSettings((previous) => ({ ...previous, tonic }));

  const setMode = (mode: string) =>
    setSettings((previous) => ({ ...previous, mode }));

  const context = useMemo(
    () => ({
      settings,
      setTonic,
      setMode,
      toggleDrawer,
    }),
    [settings, setTonic, setMode, toggleDrawer],
  );

  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
