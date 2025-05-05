/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        'public-sans': ['"Public Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
