import { Box, Link, Stack, SvgIcon } from '@mui/joy';
import React from 'react';
import { FaGuitar } from 'react-icons/fa';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
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
            <Box display="inline-block" sx={{ fontSize: 24 }}>
              Music Tools
            </Box>
          </Box>
        </Link>
        <Box>
          <Stack direction="row" spacing={1}>
            <Link href="/fretboard">Fretboard</Link>
            <Link href="/chords">Chords</Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
