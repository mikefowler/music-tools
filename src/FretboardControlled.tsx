import { Position } from '@moonwave99/fretboard.js';
import { get as getScale } from '@tonaljs/scale';
import React, { useEffect, useRef } from 'react';

import EditableText from './EditableText';
import * as styles from './Fretboard.module.scss';
import useFretboard from './useFretboard';

/** Two octaves of notes for each of the six strings on the neck */
const fretboardNotes = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
  .reverse()
  .map((note) => {
    const [noteName, octave] = note.split('');
    return [
      ...getScale(`${note} chromatic`).notes,
      ...getScale(`${noteName}${+octave + 1} chromatic`).notes,
    ];
  });

export interface FretboardControlledProps {
  id: string;
  editable?: boolean;
  dots?: Position[];
  onSetDots?: (dots: Position[]) => void;
}

const FretboardControlled: React.FC<FretboardControlledProps> = ({
  id,
  editable,
  dots = [],
  onSetDots,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fretboardRef = useRef<HTMLElement | null>(null);

  const fretboard = useFretboard({
    el: `#${id}`,
    fretCount: 22,
    bottomPadding: 0,
    dotText: ({ note }) => note,
    dotFill: '#BFC9DE',
    dotStrokeWidth: 0,
    dotSize: 24,
  });

  useEffect(() => {
    fretboard?.setDots(dots).render();
  }, [dots]);

  useEffect(() => {
    containerRef.current?.classList.add(styles.fretboard);
  }, [containerRef]);

  if (editable) {
    fretboard?.on('mousemove', ({ fret, string }) => {
      const note = fretboardNotes[string - 1][fret];

      const dot: Position = {
        fret,
        string,
        note: note.substring(0, note.length - 1),
        moving: true,
      };

      const dotsToRender = [...dots];

      if (!dotsToRender.find((x) => x.fret === fret && x.string === string)) {
        dotsToRender.push(dot);
      }

      fretboard.setDots(dotsToRender).render();
    });

    fretboard?.on('mouseleave', () => {
      fretboardRef.current?.classList.remove(styles['show-moving-dot']);
      fretboard.setDots(dots).render();
    });

    fretboard?.on('mouseenter', () => {
      fretboardRef.current?.classList.add(styles['show-moving-dot']);
      fretboard.setDots(dots).render();
    });

    fretboard?.on('click', ({ fret, string }) => {
      const note = fretboardNotes[string - 1][fret];

      const dot: Position = {
        fret,
        string,
        note: note.substring(0, note.length - 1),
      };

      const existingDotIndex = dots.findIndex(
        (x) => x.fret === fret && x.string === string
      );

      if (existingDotIndex < 0) {
        dots.push(dot);
      } else {
        dots.splice(existingDotIndex, 1);
      }

      onSetDots?.(dots);
    });
  }

  return (
    <div ref={containerRef} className={styles.fretboard}>
      <EditableText initialValue="Placeholder" />
      <figure
        id={id}
        ref={fretboardRef}
        className={styles['fretboard-image']}
      />
    </div>
  );
};

export default FretboardControlled;
