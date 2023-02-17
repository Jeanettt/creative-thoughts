/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsc,tsx}",
    "./components/**/*.{js,ts,jsc,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ED7445",
        "primary-tint": "#EFC7A4",
        "primary-background": "#FFF9F5",
        secondary: "#1F4D85",
        "secondary-tint": "#32649A",
      },
      fontFamily: {
        forum: "'Forum', cursive",
        "open-sans": "'Open Sans', sans-serif",
      },
    },
  },
  plugins: [],
};
