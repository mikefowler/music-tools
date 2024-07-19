import { createContext } from 'react';

import { KeyType } from '../components/KeySlider';

export enum Enharmonic {
  SHARP = '♯',
  FLAT = '♭',
}

export interface Settings {
  // Key + Mode
  tonic: KeyType;
  mode: string;
  enharmonic: Enharmonic;

  // Drawer
  drawerIsOpen: boolean;
}

export interface SettingsInterface {
  settings: Settings;
  setTonic: (tonic: KeyType) => void;
  setMode: (mode: string) => void;
  setEnharmonic: (en: Enharmonic) => void;
  toggleDrawer: (open?: boolean) => void;
}

const SettingsContext = createContext<SettingsInterface | undefined>(undefined);

export default SettingsContext;
