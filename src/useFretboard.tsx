import { Fretboard } from '@moonwave99/fretboard.js';
import { Options } from '@moonwave99/fretboard.js/dist/fretboard/Fretboard';
import { useEffect, useState } from 'react';

export type FretboardOptions = Options;

const useFretboard = (options: Partial<Options>) => {
  const [fretboard, setFretboard] = useState<Fretboard>();

  useEffect(() => {
    if (!fretboard) {
      // Create the Fretboard instance and store it in state
      const fretboardInstance = new Fretboard(options);
      setFretboard(fretboardInstance);

      // Initial render
      fretboardInstance.render();
    }
  }, [options]);

  return fretboard;
};

export default useFretboard;
