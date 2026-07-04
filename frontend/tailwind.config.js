/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F6', // Alabaster cream
        surface: '#FFFFFF', // Crisp white cards
        primary: '#2D2B2A', // Charcoal for major buttons
        primaryHover: '#1A1818',
        accent: '#D38D7A', // Muted terracotta
        textMain: '#2D2B2A', 
        textMuted: '#787673',
        inputBg: '#F2EFEC',
        borderColor: '#E6E4DE'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
