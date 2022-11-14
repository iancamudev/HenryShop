/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFFF0A",
      },
    },
    keyframes: {
      "open-menu": {
        "0%": { transform: "scaleY(0)" },
        "80%": {},
        "100%": { transform: "scaleY(1)" },
      },
    },
    animation: {
      "open-menu": "open-menu 0.5s ease-in-out forwards",
    },
  },
  plugins: [],
};
