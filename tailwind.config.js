/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Purple theme
        // primary: '#9b89b3',
        // secondary: '#d2beeb',
        // error: '#4b4453',

        // Tan
        // primary: '#C3B398',
        // secondary: '#887960',
        // error: '#A94119',

        // Mint
        // primary: '#98B0A9',
        // secondary: '#D9E9DE',
        // error: '#3F5C68',

        // Olive
        primary: '#76745A',
        secondary: '#AEAC9A',
        error: '#FFC6A3',

        // New Theme
        // primary: '#8fb3ff',
        // secondary: '#ebf1ff',
        // error: '#d41d6d',

        // Dark theme
        'primary-dark': '#262626',
        'secondary-dark': '#737373',
        'error-dark': '#ef4444',
      },
    },
  },
  plugins: [],
};
