/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lovePink: "#F26076",
        lovePeach: "#FF9760",
        loveGold: "#FFD150",
        loveTeal: "#458B73",
      },
    },
  },
  plugins: [],
};
