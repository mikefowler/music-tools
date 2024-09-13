import React from 'react';
import {
  FormControl,
  FormLabel,
  Slider,
  SliderProps,
  Stack,
  Switch,
} from '@mui/joy';
import MetronomeAudio from './MetronomeAudio';

export interface MetronomeProps {}

const Metronome: React.FC<MetronomeProps> = () => {
  const [metronomeOn, setMetronomeOn] = React.useState(false);
  const [tempo, setTempo] = React.useState(120);
  const [displayTempo, setDisplayTempo] = React.useState(120);

  const handleChange: SliderProps['onChange'] = (_e, value) => {
    setDisplayTempo(value as number);
  };

  const handleChangeCommitted: SliderProps['onChangeCommitted'] = (
    _e,
    value
  ) => {
    setMetronomeOn((prev) => {
      setDisplayTempo(value as number);
      setTempo(value as number);

      // If the metronome was already on, leave it on
      if (prev) return true;
      // And if it was already off, leave it off
      else return false;
    });
  };

  return (
    <>
      <Stack direction="row">
        <FormControl>
          <FormLabel sx={{ visibility: 'hidden' }}>On</FormLabel>
          <Switch onChange={(e) => setMetronomeOn(e.target.checked)} />
        </FormControl>
        <FormControl sx={{ flex: 4 }}>
          <FormLabel sx={{ visibility: 'hidden' }}>Tempo</FormLabel>
          <Slider
            aria-label="Tempo"
            value={displayTempo}
            max={300}
            valueLabelDisplay="on"
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
          />
        </FormControl>
      </Stack>
      <MetronomeAudio on={metronomeOn} tempo={tempo} />
    </>
  );
};

export default Metronome;
