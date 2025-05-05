/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        'public-sans': ['"Public Sans"', 'sans-serif'],
      },
      lineHeight: {
        '80': '80px',
        '62': '62px',
      },
      letterSpacing: {
        'tightest': '-0.03em',
      },
    },
  },
};

