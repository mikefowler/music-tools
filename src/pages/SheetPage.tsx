import {
  Box,
  Button,
  Chip,
  ChipProps,
  Divider,
  IconButton,
  Stack,
  Table,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/joy';
import Chord from '@tonaljs/chord';
import Mode from '@tonaljs/mode';
import uniq from 'lodash/uniq';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import {
  FaArrowRotateLeft,
  FaChevronDown,
  FaChevronRight,
  FaTrash,
} from 'react-icons/fa6';
import Fretboard from '../components/fretboard/Fretboard';
import { FretboardProvider } from '../components/fretboard/FretboardContext';
import { useSettings } from '../providers/SettingsProvider';

export interface SheetPageProps {}

const SheetPage: React.FC<SheetPageProps> = ({}) => {
  const { settings } = useSettings();
  const [showExtensions, setShowExtensions] = useState(false);
  const [selectedChords, setSelectedChords] = useState<string[]>([]);
  const [highlightNote, setHighlightNote] = useState<string | undefined>();
  const [previewNote, setPreviewNote] = useState<string | undefined>();

  const toggleExtensions = () => setShowExtensions((prev) => !prev);
  const resetChords = () => setSelectedChords([]);

  const deselectChord = (chord: string) =>
    setSelectedChords((prev) => {
      const next = prev.slice(0);
      const indexToRemove = prev.indexOf(chord);

      if (indexToRemove === -1) return next;

      next.splice(indexToRemove, 1);

      return next;
    });

  const diatonicChords = Mode.triads(settings.mode, settings.tonic);

  // Reset the state when the tonic or mode change
  useEffect(() => {
    console.log('tonic or mode changed');
    setSelectedChords([]);
    setHighlightNote(undefined);
    setPreviewNote(undefined);
  }, [settings.tonic, settings.mode]);

  const allChords = useMemo(
    () =>
      new Map(
        diatonicChords.map((c) => {
          const chord = Chord.get(c);
          const extendedChord = Chord.extended(c);

          return [c, extendedChord];
        }),
      ),
    [selectedChords],
  );

  /** The number of columns required to render the notes for all selected chords */
  const noteColumnCount = useMemo(
    () =>
      Math.max(
        ...selectedChords.map((c) => {
          const chord = Chord.get(c);

          return chord.notes.length ?? 0;
        }),
      ),
    [selectedChords],
  );

  // The number of chords that have been selected from the set of extensions
  const selectedExtensionCount = selectedChords.filter(
    (c) => !diatonicChords.includes(c),
  ).length;

  const selectedNotes = uniq(
    selectedChords.reduce<string[]>((prev, next) => {
      const chord = Chord.get(next);

      return [...prev, ...chord.notes];
    }, []),
  );

  // console.log('Selected chords: ', selectedChords.join(', '));
  // console.log('Selected notes: ', selectedNotes.join(', '));

  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <ToggleButtonGroup
            value={selectedChords}
            onChange={(_e, newValue) => setSelectedChords(newValue)}
          >
            {diatonicChords.map((t) => (
              <Button key={t} value={t}>
                {t}
              </Button>
            ))}
          </ToggleButtonGroup>

          <Divider orientation="vertical" />

          <Chip
            onClick={toggleExtensions}
            startDecorator={
              showExtensions ? <FaChevronDown /> : <FaChevronRight />
            }
            variant="outlined"
            size="sm"
            sx={{ px: 2 }}
          >
            Extensions{' '}
            {selectedExtensionCount > 0 ? (
              <b>(+{selectedExtensionCount})</b>
            ) : (
              ''
            )}
          </Chip>

          <Chip
            onClick={resetChords}
            startDecorator={<FaArrowRotateLeft />}
            variant="outlined"
            size="sm"
            sx={{ px: 2 }}
          >
            Reset
          </Chip>
        </Stack>

        {showExtensions && (
          <Box overflow="auto">
            <Stack spacing={2}>
              {diatonicChords.map((c) => {
                const extendedChord = allChords.get(c);

                if (!extendedChord) return null;

                return (
                  <ToggleButtonGroup
                    key={c}
                    value={selectedChords}
                    onChange={(_e, newValue) => setSelectedChords(newValue)}
                  >
                    {extendedChord.map((c) => {
                      const chord = Chord.get(c);

                      return (
                        <Button key={c} value={chord.symbol}>
                          {chord.symbol}
                        </Button>
                      );
                    })}
                  </ToggleButtonGroup>
                );
              })}
            </Stack>
          </Box>
        )}
      </Stack>

      <Box mt={8}>
        {!!selectedChords.length && (
          <>
            <Typography component="h2" level="h3">
              Chords
            </Typography>

            <Table
              variant="plain"
              size="lg"
              borderAxis="none"
              sx={{
                mt: 4,
                '--TableCell-headBackground': 'transparent',
                '& thead th:nth-child(1)': { width: '60px' },
              }}
            >
              <thead>
                <tr>
                  <th>
                    <Tooltip title="Remove all chords">
                      <IconButton
                        onClick={resetChords}
                        sx={{
                          '--IconButton-size': '22px',
                        }}
                      >
                        <FaTrash />
                      </IconButton>
                    </Tooltip>
                  </th>
                  <th>Name</th>
                  {Array(noteColumnCount)
                    .fill(1)
                    .map((_v, index) => (
                      <th key={index} />
                    ))}
                </tr>
              </thead>
              <tbody>
                {selectedChords.map((c) => {
                  const fullChord = Chord.get(c);
                  const notes = fullChord.notes;

                  return (
                    <Fragment key={c}>
                      <tr>
                        <th>
                          <Tooltip title="Remove chord">
                            <IconButton
                              onClick={() => deselectChord(c)}
                              sx={{
                                '--IconButton-size': '22px',
                              }}
                            >
                              <FaTrash />
                            </IconButton>
                          </Tooltip>
                        </th>

                        <th scope="row">{c}</th>

                        {Array(noteColumnCount)
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
                                  onMouseOver={() => setPreviewNote(note)}
                                  onMouseOut={() => setPreviewNote(undefined)}
                                >
                                  <Chip
                                    variant={selected ? 'soft' : 'outlined'}
                                    size="lg"
                                    sx={{ fontSize: 18, px: 2 }}
                                    color={color}
                                    onClick={() => setHighlightNote(note)}
                                  >
                                    {note}
                                  </Chip>
                                </div>
                              </td>
                            );
                          })}
                      </tr>
                      <tr>
                        <td colSpan={noteColumnCount + 2}>
                          <FretboardProvider>
                            <Fretboard
                              id={`fretboard-${c}`}
                              positions={[
                                { string: 5, fret: 3 },
                                { string: 4, fret: 2 },
                                { string: 2, fret: 1 },
                              ]}
                            />
                          </FretboardProvider>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </Box>
    </>
  );
};

export default SheetPage;
