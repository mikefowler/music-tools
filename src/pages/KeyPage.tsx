import React, { useEffect, useRef, useState } from 'react';
import Page from '../components/Page';
import {
  ButtonGroup,
  Chip,
  IconButton,
  Sheet,
  Stack,
  Table,
  Tooltip,
  Typography,
} from '@mui/joy';
import { useSettings } from '../providers/SettingsProvider';
import * as tonal from 'tonal';
import {
  Fretboard,
  FretboardRef,
  Note,
  ScaleNotePlacement,
} from '@mikefowler/fretboard';
import { FaCheck } from 'react-icons/fa6';
import * as enharmonicUtils from '../utils/enharmonic';
import { MdOutlineFileCopy } from 'react-icons/md';
import useScreenshot from '../hooks/useScreenshot';

export interface KeyPageProps {}

const KeyPage: React.FC<KeyPageProps> = () => {
  const { settings } = useSettings();

  const fretboardRef = useRef<FretboardRef>(null);
  const chordFretboardRef = useRef<FretboardRef>(null);
  const fretboardContainerRef = useRef<HTMLDivElement>(null);

  const [selectedChord, setSelectedChord] = useState<string>();
  const [selectedNote, setSelectedNote] = useState<string>();
  const [showChromatics, setShowChromatics] = useState(false);
  const [scalePlacements, setScalePlacements] = useState<ScaleNotePlacement[]>(
    []
  );
  const [chordPlacements, setChordPlacements] = useState<ScaleNotePlacement[]>(
    []
  );

  const scale = tonal.Scale.get(`${settings.tonic} ${settings.mode}`);

  const title = `${scale.name} ${
    scale.aliases.length ? `(${scale.aliases.join(', ')})` : ''
  }`;

  const numerals = scale.intervals.map(
    (i) => tonal.RomanNumeral.get(tonal.Interval.get(i)).name
  );

  const triads = tonal.Mode.triads(settings.mode, settings.tonic);
  const sevenths = tonal.Mode.seventhChords(settings.mode, settings.tonic);

  const isChordSelected = (chord: string) => chord === selectedChord;
  const isNoteSelected = (note: string) => note === selectedNote;

  const handleSelectChord = (chord: string) => {
    setSelectedNote(undefined);
    setSelectedChord((prev) => {
      if (prev === chord) return undefined;

      return chord;
    });
  };

  const handleSelectNote = (note: string) => {
    setSelectedNote((prev) => {
      if (prev === note) return undefined;

      return note;
    });
  };

  useEffect(() => {
    const placements = fretboardRef.current
      ? fretboardRef.current.system.scale({
          type: settings.mode,
          root: settings.tonic,
        }).placements
      : [];

    setSelectedChord(undefined);
    setChordPlacements([]);
    setScalePlacements(placements);
  }, [settings.mode, settings.tonic]);

  useEffect(() => {
    const chordNotePlacements =
      selectedChord && chordFretboardRef.current
        ? chordFretboardRef.current.system.chord({
            name: selectedChord,
          })
        : [];

    const chordPlacements = scalePlacements.filter((placement) => {
      return chordNotePlacements.some(
        (chordPlacement) =>
          chordPlacement.fret === placement.fret &&
          chordPlacement.string === placement.string
      );
    });

    setChordPlacements(chordPlacements);
  }, [scalePlacements, selectedChord]);

  const chordMeta = selectedChord ? tonal.Chord.get(selectedChord) : null;

  const chordChromaticPlacements =
    fretboardRef.current?.system.positions.filter(
      (position) =>
        !chordPlacements.some(
          (p) => p.fret === position.fret && p.string === position.string
        )
    );

  const handleShowChromatics = () => setShowChromatics((prev) => !prev);

  const fretboardImage = useScreenshot(fretboardContainerRef);

  return (
    <Page title={title} stickyTitle>
      <Typography>
        <strong>Notes</strong>: {scale.notes.join(' - ')}
      </Typography>
      <Typography>
        <strong>Intervals</strong>: {scale.intervals.join(', ')}
      </Typography>

      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <ButtonGroup>
          <Tooltip title="Copy fretboard to clipboard">
            <IconButton size="sm" onClick={() => fretboardImage.copy()}>
              <MdOutlineFileCopy />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Stack>

      <div ref={fretboardContainerRef}>
        <Fretboard
          ref={fretboardRef}
          height={200}
          markerSize={1.3}
          showFretNumbers
        >
          {scalePlacements.map((p) => (
            <Note
              key={`${p.string}-${p.fret}`}
              fret={p.fret}
              string={p.string}
              label={p.note.name}
              color={p.note.name === settings.tonic ? 'black' : 'white'}
              textColor={p.note.name === settings.tonic ? 'white' : 'black'}
            />
          ))}
        </Fretboard>
      </div>

      <Typography level="h3" component="h2" mt={4} mb={1}>
        Chords
      </Typography>

      <Typography level="title-sm" component="h3" mb={2}>
        Select any chord to display its notes on the fretboard.
      </Typography>

      <Sheet variant="soft" sx={{ p: 2 }}>
        <Table variant="soft" size="lg">
          <thead>
            <tr>
              {numerals.map((numeral, i) => {
                const semitones = tonal.Interval.semitones(scale.intervals[i]);

                return (
                  <th key={numeral}>
                    <Tooltip
                      title={i === 0 ? 'Root' : `${semitones} half-steps`}
                      arrow
                    >
                      <Chip variant="outlined">{numeral}</Chip>
                    </Tooltip>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {triads.map((i) => (
                <td key={i}>
                  <Chip
                    variant="plain"
                    onClick={() => handleSelectChord(i)}
                    startDecorator={isChordSelected(i) && <FaCheck />}
                  >
                    {i}
                  </Chip>
                </td>
              ))}
            </tr>
            <tr>
              {sevenths.map((i) => (
                <td key={i}>
                  <Chip
                    variant="plain"
                    onClick={() => handleSelectChord(i)}
                    startDecorator={isChordSelected(i) && <FaCheck />}
                  >
                    {i}
                  </Chip>
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </Sheet>

      {chordMeta && (
        <>
          <Typography level="h4" component="h3" mt={4} mb={1}>
            Notes
          </Typography>

          <Typography level="title-sm" mb={2}>
            Select any note to highlight it on the fretboard.
          </Typography>

          <Stack direction="row" gap="8px">
            {chordMeta?.notes.map((note) => (
              <Chip
                variant="outlined"
                onClick={() => handleSelectNote(note)}
                startDecorator={isNoteSelected(note) && <FaCheck />}
              >
                {note}
              </Chip>
            ))}
          </Stack>

          <Typography level="h4" component="h3" mt={4} mb={2}>
            Fretboard
          </Typography>

          <Chip
            onClick={handleShowChromatics}
            startDecorator={showChromatics && <FaCheck />}
          >
            Show chromatics?
          </Chip>

          <Fretboard
            ref={chordFretboardRef}
            height={200}
            markerSize={1.3}
            showFretNumbers
          >
            {chordPlacements.map((p) => {
              const isSelected = enharmonicUtils
                .noteNames(p.note)
                .includes(selectedNote ?? '');

              return (
                <Note
                  key={`${p.string}-${p.fret}`}
                  fret={p.fret}
                  string={p.string}
                  label={`${p.note.letter}${p.note.acc}`}
                  color={isSelected ? 'black' : 'white'}
                  textColor={isSelected ? 'white' : 'black'}
                />
              );
            })}

            {showChromatics &&
              chordChromaticPlacements?.map((p) => (
                <Note
                  key={`${p.string}-${p.fret}`}
                  fret={p.fret}
                  string={p.string}
                  label={`${p.note.letter}${p.note.acc}`}
                  color={p.note.name === settings.tonic ? 'black' : 'white'}
                  textColor={p.note.name === settings.tonic ? 'white' : 'black'}
                  opacity={0.1}
                />
              ))}
          </Fretboard>
        </>
      )}
    </Page>
  );
};

export default KeyPage;
