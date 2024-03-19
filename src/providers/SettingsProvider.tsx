import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { KeyType } from '../components/KeySlider';
export interface Settings {
  // Key + Mode
  tonic: KeyType;
  mode: string;

  // Drawer
  drawerIsOpen: boolean;
}

const defaultSettings: Settings = {
  // Tonic + Mode
  tonic: 'C',
  mode: 'ionian',

  // Drawer
  drawerIsOpen: false,
};

export interface IAppContext {
  settings: Settings;
  setTonic: (tonic: KeyType) => void;
  setMode: (mode: string) => void;
  toggleDrawer: (open?: boolean) => void;
}

const SettingsContext = createContext<IAppContext | undefined>(undefined);

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

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setTonic,
        setMode,
        toggleDrawer,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
