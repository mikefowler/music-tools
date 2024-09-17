import { Box, Container, Typography } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import React, { PropsWithChildren } from 'react';
import theme from '../utils/theme';

export interface PageContainerProps extends PropsWithChildren {
  title?: string;
  stickyTitle?: boolean;
  subtitle?: string;
}

const Page: React.FC<PageContainerProps> = ({
  title,
  stickyTitle,
  subtitle,
  children,
}) => {
  let titleStyles: SxProps = {};

  if (stickyTitle) {
    titleStyles = {
      ...titleStyles,
      position: 'sticky',
      top: 110,
      background: theme.vars.palette.background.body,
      boxShadow: `0 0 10px 20px ${theme.vars.palette.background.body}`,
    };
  }

  return (
    <Container sx={{ py: 4 }}>
      {title && (
        <Typography level="h1" sx={titleStyles}>
          {title}
        </Typography>
      )}
      {subtitle && <Typography>{subtitle}</Typography>}

      <Box mt={4}>{children}</Box>
    </Container>
  );
};

export default Page;
