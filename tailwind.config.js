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
      minWidth: {
        '0': '0',
        '1/5': '20%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      outline: {
        // 'green-dashed': ['2px dashed ' + defaultTheme.colors.green[500], '3px']
        'green-dashed': ['2px dashed #50fa7b', '3px'],
        'green-dashed-text': ['2px dashed #50fa7b', '2px']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}