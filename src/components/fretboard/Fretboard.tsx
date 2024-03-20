import { Fretboard as FretboardJs, Position } from '@moonwave99/fretboard.js';

import merge from 'lodash/merge';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const defaultOptions = {
  fretCount: 22,
  bottomPadding: 0,
  dotText: ({ note }) => note,
  dotFill: '#BFC9DE',
  dotStrokeWidth: 0,
  dotSize: 24,
  leftPadding: 24,
  rightPadding: 24,
};

const defaultFretboard = new FretboardJs(defaultOptions);

interface FretboardProps {
  id: string;
  notes?: Position[];
  frets?: number;
  dotFill?: string | ((options: { note: string }) => string);
  dotTextColor?: string | ((options: { note: string }) => string);
}

const Fretboard: React.FC<FretboardProps> = ({
  id,
  frets,
  notes,
  dotFill,
  dotTextColor = 'white',
}) => {
  const [fretboard, setFretboard] = useState(defaultFretboard);

  const el = useRef<HTMLDivElement | null>(null);

  const handleSetOptions = useCallback(() => {
    console.log('<Fretboard /> handleSetOptions');

    if (el.current) {
      el.current.innerHTML = '';
    }

    const nextOptions = merge(defaultOptions, {
      el: `#${id}`,
      fretCount: frets,
      dotFill,
      dotTextColor,
    });

    setFretboard(new FretboardJs(nextOptions));
  }, [id, frets, dotFill, dotTextColor]);

  useEffect(() => {
    handleSetOptions();
  }, [dotFill, dotTextColor]);

  useEffect(() => {
    console.log('rerender', fretboard);
    if (notes) {
      fretboard.setDots(notes);
    }
    fretboard.render();
  }, [fretboard, notes, dotFill]);

  // When the component mounts, or when certain props change, update the
  // options on the underlying instance of Fretboard.js, which triggers
  // a re-render
  useEffect(() => {
    console.log('<Fretboard /> mount', fretboard);
    handleSetOptions();
  }, []);

  return <div id={id} ref={el} />;
};

export default Fretboard;
