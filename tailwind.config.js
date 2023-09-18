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
      },
    }),
  },
  plugins: [],
}
