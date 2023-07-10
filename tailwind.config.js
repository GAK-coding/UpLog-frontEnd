/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'header-gray': '#E5E7EB',
      },
      height: {
        '12vh': '12vh',
        '88vh': '88vh',
        '42rem': '42rem',
        noneHeader: 'calc(100vh - 7rem)',
      },
      width: {
        '39rem': '39rem',
      },
      margin: {
        '[-7rem]': '-7rem',
      },
    },
  },
  plugins: [],
};
