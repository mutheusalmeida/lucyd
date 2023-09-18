/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
    },
    colors: () => ({
      white: '#fff',
      black: {
        50: '#383838',
        100: '#444',
        400: '#2c2c2c',
        900: '#000',
      },
      purple: {
        400: '#9747ff',
      },
      green: {
        400: '#98D05B',
      },
      red: {
        400: '#F3797D',
      },
    }),
  },
  plugins: [],
}
