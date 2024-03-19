import { Box } from '@mui/joy';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({}) => {
  return (
    <>
      <Header />

      <Box component="main" px={4}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
