import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import FretboardsPage from './pages/FretboardsPage';
import ChordsPage from './pages/ChordsPage';
import SheetPage from './pages/SheetPage';
import AppProvider from './providers/AppProvider';
import KeyPage from './pages/KeyPage';
import ScalesPage from './pages/ScalesPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/fretboards" element={<FretboardsPage />} />
      <Route path="/scales" element={<ScalesPage />} />
      <Route path="/chords" element={<ChordsPage />} />
      <Route path="/sheet" element={<SheetPage />} />
      <Route path="/key" element={<KeyPage />} />
    </Route>
  ),
  {
    basename: import.meta.env.PROD ? '/making/music-tools' : './',
  }
);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
