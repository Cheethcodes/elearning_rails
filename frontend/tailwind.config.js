/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#000D80',
        success: '#1EB351',
        success_light: '#DCF9E8',
        danger: '#B3261E',
        danger_light: '#F9DEDC',
      },
      fontSize: {
        sm: '10px'
      }
    },
  },
  plugins: [],
}
