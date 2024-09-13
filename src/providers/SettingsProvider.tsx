import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import SettingsContext, { Enharmonic, Settings } from './settingsContext';

const STORAGE_KEY = 'mt-settings';

const defaultSettings: Settings = {
  // Tonic + Mode
  tonic: 'C',
  mode: 'ionian',
  enharmonic: Enharmonic.FLAT,

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
    (tonic: string) => setSettings((previous) => ({ ...previous, tonic })),
    []
  );

  const setMode = useCallback(
    (mode: string) => setSettings((previous) => ({ ...previous, mode })),
    []
  );

  const setEnharmonic = useCallback(
    (enharmonic: Enharmonic) =>
      setSettings((previous) => ({ ...previous, enharmonic })),
    []
  );

  const context = useMemo(
    () => ({
      settings,
      setTonic,
      setMode,
      setEnharmonic,
      toggleDrawer,
    }),
    [settings, setTonic, setMode, toggleDrawer, setEnharmonic]
  );

  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
