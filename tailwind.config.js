/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6fffa',
          100: '#b2f5ea',
          200: '#81e6d9',
          300: '#4fd1c5',
          400: '#4ECDC4',
          500: '#38b2ac',
          600: '#319795',
          700: '#2c7a7b',
          800: '#285e61',
          900: '#234e52',
        },
        dark: {
          100: '#2d2d44',
          200: '#252538',
          300: '#1e1e2e',
          400: '#1a1a2e',
          500: '#16162a',
          600: '#121226',
          700: '#0e0e22',
          800: '#0a0a1e',
          900: '#06061a',
        },
        accent: {
          coral: '#FF6B6B',
          yellow: '#FFE66D',
          purple: '#a29bfe',
          blue: '#74b9ff',
        }
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(78, 205, 196, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(78, 205, 196, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

