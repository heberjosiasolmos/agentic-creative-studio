/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#1a73e8',
          'blue-hover': '#1557b0',
          red: '#ea4335',
          yellow: '#fbbc04',
          green: '#34a853',
          dark: '#131314',
          surface: '#1e1f20',
          panel: '#282a2c',
          border: '#3c4043',
          accent: '#8ab4f8'
        },
        gemini: {
          purple: '#c58af9',
          pink: '#f28b82',
          blue: '#8ab4f8',
          cyan: '#78d9ec',
          yellow: '#fdd663'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
