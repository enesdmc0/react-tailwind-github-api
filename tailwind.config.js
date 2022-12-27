/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "c1": "#11141a",
        "c2" : "#282a31",
        "c3" : "#2e323e"
      }
    },
  },
  plugins: [],
}