import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts,js}',
    './components/**/*.{vue,ts,js}',
    './pages/**/*.{vue,ts,js}',
    './layouts/**/*.{vue,ts,js}',
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#8FD9A8',
        'primary-dark': '#2D4D3A',
        muted: '#5B5B5B',
      },
      borderRadius: {
        xl: '18px',
      },
      boxShadow: {
        card: '0 2px 16px rgba(45,77,58,0.07)',
        'card-hover': '0 8px 32px rgba(45,77,58,0.14)',
      }
    }
  }
} satisfies Config
