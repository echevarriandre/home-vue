const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      outline: {
        'green-dashed': ['2px dashed ' + defaultTheme.colors.green[500], '3px']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
