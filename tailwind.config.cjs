/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: ['.active'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
  },
  plugins: [],
}
