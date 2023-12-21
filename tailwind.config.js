/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2F88FF',
        secondary: '#E6E6E6',
        redery: '#9D3B3B',
      },
      fontFamily: {
        'sans': [ 'Poppins', 'Montserrat', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}