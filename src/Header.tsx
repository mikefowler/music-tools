import { Box, Button, IconButton, Stack, SvgIcon, Tooltip } from '@mui/joy';
import React from 'react';
import { FaGuitar } from 'react-icons/fa';
import { MdGridOff, MdGridOn } from 'react-icons/md';

import { useSettings } from './providers/SettingsProvider';

export interface HeaderProps {
  onPressAddFretboard?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPressAddFretboard }) => {
  const { settings, toggleGridView } = useSettings();

  console.log({ settings });

  return (
    <Box component="header" p={4} displayPrint="none">
      <Box display="flex" justifyContent="space-between">
        <Box
          display="flex"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <SvgIcon inheritViewBox component={FaGuitar} size="lg" />
          <Box display="inline-block" sx={{ fontSize: 24 }}>
            Fretboard Diagrams
          </Box>
        </Box>
        <Box>
          <Stack direction="row" spacing={1}>
            {settings.fretboardCount > 1 && (
              <Tooltip title="Display fretboards in grid">
                <IconButton onClick={toggleGridView}>
                  {settings.useGridView ? <MdGridOn /> : <MdGridOff />}
                </IconButton>
              </Tooltip>
            )}
            <Button onClick={onPressAddFretboard}>Add Fretboard</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
