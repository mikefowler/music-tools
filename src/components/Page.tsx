import { Box, Container, Typography } from '@mui/joy';
import React, { PropsWithChildren } from 'react';

export interface PageContainerProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
}

const Page: React.FC<PageContainerProps> = ({ title, subtitle, children }) => {
  return (
    <Container sx={{ py: 4 }}>
      {title && <Typography level="h1">{title}</Typography>}
      {subtitle && <Typography>{subtitle}</Typography>}

      <Box mt={8}>{children}</Box>
    </Container>
  );
};

export default Page;
