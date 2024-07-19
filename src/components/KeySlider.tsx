import { Slider, SliderProps } from '@mui/joy';
import React from 'react';
import * as tonal from 'tonal';
import { useSettings } from '../providers/SettingsProvider';
import { Enharmonic } from '../providers/settingsContext';

const keys = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
] as const;

export type KeyType = (typeof keys)[number];

const marks: { value: number; label: KeyType }[] = keys.map((key, index) => ({
  value: 10 * index,
  label: key as unknown as KeyType,
}));

const max = Math.max(...marks.map((m) => m.value));

const getKeyFromValue = (value: number): KeyType =>
  marks.find((m) => m.value === value)?.label ?? keys[0];

const getValueFromKey = (key: string) =>
  marks.find((m) => m.label === key)?.value;

export interface KeySliderProps extends SliderProps {
  onSelectKey?: (key: KeyType) => void;
  keyValue: string;
}

const KeySlider: React.FC<KeySliderProps> = ({
  onSelectKey,
  keyValue,
  ...sliderProps
}) => {
  const { settings } = useSettings();

  const marksWithEnharmonics = marks.map((mark) => ({
    ...mark,
    label:
      settings.enharmonic !== Enharmonic.SHARP
        ? mark.label
        : tonal.Note.enharmonic(mark.label),
  }));

  const onChange: SliderProps['onChange'] = (_e, value) => {
    const key = getKeyFromValue(value as number);
    onSelectKey?.(key);
  };

  const sliderValue = getValueFromKey(keyValue);

  return (
    <Slider
      aria-label="Key"
      marks={marksWithEnharmonics}
      value={sliderValue}
      step={10}
      orientation="vertical"
      max={max}
      onChange={onChange}
      {...sliderProps}
    />
  );
};

export default KeySlider;
