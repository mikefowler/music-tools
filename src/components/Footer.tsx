import { Box } from '@mui/joy';
import React from 'react';
import KeyModeForm from './KeyModeForm';

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <Box
      component="footer"
      display="flex"
      position="sticky"
      bottom={0}
      p={2}
      sx={(theme) => ({
        background: theme.vars.palette.background.surface,
        boxShadow: theme.shadow.xl,
        '--joy-shadowRing': '0 -10px 20px rgba(0, 0, 0, 0.05)',
      })}
    >
      <KeyModeForm direction="row" />
    </Box>
  );
};

export default Footer;
