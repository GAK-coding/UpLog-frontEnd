// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 3. extend the theme
const theme = {
  colors: {
    black: 'var(--black)',
    white: 'var(--white)',
    yellow: '#FFA41B',
    // orange: 'var(--orange)',
    orange: '#FFA41B',
    'orange-light': 'var(--orange-light)',
    'header-gray': 'var(--header-gray)',
    border: 'var(--border-bg)',
    line: 'var(--border-line)',
    gray: {
      light: 'var(--gray-light)',
      dark: 'var(--gray-dark)',
      spring: 'var(--gray-spring)',
      border: 'var(--border-gray)',
    },
  },
  fontFamily: {
    logo: "'Baloo Tammudu 2', cursive",
  },
  height: {
    noneHeader: 'calc(100vh - 5.7rem)',
  },
  boxShadow: {
    'sign-up': '2px 2px 10px 1px rgba(0, 0, 0, 0.15), -2px -2px 10px 0px var(--shadow)',
    'sign-up-info': '-2px 2px 8px 0px rgba(0, 0, 0, 0.15), 2px 2px 8px 1px var(--shadow)',
  },
};
export default theme;