/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background, #000000)",
        foreground: "var(--foreground, #ffffff)",
        hacker: {
          primary: "#ff3333",     // Brighter red
          secondary: "#808080",   // Grey
          accent: "#00ff00",      // Hacker green
          dark: "#0a0a0a",        // Very dark background
          border: "rgba(255,0,0,0.3)"  // Translucent red border
        }
      },
      animation: {
        // Enhanced existing animations
        'glitch-screen': 'glitch-screen 0.3s infinite linear',
        'terminal-flicker': 'terminal-flicker 0.1s infinite alternate',
        'ghost-hover': 'ghost-hover 0.5s infinite alternate',
        'ghost-border': 'ghost-border 1s infinite alternate',
        'pulse': 'pulse 1s infinite',
        
        // New hacking-themed animations
        'data-breach': 'data-breach 0.5s infinite alternate',
        'system-warning': 'system-warning 1s infinite alternate',
        'code-rain': 'code-rain 3s linear infinite',
        'network-pulse': 'network-pulse 2s infinite',
        'cyber-glitch': 'cyber-glitch 0.4s infinite alternate'
      },
      keyframes: {
        // Existing keyframes
        'glitch-screen': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'terminal-flicker': {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
        'ghost-hover': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        'ghost-border': {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        
        // New keyframe animations
        'data-breach': {
          '0%': { transform: 'skew(-5deg)' },
          '50%': { transform: 'skew(5deg)' },
          '100%': { transform: 'skew(-5deg)' }
        },
        'system-warning': {
          '0%': { color: 'rgba(255,0,0,0.7)' },
          '100%': { color: 'rgba(255,0,0,1)' }
        },
        'code-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'network-pulse': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        },
        'cyber-glitch': {
          '0%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0, 0)' }
        }
      },
      backgroundImage: {
        'grid-white': 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
        'hacker-overlay': 'linear-gradient(45deg, rgba(255,0,0,0.1), rgba(0,255,0,0.1))',
      },
      boxShadow: {
        'hacker-glow': '0 0 20px rgba(255,0,0,0.3)',
        'cyber-pulse': '0 0 30px rgba(0,255,0,0.4)',
      },
      borderWidth: {
        '1': '1px',
      },
      textShadow: {
        'hacker-glow': '0 0 10px rgba(0,255,0,0.5)',
      }
    },
  },
  plugins: [],
};