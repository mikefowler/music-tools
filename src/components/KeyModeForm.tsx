import { Box, FormControl, FormLabel, Stack, StackProps } from '@mui/joy';
import React from 'react';
import { useSettings } from '../providers/SettingsProvider';
import KeySlider from './KeySlider';
import ModeSelect from './ModeSelect';

export interface KeyModeFormProps {
  direction?: StackProps['direction'];
}

const KeyModeForm: React.FC<KeyModeFormProps> = ({ direction }) => {
  const { settings, setTonic, setMode } = useSettings();

  return (
    <Stack direction={direction} useFlexGap spacing={8} width="100%">
      <Box flex={1}>
        <FormControl>
          <FormLabel
            id="select-tonic-label"
            htmlFor="select-tonic-input"
            sx={{ margin: '0 auto', fontWeight: 'bold' }}
          >
            Tonic
          </FormLabel>
          <KeySlider
            keyValue={settings.tonic}
            onSelectKey={setTonic}
            orientation="horizontal"
            slotProps={{
              input: {
                id: 'select-tonic-input',
              },
            }}
          />
        </FormControl>
      </Box>

      <Box flex={1}>
        <FormControl>
          <FormLabel
            id="select-mode-label"
            htmlFor="select-mode-input"
            sx={{ margin: '0 auto', fontWeight: 'bold', mb: 2 }}
          >
            Mode
          </FormLabel>
          <ModeSelect
            value={settings.mode}
            onSelectMode={setMode}
            slotProps={{ button: { id: 'select-mode-select' } }}
          />
        </FormControl>
      </Box>
    </Stack>
  );
};

export default KeyModeForm;
