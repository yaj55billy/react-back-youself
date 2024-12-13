/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3A5A80',
        'primary-light': '#4B6B91',
        'primary-dark': '#294867',
      },
    },
  },
  plugins: [],
};
