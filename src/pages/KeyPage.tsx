import React, { useMemo, useRef, useState } from 'react';
import Page from '../components/Page';
import { Chip, Sheet, Stack, Table, Tooltip, Typography } from '@mui/joy';
import { useSettings } from '../providers/SettingsProvider';
import * as tonal from 'tonal';
import { Fretboard, FretboardRef, Note } from '@mikefowler/fretboard';
import { FaCheck } from 'react-icons/fa6';
import * as enharmonicUtils from '../utils/enharmonic';

export interface KeyPageProps {}

const KeyPage: React.FC<KeyPageProps> = () => {
  const { settings } = useSettings();
  const fretboardRef = useRef<FretboardRef>(null);
  const chordFretboardRef = useRef<FretboardRef>(null);
  const [selectedChord, setSelectedChord] = useState<string>();
  const [selectedNote, setSelectedNote] = useState<string>();
  const [showChromatics, setShowChromatics] = useState(false);
  const title = useMemo(
    () => `${settings.tonic} ${settings.mode}`,
    [settings.tonic, settings.mode]
  );
  const scale = tonal.Scale.get(title);

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

  const scalePlacements = fretboardRef.current
    ? fretboardRef.current.system.scale({
        type: settings.mode,
        root: settings.tonic,
      }).placements
    : [];

  const chordMeta = selectedChord ? tonal.Chord.get(selectedChord) : null;

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

  const chordChromaticPlacements =
    fretboardRef.current?.system.positions.filter(
      (position) =>
        !chordPlacements.some(
          (p) => p.fret === position.fret && p.string === position.string
        )
    );

  const handleShowChromatics = () => setShowChromatics((prev) => !prev);

  return (
    <Page>
      <Typography level="h1" mb={4}>
        {title}
      </Typography>

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
            fill={p.note.name === settings.tonic ? 'black' : 'white'}
            textFill={p.note.name === settings.tonic ? 'white' : 'black'}
          />
        ))}
      </Fretboard>

      <Typography level="h3" component="h2" mt={4} mb={2}>
        Chords
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
          <Typography level="h4" component="h3" mt={4} mb={2}>
            Notes
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
                  fill={isSelected ? 'black' : 'white'}
                  textFill={isSelected ? 'white' : 'black'}
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
                  fill={p.note.name === settings.tonic ? 'black' : 'white'}
                  textFill={p.note.name === settings.tonic ? 'white' : 'black'}
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
