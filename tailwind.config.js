/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: 'var(--black)',
        white: 'var(--white)',
        orange: 'var(--orange)',
        'header-gray': '#E5E7EB',
        border: 'var(--border-bg)',
        line: 'var(--border)',
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
        noneHeader: 'calc(100vh - 5.5rem)',
      },
      boxShadow: {
        'sign-up': '2px 2px 10px 1px rgba(0, 0, 0, 0.15), -2px -2px 10px 0px var(--shadow)',
        'sign-up-info': '-2px 2px 8px 0px rgba(0, 0, 0, 0.15), 2px 2px 8px 1px var(--shadow)',
      },
    },
  },
  plugins: [],
};
