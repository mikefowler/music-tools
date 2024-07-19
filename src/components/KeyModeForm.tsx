import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  StackProps,
  Switch,
} from '@mui/joy';
import React from 'react';
import { useSettings } from '../providers/SettingsProvider';
import KeySlider from './KeySlider';
import ModeSelect from './ModeSelect';
import { Enharmonic } from '../providers/settingsContext';

export interface KeyModeFormProps {
  direction?: StackProps['direction'];
}

const KeyModeForm: React.FC<KeyModeFormProps> = ({ direction }) => {
  const { settings, setTonic, setMode, setEnharmonic } = useSettings();

  const checked = settings.enharmonic === Enharmonic.SHARP;

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
            <Box ml={4}>
              <Switch
                color={'neutral'}
                slotProps={{ input: { 'aria-label': 'dark mode' } }}
                startDecorator={Enharmonic.FLAT}
                endDecorator={Enharmonic.SHARP}
                checked={checked}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEnharmonic(
                    event.target.checked ? Enharmonic.SHARP : Enharmonic.FLAT
                  )
                }
              />
            </Box>
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
