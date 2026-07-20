import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'enclosure': 'var(--enclosure)',
        'cable-white': 'var(--cable-white)',
        'copper': 'var(--copper)',
        'circuit-green': 'var(--circuit-green)',
        'live-red': 'var(--live-red)',
        'aluminum': 'var(--aluminum)',
        'signal': 'var(--signal)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "sans-serif"],
      },
      boxShadow: {
        'signal': '0 0 20px rgba(0, 243, 255, 0.5)',
        'magenta': '0 0 20px rgba(255, 0, 234, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 10s infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 243, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 243, 255, 0.6), 0 0 30px rgba(0, 243, 255, 0.4)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
