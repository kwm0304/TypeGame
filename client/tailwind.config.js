import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {Config} */
const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'reddit-mono': ['"Reddit Mono"', 'monospace'],
      },
      fontWeight: {
        'reddit-mono': '200', 
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        monkeyBG: "#323437",
        monkeyText: "#d1d0c5",
        monkeyDarkText: "#646669",
        monkeyAccent: "#e2b714",
        darkerBG: "#2c2e31"
      }
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config;
