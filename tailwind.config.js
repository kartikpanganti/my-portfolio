/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 8s linear infinite',
      },
      colors: {
        primary: {
          light: '#4F46E5', // Indigo-600
          dark: '#6366F1', // Indigo-500
        },
        secondary: {
          light: '#3B82F6', // Blue-600
          dark: '#60A5FA', // Blue-400
        },
        background: {
          light: '#FFFFFF', // White
          dark: '#111827', // Gray-900
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}