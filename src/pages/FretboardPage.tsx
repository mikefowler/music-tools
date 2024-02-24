import '@fontsource/inter';

import { Box, Button, IconButton, Tooltip } from '@mui/joy';
import React from 'react';

import { MdGridOff, MdGridOn } from 'react-icons/md';
import EditableText from '../EditableText';
import Fretboard from '../Fretboard';
import { useSettings } from '../providers/SettingsProvider';

const FretboardPage: React.FC = () => {
  const { settings, addFretboard, toggleGridView } = useSettings();

  return (
    <>
      {settings.fretboardCount > 1 && (
        <Tooltip title="Display fretboards in grid">
          <IconButton onClick={toggleGridView}>
            {settings.useGridView ? <MdGridOn /> : <MdGridOff />}
          </IconButton>
        </Tooltip>
      )}
      {settings.fretboardCount > 0 && (
        <Button onClick={addFretboard}>Add Fretboard</Button>
      )}

      {settings.fretboardCount === 0 && (
        <Box textAlign="center" pt={8}>
          <Box mb={3}>Click on "Add Fretboard" to get started.</Box>

          <Button size="lg" onClick={addFretboard}>
            Add Fretboard
          </Button>
        </Box>
      )}

      {settings.fretboardCount > 0 && (
        <>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <EditableText
              initialValue="Sheet title"
              sx={{ fontWeight: 'light', fontSize: 24, textAlign: 'center' }}
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
      )}
    </>
  );
};

export default FretboardPage;
