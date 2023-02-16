/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsc,tsx}",
    "./components/**/*.{js,ts,jsc,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        forum: "'Forum', cursive",
        'open-sans': "'Open Sans', sans-serif"
      }
    },
  },
  plugins: [],
}
