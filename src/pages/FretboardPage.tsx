// import { Fretboard as FretboardJs } from '@moonwave99/fretboard.js';
import {
  Fretboard,
  FretboardRef,
  Note,
  NotePosition,
} from '@mikefowler/fretboard';
import React, { useEffect, useRef, useState } from 'react';

import { useSettings } from '../providers/SettingsProvider';

export interface FretboardPageProps {
  foo?: boolean;
}

const FretboardPage: React.FC<FretboardPageProps> = ({ foo }) => {
  const fretboard = useRef<FretboardRef>(null);
  const [notes, setNotes] = useState<NotePosition[]>([]);

  const {
    settings: { tonic, mode },
  } = useSettings();

  useEffect(() => {
    const scale = fretboard.current?.getScale({ type: mode, root: tonic });

    setNotes(scale ?? []);
  }, [tonic, mode]);

  return (
    <Fretboard marginLeft={100} height={300} frets={[1, 12]} ref={fretboard}>
      {notes.map((placement) => (
        <Note
          {...placement}
          label={`${placement.note.letter}${placement.note.acc}`}
        />
      ))}
    </Fretboard>
  );
};

export default FretboardPage;
