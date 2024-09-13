import {
  Fretboard,
  FretboardRef,
  Note,
  NotePosition,
  ScalePosition,
} from '@mikefowler/fretboard';
import { Chip, ChipProps, IconButton, Sheet, Tooltip } from '@mui/joy';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa6';
import { Chord } from 'tonal';
import { useSettings } from '../providers/SettingsProvider';

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
  const fretboard = useRef<FretboardRef>(null);
  const { settings } = useSettings();
  const [open, setOpen] = useState(true);
  const [positions, setPositions] = useState<NotePosition[]>([]);
  const [chordPositions, setChordPositions] = useState<ScalePosition[]>([]);
  const fullChord = useMemo(() => Chord.get(c), [c]);
  const chordNotes = useMemo(() => fullChord.notes, [fullChord]);

  useEffect(() => {
    const positions =
      fretboard.current?.getScale({
        type: settings.mode,
        root: settings.tonic,
      }) ?? [];

    setPositions(positions);

    setChordPositions(
      positions.filter((position) => {
        return chordNotes.includes(
          `${position.note.letter}${position.note.acc}`
        );
      })
    );
  }, [fretboard, chordNotes, settings.mode, settings.tonic]);

  let renderedPositions = chordPositions;

  if (showKeyTones) {
    renderedPositions = positions;
  }

  // const getDotProperties = useCallback(
  //   (note: string) => {
  //     if (note === chordNotes[0]) {
  //       // Chord root
  //       return {
  //         color: 'white',
  //         background: theme.vars.palette.primary[500],
  //       };
  //     } else if (!chordNotes.includes(note) && keyNotes.includes(note)) {
  //       // Scale tones
  //       return {
  //         color: 'black',
  //         background: theme.vars.palette.neutral[300],
  //       };
  //     } else {
  //       // All others
  //       return {
  //         color: 'black',
  //         background: theme.vars.palette.primary[300],
  //       };
  //     }
  //   },
  //   [chordNotes, keyNotes],
  // );

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
              <Fretboard height={200} ref={fretboard}>
                {renderedPositions.map((position) => {
                  return (
                    <Note
                      string={position.string}
                      fret={position.fret}
                      label={`${position.note.letter}${position.note.acc}`}
                      stroke={
                        position.note.letter === fullChord.notes[0]
                          ? 'blue'
                          : 'grey'
                      }
                    />
                  );
                })}
              </Fretboard>
            </Sheet>
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default ChordTableRow;
