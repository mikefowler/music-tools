import { createContext } from 'react';

import { KeyType } from '../components/KeySlider';

export interface Settings {
  // Key + Mode
  tonic: KeyType;
  mode: string;

  // Drawer
  drawerIsOpen: boolean;
}

export interface SettingsInterface {
  settings: Settings;
  setTonic: (tonic: KeyType) => void;
  setMode: (mode: string) => void;
  toggleDrawer: (open?: boolean) => void;
}

const SettingsContext = createContext<SettingsInterface | undefined>(undefined);

export default SettingsContext;
