import { Box } from '@mui/joy';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({}) => {
  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
      <Header />

      <Box component="main" px={4} flex={1}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
