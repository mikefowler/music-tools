import '@fontsource/inter';

import { Box, Button, IconButton, Tooltip } from '@mui/joy';
import React, { useState } from 'react';

import { Fretboard } from '@mikefowler/fretboard';
import { MdGridOff, MdGridOn } from 'react-icons/md';
import EditableText from '../EditableText';

const FretboardsPage: React.FC = () => {
  const [fretboardCount, setFretboardCount] = useState(1);
  const [useGrid, setUseGrid] = useState(false);

  const toggleGrid = () => setUseGrid((previous) => !previous);
  const addFretboard = () => setFretboardCount((previous) => previous + 1);

  return (
    <>
      {fretboardCount > 1 && (
        <Tooltip title="Display fretboards in grid">
          <IconButton onClick={toggleGrid}>
            {useGrid ? <MdGridOn /> : <MdGridOff />}
          </IconButton>
        </Tooltip>
      )}
      {fretboardCount > 0 && (
        <Button onClick={addFretboard}>Add Fretboard</Button>
      )}

      {fretboardCount === 0 && (
        <Box textAlign="center" pt={8}>
          <Box mb={3}>Click on "Add Fretboard" to get started.</Box>

          <Button size="lg" onClick={addFretboard}>
            Add Fretboard
          </Button>
        </Box>
      )}

      {fretboardCount > 0 && (
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
            {Array(fretboardCount)
              .fill(0)
              .map((_, i) => (
                <Fretboard key={i} height={300} />
              ))}
          </Box>
        </>
      )}
    </>
  );
};

export default FretboardsPage;
