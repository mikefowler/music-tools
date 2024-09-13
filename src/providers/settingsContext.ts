import { createContext } from 'react';

export enum Enharmonic {
  SHARP = '#', // '♯'
  FLAT = 'b', // '♭'
}

export interface Settings {
  // Key + Mode
  tonic: string;
  mode: string;
  enharmonic: Enharmonic;

  // Drawer
  drawerIsOpen: boolean;
}

export interface SettingsInterface {
  settings: Settings;
  setTonic: (tonic: string) => void;
  setMode: (mode: string) => void;
  setEnharmonic: (en: Enharmonic) => void;
  toggleDrawer: (open?: boolean) => void;
}

const SettingsContext = createContext<SettingsInterface | undefined>(undefined);

export default SettingsContext;
