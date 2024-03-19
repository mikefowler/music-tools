import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './layouts/Layout';
import ChordsPage from './pages/ChordsPage';
import FretboardPage from './pages/FretboardPage';
import FretboardsPage from './pages/FretboardsPage';
import HomePage from './pages/HomePage';
import SheetPage from './pages/SheetPage';
import AppProvider from './providers/AppProvider';

const container = document.getElementById('app');
const root = createRoot(container!);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/fretboard" element={<FretboardPage />} />
      <Route path="/fretboards" element={<FretboardsPage />} />
      <Route path="/chords" element={<ChordsPage />} />
      <Route path="/sheet" element={<SheetPage />} />
    </Route>,
  ),
);

root.render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>,
);
