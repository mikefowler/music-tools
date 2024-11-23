import { Option, Select, Stack } from '@mui/joy';
import { useEffect } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormProps,
  useWatch,
} from 'react-hook-form';
import * as tonal from 'tonal';
import startCase from 'lodash/startCase';

const scaleNames = tonal.Scale.names();

export interface ScalesFormValues {
  type?: string;
}

const defaultValues: Partial<ScalesFormValues> = {
  type: scaleNames[0],
};

interface ScalesFormProps extends UseFormProps<ScalesFormValues> {
  onChange: SubmitHandler<ScalesFormValues>;
}

const ScalesForm: React.FC<ScalesFormProps> = ({ onChange, ...formProps }) => {
  const { handleSubmit, control } = useForm<ScalesFormValues>({
    defaultValues,
    ...formProps,
  });

  const watch = useWatch<ScalesFormValues>({ control });

  useEffect(() => {
    onChange(watch);
  }, [onChange, watch]);

  return (
    <form onChange={handleSubmit(onChange)}>
      <Stack direction="row">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select {...field} onChange={(_e, value) => field.onChange(value)}>
              {scaleNames.map((scaleName) => (
                <Option value={scaleName}>{startCase(scaleName)}</Option>
              ))}
            </Select>
          )}
        />
      </Stack>
    </form>
  );
};

export default ScalesForm;
