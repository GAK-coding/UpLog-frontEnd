/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        'header-gray': '#E5E7EB',
        orange: '#FFAA2A',
        'light-gray': '#C4C4C4',
        'dark-gray': '#64635E',
      },
      fontFamily: {
        logo: "'Baloo Tammudu 2', cursive",
      },
      height: {
        '42rem': '42rem',
        noneHeader: 'calc(100vh - 5.5rem)',
        'header-height': '5.5rem',
        '47.5%': '47.5%',
        '18%': '18%',
        '82%': '82%',
        '45%': '45%',
      },
      minHeight: {
        '42rem': '42rem',
      },
      width: {
        '39rem': '39rem',
      },
      margin: {
        '[-5.5rem]': '-5.5rem',
        '[-1rem]': '-1rem',
      },
      boxShadow: {
        'sign-up': '2px 2px 10px 1px rgba(0, 0, 0, 0.15), -2px -2px 10px 0px rgba(0, 0, 0, 0.15)',
        'sign-up-info': '-2px 2px 8px 0px rgba(0, 0, 0, 0.15), 2px 2px 8px 1px rgba(0, 0, 0, 0.15)',
      },
      border: {
        '0.6px': '0.6px',
      },
    },
  },
  plugins: [],
};
