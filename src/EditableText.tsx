import React, { useEffect, useRef, useState } from 'react';

import { Box, Input } from '@mui/joy';
import { SxProps, Theme } from '@mui/material/styles';

export interface EditableTextProps {
  initialValue?: string;
  sx?: SxProps<Theme>;
  autoFocus?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  initialValue = '',
  sx,
  autoFocus = false,
}) => {
  const [isEditing, setIsEditing] = useState(autoFocus);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.select();
    }
  }, []);

  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.select();
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue(e.target.value);

  return (
    <Box
      onClick={handleClick}
      sx={[
        {
          fontSize: 16,
          color: 'black',
          borderRadius: 3,
          minWidth: 200,

          '&:hover': {
            background: 'rgba(0, 0, 0, 0.05)',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {isEditing && (
        <Input
          slotProps={{ input: { ref: inputRef } }}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          value={value}
          sx={[
            { border: 'none', padding: 2, minWidth: '200px' },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        />
      )}

      {!isEditing && <Box sx={{ padding: 2 }}>{value}</Box>}
    </Box>
  );
};

export default EditableText;
