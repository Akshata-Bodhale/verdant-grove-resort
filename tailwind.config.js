/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{js,html}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f3f7ed',
          100: '#e7efdb',
          500: '#4A7C2A',
          700: '#2D5016',
          900: '#1A2E1A',
        },
        sand: '#E8DCC4',
        wood: '#8B5E34',
        cream: '#F5F1E8',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}