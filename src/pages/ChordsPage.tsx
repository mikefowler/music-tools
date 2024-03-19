import { Box, Stack } from '@mui/joy';
import React, { useMemo } from 'react';
import ChordBox from '../components/ChordBox';
import { useSettings } from '../providers/SettingsProvider';
import Scale from '../utils/Scale';

export interface ChordsPageProps {}

const ChordsPage: React.FC<ChordsPageProps> = ({}) => {
  const {
    settings: { tonic, mode },
  } = useSettings();

  const progression = useMemo(
    () =>
      new Scale({
        tonic,
        mode,
      }),
    [tonic, mode],
  );

  const sequence = progression.sequence([1, 6, 4, 2, 5, 3]);
  const width = '15vw';

  return (
    <div>
      <Stack alignItems="center" gap={5}>
        <Stack direction="row">
          {sequence.map((s) =>
            s.secondaryDominant ? (
              <ChordBox
                width={width}
                name={s.secondaryDominant ?? ''}
                numeral=""
              />
            ) : (
              <Box width={width} />
            ),
          )}
        </Stack>

        <Stack direction="row">
          {sequence.map((s) => (
            <ChordBox
              width={width}
              name={s.tonic ?? ''}
              type={s.quality}
              degree={s.degree}
            />
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default ChordsPage;
