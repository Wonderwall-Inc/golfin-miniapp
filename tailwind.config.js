const konstaConfig = require('konsta/config')

/** @type {import('tailwindcss').Config} */
module.exports = konstaConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': 'white',
        'secondary': '#8DC63F',
        'ios-light-surface': '#293632',
      },

    },
  },
  plugins: [],
})



