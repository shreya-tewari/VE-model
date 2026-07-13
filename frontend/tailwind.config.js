/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F2F4F1",
        ink: "#16211D",
        muted: "#5B655F",
        line: "#D8DAD2",
        signal: {
          DEFAULT: "#2F6F5E",
          light: "#DCEBE6",
          dark: "#1F4E42",
        },
        amber: {
          DEFAULT: "#C6752B",
          light: "#F3E3D2",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
