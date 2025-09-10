export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 700: "#2b2e7a", 800: "#24265f" },
        ink:   { 900: "#1f2244", 600: "#59607a" }
      },
    },
  },
  plugins: [],
};