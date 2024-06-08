import '@fontsource/inter';

import { Box, Button, IconButton, Tooltip } from '@mui/joy';
import React, { useState } from 'react';

import { MdGridOff, MdGridOn } from 'react-icons/md';
import EditableText from '../EditableText';
import FretboardChart from '../components/FretboardChart';

const FretboardsPage: React.FC = () => {
  const [fretboards, setFretboards] = useState<Set<string>>(new Set());
  const [useGrid, setUseGrid] = useState(false);

  const toggleGrid = () => setUseGrid((previous) => !previous);

  const addFretboard = () =>
    setFretboards((previous) => {
      const newFretboards = new Set(previous);
      newFretboards.add(crypto.randomUUID());
      return newFretboards;
    });

  const removeFretboard = (id: string) =>
    setFretboards((previous) => {
      const newFretboards = new Set(previous);
      newFretboards.delete(id);
      return newFretboards;
    });

  return (
    <>
      {fretboards.size > 1 && (
        <Tooltip title="Display fretboards in grid">
          <IconButton onClick={toggleGrid}>
            {useGrid ? <MdGridOn /> : <MdGridOff />}
          </IconButton>
        </Tooltip>
      )}

      {fretboards.size > 0 && (
        <Button onClick={addFretboard}>Add Fretboard</Button>
      )}

      {fretboards.size === 0 && (
        <Box textAlign="center" pt={8}>
          <Box mb={3}>Click on "Add Fretboard" to get started.</Box>

          <Button size="lg" onClick={addFretboard}>
            Add Fretboard
          </Button>
        </Box>
      )}

      {fretboards.size > 0 && (
        <>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <EditableText
              initialValue="Sheet title"
              sx={{ fontWeight: 'light', fontSize: 24, textAlign: 'center' }}
            />
          </Box>
          <Box
            display={useGrid ? 'grid' : 'block'}
            gridTemplateColumns="repeat(auto-fit, minmax(min(100%/2, max(64px, 100%/2)), 1fr))"
          >
            {Array.from(fretboards).map((f) => (
              <FretboardChart key={f} onRemove={() => removeFretboard(f)} />
            ))}
          </Box>
        </>
      )}
    </>
  );
};

export default FretboardsPage;
