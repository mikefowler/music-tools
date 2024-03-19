import { AspectRatio, Box, Typography } from '@mui/joy';
import React from 'react';

interface ChordBoxProps {
  name: string;
  degree?: string;
  type?: string;
  numeral?: string;
  width?: number | string;
}

const ChordBox: React.FC<ChordBoxProps> = ({
  name,
  degree,
  type,
  numeral,
  width,
}) => (
  <Box display="flex" flexDirection="row" width={width}>
    <Box
      display="flex"
      alignSelf="flex-start"
      justifyContent="flex-end"
      width="25%"
      flex={1}
      px={1}
    >
      <Typography level="body-sm">{degree}</Typography>
    </Box>

    <AspectRatio
      ratio="1"
      variant="plain"
      sx={{
        width: '50%',
        bgcolor: 'primary.outlinedActiveBg',
        borderRadius: 'md',
      }}
    >
      <Typography component="div" level="title-lg">
        {name}
      </Typography>
    </AspectRatio>

    <Box display="flex" alignSelf="stretch" width="20%">
      {numeral && (
        <Box alignSelf="flex-start" px={1}>
          <Typography level="body-sm">{numeral}</Typography>
        </Box>
      )}

      {type && (
        <Box alignSelf="flex-end" fontSize={10} px={1}>
          <Typography level="body-sm">{type}</Typography>
        </Box>
      )}
    </Box>
  </Box>
);

export default ChordBox;
