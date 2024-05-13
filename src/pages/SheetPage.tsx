import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Sheet,
  Stack,
  Table,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/joy';
import Chord from '@tonaljs/chord';
import Mode from '@tonaljs/mode';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FaArrowRotateLeft,
  FaCheck,
  FaChevronDown,
  FaChevronRight,
  FaTrash,
} from 'react-icons/fa6';
import ChordTableRow from '../components/chordTable/ChordTableRow';
import { useSettings } from '../providers/SettingsProvider';

export interface SheetPageProps {}

const SheetPage: React.FC<SheetPageProps> = ({}) => {
  const { settings } = useSettings();
  const [showExtensions, setShowExtensions] = useState(false);
  const [selectedChords, setSelectedChords] = useState<string[]>([]);
  const [highlightNote, setHighlightNote] = useState<string | undefined>();
  const [previewNote, setPreviewNote] = useState<string | undefined>();
  const [showScaleTones, setShowScaleTones] = useState(false);

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

            <Stack my={2}>
              <Chip
                variant="outlined"
                color={showScaleTones ? 'primary' : 'neutral'}
                startDecorator={showScaleTones && <FaCheck />}
                onClick={() => {
                  setShowScaleTones((prev) => !prev);
                }}
              >
                Show scale tones
              </Chip>
            </Stack>

            <Sheet>
              <Table
                variant="plain"
                size="lg"
                borderAxis="none"
                sx={{
                  mt: 4,
                  '& thead td:nth-child(1)': { width: '60px' },
                  '& tbody td:nth-child(1)': { width: '60px' },
                  '& thead td:nth-child(2)': { width: '60px' },
                }}
              >
                <thead>
                  <tr>
                    <td />
                    <td>
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
                    </td>
                    <th scope="row">Name</th>
                    {Array(noteColumnCount)
                      .fill(1)
                      .map((_v, index) => (
                        <td key={index} />
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedChords.map((c, index) => (
                    <ChordTableRow
                      chord={c}
                      highlightNote={highlightNote}
                      previewNote={previewNote}
                      onRemove={() => deselectChord(c)}
                      onMouseOverNote={setPreviewNote}
                      onMouseOutNote={() => setPreviewNote(undefined)}
                      onPressNote={setHighlightNote}
                      columnCount={noteColumnCount}
                      showScaleTones={showScaleTones}
                      key={c}
                    />
                  ))}
                </tbody>
              </Table>
            </Sheet>
          </>
        )}
      </Box>
    </>
  );
};

export default SheetPage;
