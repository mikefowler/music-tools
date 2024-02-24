import { extendTheme } from '@mui/joy';
import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;

  return <RouterLink ref={ref} to={href} {...other} />;
});

export default extendTheme({
  components: {
    JoyLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
  },
});
