import { Select, Option, useColorScheme } from '@mui/joy';
import React, { useEffect, useState } from 'react';

export interface ColorSchemeToggleProps {}

const ColorSchemeToggle: React.FC<ColorSchemeToggleProps> = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(_event, newMode) => {
        setMode(newMode);
      }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
};

export default ColorSchemeToggle;
