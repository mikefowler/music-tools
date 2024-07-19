import html2canvas from 'html2canvas';
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

interface FretboardChartProps {
  onRemove?: () => void;
}

const FretboardChart: React.FC<FretboardChartProps> = ({ onRemove }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fretboardRef = useRef<InteractiveFretboardRef>(null);

  const handleSaveImage = async () => {
    if (!containerRef.current) return;

    const canvas = await html2canvas(containerRef.current);
    const jpg = canvas.toDataURL();

    const link = document.createElement('a');
    link.href = jpg;
    link.download = `fretboard-${Date.now().valueOf()}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyImage = async () => {
    if (!containerRef.current) return;

    const canvas = await html2canvas(containerRef.current);
    const jpg = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      });
    });
    navigator.clipboard.write([new ClipboardItem({ 'image/png': jpg })]);
  };

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
              <IconButton onClick={handleSaveImage}>
                <MdOutlineSave />
              </IconButton>
            </Tooltip>

            <Tooltip title="Copy fretboard to clipboard">
              <IconButton onClick={handleCopyImage}>
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
