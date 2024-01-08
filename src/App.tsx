import '@fontsource/inter';

import { Box } from '@mui/joy';
import React from 'react';

import EditableText from './EditableText';
import Fretboard from './Fretboard';
import Header from './Header';
import { useSettings } from './providers/SettingsProvider';

const App: React.FC = () => {
  const { settings, addFretboard } = useSettings();

  return (
    <>
      <Header onPressAddFretboard={addFretboard} />

      <Box display="flex" flexDirection="row" justifyContent="center">
        <EditableText
          initialValue="Title"
          sx={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}
        />
      </Box>
      <Box
        display={settings.useGridView ? 'grid' : 'block'}
        gridTemplateColumns="repeat(auto-fit, minmax(min(100%/2, max(64px, 100%/2)), 1fr))"
      >
        {Array(settings.fretboardCount)
          .fill(0)
          .map((_, i) => (
            <Fretboard id={`fretboard-${i}`} key={i} editable />
          ))}
      </Box>
    </>
  );
};

export default App;
