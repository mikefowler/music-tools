import { Slider, SliderProps } from '@mui/joy';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as tonal from 'tonal';
import { useSettings } from '../providers/SettingsProvider';
import { Enharmonic } from '../providers/settingsContext';
import * as enharmonicUtils from '../utils/enharmonic';
export interface KeySliderProps extends Omit<SliderProps, 'value'> {
  onSelectKey?: (key: string) => void;
  selectedKey: string;
}

const KeySlider: React.FC<KeySliderProps> = ({
  onSelectKey,
  selectedKey,
  ...sliderProps
}) => {
  const { settings } = useSettings();

  const keys = useMemo(
    () =>
      tonal.Range.chromatic(['C2', 'B2'], {
        sharps: settings.enharmonic === Enharmonic.SHARP,
        pitchClass: true,
      }),
    [settings.enharmonic]
  );

  const marks: { value: number; label: string }[] = useMemo(() => {
    return [...Array(11).keys()].map((value) => ({
      value,
      label: keys[value],
    }));
  }, [keys]);

  const keyToValue = useCallback(
    (key: string) => {
      const mark = marks.find((mark) => mark.label === key);

      return mark?.value ?? 0;
    },
    [marks]
  );

  const [value, setValue] = useState(keyToValue(selectedKey));

  const max = Math.max(...marks.map((m) => m.value));

  const handleChange = useCallback(
    (value: number) => {
      const key = marks[value].label;

      setValue(value);
      onSelectKey?.(key);
    },
    [marks, onSelectKey]
  );

  useEffect(() => {
    const key = marks[value].label;

    onSelectKey?.(key);
  }, [settings.enharmonic, marks, onSelectKey, value]);

  return (
    <Slider
      aria-label="Key"
      marks={marks}
      value={value}
      step={1}
      orientation="vertical"
      max={max}
      onChange={(_event, value) => handleChange(value as number)}
      valueLabelFormat={(label) => enharmonicUtils.replaceWithUnicode(label)}
      {...sliderProps}
    />
  );
};

export default KeySlider;
