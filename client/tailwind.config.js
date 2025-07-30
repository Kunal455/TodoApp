/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'lucida': ['"Lucida Sans"', 'Geneva', 'Verdana', 'sans-serif'],
        'franklin': ['"Franklin Gothic Medium"', 'Arial', 'sans-serif'],
        'gill': ['"Gill Sans"', 'Calibri', '"Trebuchet MS"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
