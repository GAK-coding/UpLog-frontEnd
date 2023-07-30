/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: 'var(--black)',
        white: 'var(--white)',
        yellow: '#FFA41B',
        orange: 'var(--orange)',
        'orange-light': 'var(--orange-light)',
        'orange-light-sideBar': 'var(--orange-light-sideBar)',
        'orange-sideBar': 'var(--orange-sideBar)',
        'header-gray': 'var(--header-gray)',
        'none-header': 'var(--bg-dark)',
        border: 'var(--border-bg)',
        line: 'var(--border-line)',
        task: {
          bg: 'var(--task-board)',
          line: 'var(--task-line)',
          'detail-line': 'var(--task-detail-line)',
        },
        gray: {
          light: 'var(--gray-light)',
          dark: 'var(--gray-dark)',
          spring: 'var(--gray-spring)',
          border: 'var(--border-gray)',
          board: 'var(--board-gray)',
          sideBar: 'var(--sideBar-gray)',
          table: 'var(--table-gray)',
        },
        hover: 'var(--hover)',
        type: {
          feature: 'var(--Feature)',
          changed: 'var(--Changed)',
          deprecated: 'var(--Deprecated)',
          new: 'var(--New)',
          fixed: 'var(--Fixed)',
        },
      },
      fontFamily: {
        logo: "'Baloo Tammudu 2', cursive",
      },
      width: {
        noneSideBar: 'calc(100vw - 18.6rem)',
      },
      height: {
        noneHeader: 'calc(100vh - 5.7rem)',
        board: 'calc(100vh - 19.5rem)',
        'board-scroll': 'calc(100vh - 20.5rem)',
      },
      boxShadow: {
        'sign-up': '2px 2px 10px 1px rgba(0, 0, 0, 0.15), -2px -2px 10px 0px var(--shadow)',
        'sign-up-info': '-2px 2px 8px 0px rgba(0, 0, 0, 0.15), 2px 2px 8px 1px var(--shadow)',
        release: '2px 2px 5px 1px rgba(0, 0, 0, 0.05), -2px -2px 5px 0px rgba(0, 0, 0, 0.05)',
        'task-detail': '2px 2px 5px 1px rgba(0, 0, 0, 0.05), -2px -2px 5px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
