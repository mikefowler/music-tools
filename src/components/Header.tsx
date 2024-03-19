import {
  Box,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  FormLabel,
  IconButton,
  Link,
  ModalClose,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/joy';
import React from 'react';
import { FaGear, FaGuitar } from 'react-icons/fa6';

import { useSettings } from '../providers/SettingsProvider';
import KeySlider from './KeySlider';
import ModeSelect from './ModeSelect';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { settings, toggleDrawer, setTonic, setMode } = useSettings();

  return (
    <Box
      component="header"
      p={4}
      displayPrint="none"
      sx={{ position: 'sticky', top: 0, background: 'white' }}
      zIndex={10}
    >
      <Box display="flex" justifyContent="space-between">
        <Link href="/" underline="none" color="neutral">
          <Box
            display="flex"
            gap={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <SvgIcon inheritViewBox component={FaGuitar} size="lg" />
            <Typography fontSize={24}>Music Tools</Typography>
          </Box>
        </Link>
        <Box>
          <Stack direction="row" spacing={4}>
            <Link href="/fretboard">Fretboard</Link>
            <Link href="/chords">Chords</Link>
            <Link href="/sheet">Sheet</Link>
            <IconButton onClick={() => toggleDrawer()} variant="outlined">
              <FaGear />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      <Drawer open={settings.drawerIsOpen} onClose={() => toggleDrawer(false)}>
        <DialogTitle>Settings</DialogTitle>
        <ModalClose />
        <DialogContent>
          <Stack useFlexGap spacing={8} sx={{ p: 3 }}>
            <FormControl>
              <FormLabel
                id="select-tonic-label"
                htmlFor="select-tonic-input"
                sx={{ margin: '0 auto', fontWeight: 'bold' }}
              >
                Tonic
              </FormLabel>
              <KeySlider
                keyValue={settings.tonic}
                onSelectKey={setTonic}
                orientation="horizontal"
                slotProps={{
                  input: {
                    id: 'select-tonic-input',
                  },
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                id="select-mode-label"
                htmlFor="select-mode-input"
                sx={{ margin: '0 auto', fontWeight: 'bold', mb: 2 }}
              >
                Mode
              </FormLabel>
              <ModeSelect
                value={settings.mode}
                onSelectMode={setMode}
                slotProps={{ button: { id: 'select-mode-select' } }}
              />
            </FormControl>
          </Stack>
        </DialogContent>
      </Drawer>
    </Box>
  );
};

export default Header;
