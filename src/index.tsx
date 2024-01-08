import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import AppProvider from './providers/AppProvider';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
