module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dracula-background": "#282a36",
        "dracula-currentline": "#333545",
        "dracula-foreground": "#f8f8f2",
        "dracula-comment": "#6272a4",
        "dracula-cyan": "#8be9fd",
        "dracula-green": "#50fa7b",
        "dracula-orange": "#ffb86c",
        "dracula-pink": "#ff79c6",
        "dracula-purple": "#bd93f9",
        "dracula-red": "#ff5555",
        "dracula-yellow": "#f1fa8c",
      },
    },
  },
  plugins: [],
};
