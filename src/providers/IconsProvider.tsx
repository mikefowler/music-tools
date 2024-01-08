import { GlobalStyles } from '@mui/joy';
import React, { PropsWithChildren } from 'react';
import { IconContext } from 'react-icons';

const IconsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <GlobalStyles
        styles={{
          ['svg.react-icons']: {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            fontSize: 'var(--Icon-fontSize, 20px)',
            width: '1em',
            height: '1em',
          },
        }}
      />

      <IconContext.Provider value={{ className: 'react-icons' }}>
        {children}
      </IconContext.Provider>
    </>
  );
};

export default IconsProvider;
