/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#FFC107',
      },
    },
  },
  plugins: [],
}