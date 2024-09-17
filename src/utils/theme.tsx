import { extendTheme } from '@mui/joy/styles';
import Link from '../components/Link';

const theme = extendTheme({
  colorSchemeSelector: 'media',
  components: {
    JoyLink: {
      defaultProps: {
        component: Link,
      },
    },
  },
});

export default theme;
