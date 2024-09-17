import React, { useEffect, useMemo, useState } from 'react';
import Page from '../components/Page';
import {
  Fretboard,
  FretboardSystem,
  FretboardPosition,
} from '@mikefowler/fretboard';
import ScalesForm, { ScalesFormValues } from '../components/ScalesForm';
import { useSettings } from '../providers/SettingsProvider';

export interface ScalesPageProps {}

const ScalesPage: React.FC<ScalesPageProps> = () => {
  const [formValues, setFormValues] = useState<ScalesFormValues>();
  const [positions, setPositions] = useState<FretboardPosition[]>([]);
  const { settings } = useSettings();

  const system = useMemo(() => new FretboardSystem(), []);

  useEffect(() => {
    const placements: FretboardPosition[] = system
      .scale({
        type: formValues?.type ?? 'major',
        root: settings.tonic,
      })
      .placements.map((position) => ({
        ...position,
        label: position.note.name,
        color: position.degree === 1 ? 'white' : 'darkgrey',
        textColor: position.degree === 1 ? 'black' : 'white',
        borderColor: position.degree === 1 ? 'black' : 'white',
        borderWidth: position.degree === 1 ? '2' : '0',
      }));

    setPositions(placements);
  }, [formValues, settings.tonic, system]);

  return (
    <Page title="Scales">
      <ScalesForm values={formValues} onChange={setFormValues} />
      <Fretboard system={system} positions={positions} />
    </Page>
  );
};

export default ScalesPage;
