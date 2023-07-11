/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'header-gray': '#E5E7EB',
      },
      height: {
        '42rem': '42rem',
        noneHeader: 'calc(100vh - 5.5rem)',
        'header-height': '5.5rem',
      },
      width: {
        '39rem': '39rem',
      },
      margin: {
        '[-5.5rem]': '-5.5rem',
      },
    },
  },
  plugins: [],
};
