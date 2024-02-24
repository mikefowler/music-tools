import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({}) => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
