import { Fretboard as FretboardJs } from '@moonwave99/fretboard.js';
import React, { useEffect, useRef } from 'react';
import Fretboard from '../Fretboard';

import { useSettings } from '../providers/SettingsProvider';

export interface FretboardPageProps {
  foo?: boolean;
}

const FretboardPage: React.FC<FretboardPageProps> = ({ foo }) => {
  const fretboardRef = useRef<FretboardJs>();
  const {
    settings: { tonic, mode },
  } = useSettings();

  useEffect(() => {
    console.log({ tonic, mode });

    setTimeout(() => {
      fretboardRef.current?.renderScale({
        type: mode,
        root: tonic,
      });
    }, 100);
  }, []);

  return <Fretboard id="fretboard" ref={fretboardRef} />;
};

export default FretboardPage;
