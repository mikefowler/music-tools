import React from 'react';
import { FormControl, FormLabel, Slider, SliderProps, Switch } from '@mui/joy';
import MetronomeAudio from './MetronomeAudio';

export interface MetronomeProps {}

const Metronome: React.FC<MetronomeProps> = () => {
  const [metronomeOn, setMetronomeOn] = React.useState(false);
  const [tempo, setTempo] = React.useState(120);
  const [displayTempo, setDisplayTempo] = React.useState(120);

  const handleChange: SliderProps['onChange'] = (_e, value) => {
    setMetronomeOn(false);
    setDisplayTempo(value as number);
  };

  const handleChangeCommitted: SliderProps['onChangeCommitted'] = (
    _e,
    value
  ) => {
    setDisplayTempo(value as number);
    setTempo(value as number);
    setMetronomeOn(true);
  };

  return (
    <>
      <FormControl>
        <FormLabel>On</FormLabel>
        <Switch onChange={(e) => setMetronomeOn(e.target.checked)} />
      </FormControl>
      <FormControl>
        <FormLabel>Tempo</FormLabel>
        <Slider
          aria-label="Tempo"
          value={displayTempo}
          max={300}
          valueLabelDisplay="on"
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
        />
      </FormControl>
      <MetronomeAudio on={metronomeOn} tempo={tempo} />
    </>
  );
};

export default Metronome;
