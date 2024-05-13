import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { KeyType } from '../components/KeySlider';
import SettingsContext, { Settings } from './settingsContext';

const STORAGE_KEY = 'mt-settings';

const defaultSettings: Settings = {
  // Tonic + Mode
  tonic: 'C',
  mode: 'ionian',

  // Drawer
  drawerIsOpen: false,
};

const getInitialSettings = () => {
  const persistedSettings = localStorage.getItem(STORAGE_KEY);

  if (persistedSettings) {
    return {
      ...defaultSettings,
      ...JSON.parse(persistedSettings),
    };
  }

  return defaultSettings;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error('useSettings must be used within SettingsProvider');
  }

  return context;
};

const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(getInitialSettings());

  // Persist certain settings to localStorage
  useEffect(() => {
    const { tonic, mode } = settings;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        tonic,
        mode,
      })
    );
  }, [settings]);

  const toggleDrawer = useCallback(
    (open?: boolean) =>
      setSettings((previous) => ({
        ...previous,
        drawerIsOpen: open || !previous.drawerIsOpen,
      })),
    []
  );

  const setTonic = useCallback(
    (tonic: KeyType) => setSettings((previous) => ({ ...previous, tonic })),
    []
  );

  const setMode = useCallback(
    (mode: string) => setSettings((previous) => ({ ...previous, mode })),
    []
  );

  const context = useMemo(
    () => ({
      settings,
      setTonic,
      setMode,
      toggleDrawer,
    }),
    [settings, setTonic, setMode, toggleDrawer]
  );

  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
