/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f5f4f0',
        surface: '#ffffff',
        'surface-2': '#eeede9',
        border: '#dddbd5',
        text: '#1a1917',
        'text-muted': '#7a7870',
        'ai-bubble': '#1a1917',
        'ai-text': '#f5f4f0',
        'user-bubble': '#e8e6e0',
        'user-text': '#1a1917',
      },
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typingBounce 1.2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { transform: 'translateY(24px) scale(0.97)', opacity: '0' },
          'to': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        typingBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}