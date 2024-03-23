import { FretboardSystem } from '@moonwave99/fretboard.js';
import {
  Chip,
  ChipProps,
  IconButton,
  Sheet,
  Tooltip,
  useTheme,
} from '@mui/joy';
import React, { Fragment, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa6';
import { Chord } from 'tonal';
import { useSettings } from '../../providers/SettingsProvider';
import Fretboard from '../fretboard/Fretboard';

export interface ChordTableRowProps {
  chord: string;
  onMouseOverNote?: (note: string) => void;
  onMouseOutNote?: (note: string) => void;
  onPressNote?: (note: string) => void;
  onRemove?: () => void;
  columnCount: number;
  previewNote?: string;
  highlightNote?: string;
  showScaleTones?: boolean;
}

const ChordTableRow: React.FC<ChordTableRowProps> = ({
  chord: c,
  onMouseOverNote,
  onMouseOutNote,
  onPressNote,
  onRemove,
  columnCount,
  previewNote,
  highlightNote,
  showScaleTones: showKeyTones,
}) => {
  const theme = useTheme();
  const { settings } = useSettings();
  const [open, setOpen] = useState(true);
  const fullChord = Chord.get(c);
  const chordNotes = fullChord.notes;
  const system = new FretboardSystem();
  const scale = system.getScale({
    type: settings.mode,
    root: settings.tonic,
  });
  const keyNotes = Array.from(new Set(scale.map((p) => p.note ?? '')));
  let allNotes = chordNotes;

  if (showKeyTones) {
    allNotes = Array.from(new Set([...chordNotes, ...keyNotes]));
  }

  // console.log({ chordNotes, keyNotes, allNotes });

  const dots = system.getPositionsForNotes(allNotes);

  return (
    <Fragment key={c}>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </td>
        <td>
          <Tooltip title="Remove chord">
            <IconButton
              onClick={onRemove}
              sx={{
                '--IconButton-size': '22px',
              }}
            >
              <FaTrash />
            </IconButton>
          </Tooltip>
        </td>

        <th scope="row">{c}</th>

        {Array(columnCount)
          .fill(1)
          .map((_v, index) => {
            const note = chordNotes[index];
            let selected = false;
            let color: ChipProps['color'];

            if (!note) return <td key={index} />;

            if (highlightNote === note) {
              selected = true;
              color = 'primary';
            } else if (previewNote === note) {
              color = 'success';
            } else {
              color = 'neutral';
            }

            return (
              <td key={note}>
                <div
                  onMouseOver={() => onMouseOverNote?.(note)}
                  onMouseOut={() => onMouseOutNote?.(note)}
                >
                  <Chip
                    variant={selected ? 'soft' : 'outlined'}
                    size="lg"
                    sx={{ fontSize: 18, px: 2 }}
                    color={color}
                    onClick={() => onPressNote?.(note)}
                  >
                    {note}
                  </Chip>
                </div>
              </td>
            );
          })}
      </tr>
      {open && (
        <tr>
          <td colSpan={columnCount + 3}>
            <Sheet
              variant="soft"
              sx={{
                p: 1,
                pl: 6,
                boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)',
              }}
            >
              <Fretboard
                id={`fretboard-${c}`}
                notes={dots}
                dotTextColor={({ note }) => {
                  if (note === chordNotes[0]) {
                    // Chord root
                    return 'white';
                  } else if (
                    !chordNotes.includes(note) &&
                    keyNotes.includes(note)
                  ) {
                    // Scale tones
                    return 'black';
                  } else {
                    // All others
                    return 'black';
                  }
                }}
                dotFill={({ note }) => {
                  if (note === chordNotes[0]) {
                    // Chord root fill
                    return theme.vars.palette.primary[500];
                  } else if (chordNotes.includes(note)) {
                    // Chord note fill
                    return theme.vars.palette.primary[300];
                  }

                  // All others (e.g. scale tones)
                  return theme.vars.palette.neutral[200];
                }}
              />
            </Sheet>
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default ChordTableRow;
