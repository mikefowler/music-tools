import { Position } from '@moonwave99/fretboard.js';
import { Box, IconButton, Stack, Tooltip } from '@mui/joy';
import { get as getScale } from '@tonaljs/scale';
import html2canvas from 'html2canvas';
import React, { useRef, useState } from 'react';
import {
  MdOutlineFileCopy,
  MdOutlineRestartAlt,
  MdOutlineSave,
} from 'react-icons/md';

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

interface FretboardProps {
  id: string;
  editable?: boolean;
}

const Fretboard: React.FC<FretboardProps> = ({ id, editable }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fretboardRef = useRef<HTMLElement | null>(null);
  const [dots, setDots] = useState<Position[]>([]);

  const fretboard = useFretboard({
    el: `#${id}`,
    fretCount: 22,
    bottomPadding: 0,
    dotText: ({ note }) => note,
    dotFill: '#BFC9DE',
    dotStrokeWidth: 0,
    dotSize: 24,
    leftPadding: 24,
    rightPadding: 24,
  });

  const handleSaveImage = async () => {
    if (!fretboardRef.current) return;

    const canvas = await html2canvas(fretboardRef.current);
    const jpg = canvas.toDataURL();

    const link = document.createElement('a');
    link.href = jpg;
    link.download = `fretboard-${Date.now().valueOf()}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyImage = async () => {
    if (!fretboardRef.current) return;

    const canvas = await html2canvas(fretboardRef.current);
    const jpg = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      });
    });
    navigator.clipboard.write([new ClipboardItem({ 'image/png': jpg })]);
  };

  const handleReset = () => {
    fretboard?.clear();
  };

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

      fretboard.setDots(dots).render();
    });
  }

  return (
    <Box ref={containerRef} sx={{ padding: 0 }}>
      <Box display="flex" justifyContent="space-between" marginX={3}>
        <Box>
          <EditableText initialValue="Placeholder" />
        </Box>
        <Box displayPrint="none">
          <Stack direction="row">
            <Tooltip title="Download fretboard as image">
              <IconButton onClick={handleSaveImage}>
                <MdOutlineSave />
              </IconButton>
            </Tooltip>

            <Tooltip title="Copy fretboard to clipboard">
              <IconButton onClick={handleCopyImage}>
                <MdOutlineFileCopy />
              </IconButton>
            </Tooltip>

            <Tooltip title="Clear all notes">
              <IconButton onClick={handleReset}>
                <MdOutlineRestartAlt />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Box>
      <Box
        component="figure"
        id={id}
        ref={fretboardRef}
        className={styles['fretboard-image']}
        sx={{
          margin: 0,
        }}
      />
    </Box>
  );
};

export default Fretboard;
