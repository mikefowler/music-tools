import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

export interface Settings {
  fretboardCount: number;
  useGridView: boolean;
}

const defaultSettings: Settings = {
  fretboardCount: 0,
  useGridView: false,
};

export interface IAppContext {
  settings: Settings;
  toggleGridView: () => void;
  addFretboard: () => void;
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

  const toggleGridView = () =>
    setSettings((current) => ({
      ...current,
      useGridView: !current.useGridView,
    }));

  const addFretboard = () => {
    console.log('addFretboard');

    setSettings((current) => ({
      ...current,
      fretboardCount: current.fretboardCount + 1,
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        addFretboard,
        toggleGridView,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
