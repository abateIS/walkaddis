/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Main brand color - Orange
          600: '#ea580c', // Darker orange for hover states
          700: '#c2410c', // Dark orange for active states
          800: '#9a3412', // Very dark orange
          900: '#7c2d12', // Deepest orange
        },
        brand: {
          orange: '#f97316',
          'orange-dark': '#ea580c',
          'orange-light': '#fb923c',
          gold: '#fbbf24', // For accents
          'dark-orange': '#c2410c',
        },
      },
      animation: {
        'shimmer': 'shimmer 3s infinite',
        'gradient': 'gradient 3s ease infinite',
      },
    },
  },
  plugins: [],
}


