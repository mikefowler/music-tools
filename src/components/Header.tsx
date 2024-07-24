import {
  Box,
  DialogContent,
  DialogTitle,
  Drawer,
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

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { settings, toggleDrawer } = useSettings();

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
            <Link href="/fretboards">Fretboards</Link>
            <Link href="/chords">Chords</Link>
            <Link href="/sheet">Sheet</Link>
            <Link href="/key">Key</Link>
            <IconButton onClick={() => toggleDrawer()} variant="outlined">
              <FaGear />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      <Drawer open={settings.drawerIsOpen} onClose={() => toggleDrawer(false)}>
        <DialogTitle>Settings</DialogTitle>
        <ModalClose />
        <DialogContent>{/* Placeholder */}</DialogContent>
      </Drawer>
    </Box>
  );
};

export default Header;
