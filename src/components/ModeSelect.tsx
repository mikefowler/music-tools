import { Option, Select, SelectProps } from '@mui/joy';
import upperFirst from 'lodash/upperFirst';
import React from 'react';
import { Mode } from 'tonal';

type TypedSelectProps = SelectProps<{}, false>;

export interface ModeSelectProps extends TypedSelectProps {
  onSelectMode?: (mode: string) => void;
}

const modes = Mode.all();

const ModeSelect: React.FC<ModeSelectProps> = ({
  onSelectMode,
  ...selectProps
}) => {
  const onChange: TypedSelectProps['onChange'] = (e, value) => {
    if (value) onSelectMode?.(String(value));
  };

  return (
    <Select onChange={onChange} {...selectProps}>
      {modes.map((m) => (
        <Option key={m.name} value={m.name}>
          {upperFirst(m.name)}
        </Option>
      ))}
    </Select>
  );
};

export default ModeSelect;
