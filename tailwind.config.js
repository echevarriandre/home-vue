module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dracula-background': '#282a36',
        'dracula-currentline': '#333545',
        'dracula-foreground': '#f8f8f2',
        'dracula-comment': '#6272a4',
        'dracula-cyan': '#8be9fd',
        'dracula-green': '#50fa7b',
        'dracula-orange': '#ffb86c',
        'dracula-pink': '#ff79c6',
        'dracula-purple': '#bd93f9',
        'dracula-red': '#ff5555',
        'dracula-yellow': '#f1fa8c',
      },
      width: {
        '500': '500px',
      },
      minWidth: {
        '0': '0',
        '1/5': '20%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      outline: {
        // 'pink-dashed': ['2px dashed ' + defaultTheme.colors.green[500], '3px']
        'pink-dashed': ['2px dashed #ff79c6', '3px'],
        'pink-dashed-text': ['2px dashed #ff79c6', '2px']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}