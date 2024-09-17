import InteractiveFretboard, {
  InteractiveFretboardRef,
} from './InteractiveFretboard';
import { useRef } from 'react';
import { Box, IconButton, Stack, Tooltip } from '@mui/joy';
import {
  MdOutlineFileCopy,
  MdOutlineRestartAlt,
  MdOutlineSave,
  MdClose,
} from 'react-icons/md';
import EditableText from '../EditableText';
import useScreenshot from '../hooks/useScreenshot';

interface FretboardChartProps {
  onRemove?: () => void;
}

const FretboardChart: React.FC<FretboardChartProps> = ({ onRemove }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fretboardRef = useRef<InteractiveFretboardRef>(null);
  const fretboardScreenshot = useScreenshot(containerRef);

  const handleReset = () => {
    fretboardRef.current?.reset();
  };

  return (
    <Box sx={{ padding: 0 }}>
      <Box display="flex" justifyContent="space-between" marginX={3}>
        <Box>
          <EditableText autoFocus initialValue="Diagram title" />
        </Box>
        <Box displayPrint="none">
          <Stack direction="row">
            <Tooltip title="Download fretboard as image">
              <IconButton onClick={() => fretboardScreenshot.save()}>
                <MdOutlineSave />
              </IconButton>
            </Tooltip>

            <Tooltip title="Copy fretboard to clipboard">
              <IconButton onClick={() => fretboardScreenshot.copy()}>
                <MdOutlineFileCopy />
              </IconButton>
            </Tooltip>

            <Tooltip title="Clear all notes">
              <IconButton onClick={handleReset}>
                <MdOutlineRestartAlt />
              </IconButton>
            </Tooltip>

            <Tooltip title="Remove fretboard">
              <IconButton onClick={onRemove}>
                <MdClose />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          margin: 0,
        }}
      >
        <div ref={containerRef}>
          <InteractiveFretboard height={300} ref={fretboardRef} />
        </div>
      </Box>
    </Box>
  );
};

export default FretboardChart;
