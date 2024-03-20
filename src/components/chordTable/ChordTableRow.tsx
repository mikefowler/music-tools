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
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullChord = Chord.get(c);
  const notes = fullChord.notes;

  const system = new FretboardSystem();
  const dots = system.getPositionsForNotes(notes);

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
            const note = notes[index];
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
                dotFill={({ note }) => {
                  if (note === notes[0]) return theme.vars.palette.primary[500];

                  return theme.vars.palette.neutral[400];
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
