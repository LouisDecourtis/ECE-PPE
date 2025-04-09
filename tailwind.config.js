/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-green': '#4ADE80',
        'anthracite': '#1A1A1A',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};