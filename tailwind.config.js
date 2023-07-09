/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'header-gray': '#E5E7EB',
      },
      minHeight: {
        15: '15vh',
        85: '85vh',
      },
    },
  },
  plugins: [],
};
