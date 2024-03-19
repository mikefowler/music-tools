import { Position } from '@moonwave99/fretboard.js';
import React, { useCallback, useEffect, useRef } from 'react';
import { useFretboard } from './FretboardContext';

interface FretboardProps {
  id: string;
  positions?: Position[];
  frets?: number;
}

const Fretboard: React.FC<FretboardProps> = ({ id, frets, positions }) => {
  const { fretboard, setOptions } = useFretboard();

  const el = useRef<HTMLDivElement | null>(null);

  console.log('<Fretboard /> render');

  const handleSetOptions = useCallback(() => {
    console.log('<Fretboard /> handleSetOptions');

    setOptions({
      el: `#${id}`,
      positions,
      fretCount: frets,
    });
  }, [id, positions, frets]);

  // When the component mounts, or when certain props change, update the
  // options on the underlying instance of Fretboard.js, which triggers
  // a re-render
  useEffect(() => {
    console.log('<Fretboard /> mount');
    handleSetOptions();
    fretboard.render();
  }, []);

  return <div id={id} ref={el} />;
};

export default Fretboard;
