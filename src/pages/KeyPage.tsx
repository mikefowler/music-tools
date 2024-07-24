import React, { useEffect, useRef, useState } from 'react';
import Page from '../components/Page';
import { Chip, Sheet, Table, Tooltip, Typography } from '@mui/joy';
import { useSettings } from '../providers/SettingsProvider';
import * as tonal from 'tonal';
import {
  Fretboard,
  FretboardRef,
  Note,
  ScalePlacement,
} from '@mikefowler/fretboard';

export interface KeyPageProps {}

const KeyPage: React.FC<KeyPageProps> = () => {
  const { settings } = useSettings();
  const fretboardRef = useRef<FretboardRef>(null);
  const [placements, setPlacements] = useState<ScalePlacement[]>([]);

  const title = `${settings.tonic} ${settings.mode}`;
  const scale = tonal.Scale.get(title);

  const numerals = scale.intervals.map(
    (i) => tonal.RomanNumeral.get(tonal.Interval.get(i)).name
  );

  const triads = tonal.Mode.triads(settings.mode, settings.tonic);
  const sevenths = tonal.Mode.seventhChords(settings.mode, settings.tonic);

  useEffect(() => {
    if (!fretboardRef.current) return;

    const scalePlacements = fretboardRef.current.system.scale({
      type: settings.mode,
      root: settings.tonic,
    });

    if (scalePlacements.placements) {
      setPlacements(scalePlacements.placements);
    }
  }, [settings.mode, settings.tonic]);

  console.log(tonal.ScaleType.get(`${settings.mode}`));

  return (
    <Page>
      <Typography level="h1" mb={4}>
        {title}
      </Typography>

      <Fretboard ref={fretboardRef} height={200} markerSize={1.3}>
        {placements.map((p) => (
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
                <td key={i}>{i}</td>
              ))}
            </tr>
            <tr>
              {sevenths.map((i) => (
                <td key={i}>{i}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </Sheet>
    </Page>
  );
};

export default KeyPage;
