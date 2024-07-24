import { Slider, SliderProps } from '@mui/joy';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as tonal from 'tonal';
import { useSettings } from '../providers/SettingsProvider';
import { Enharmonic } from '../providers/settingsContext';

export interface KeySliderProps extends SliderProps {
  onSelectKey?: (key: string) => void;
  keyValue: string;
}

const KeySlider: React.FC<KeySliderProps> = ({
  onSelectKey,
  keyValue,
  ...sliderProps
}) => {
  const [key, setKey] = useState(keyValue);
  const { settings } = useSettings();

  const keys = useMemo(
    () =>
      tonal.Range.chromatic(['C2', 'C3'], {
        sharps: settings.enharmonic === Enharmonic.SHARP,
        pitchClass: true,
      }),
    [settings.enharmonic]
  );

  const marks: { value: number; label: string }[] = useMemo(
    () =>
      keys.map((key, index) => ({
        value: 10 * index,
        label: key as unknown as KeyType,
      })),
    [keys]
  );

  const max = Math.max(...marks.map((m) => m.value));

  const getKeyFromValue = useCallback(
    (value: number) => marks.find((m) => m.value === value)?.label ?? keys[0],
    [keys, marks]
  );

  const getValueFromKey = useCallback(
    (key: string) => marks.find((m) => m.label === key)?.value,
    [marks]
  );

  const onChange = useCallback(
    (_e: Event, value: number | number[]) => {
      const nextKey = getKeyFromValue(value as number);
      setKey?.(nextKey);
    },
    [getKeyFromValue]
  );

  useEffect(() => {
    onSelectKey?.(key);
  }, [key, onSelectKey]);

  const sliderValue = useMemo(
    () => getValueFromKey(keyValue),
    [keyValue, getValueFromKey]
  );

  return (
    <Slider
      aria-label="Key"
      marks={marks}
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
