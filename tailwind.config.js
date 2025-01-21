/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        lightgray: 'var(--color-lightgray)',
        midgray: 'var(--color-midgray)',
        gray: 'var(--color-text-gray)'
      },
    },
    fontFamily: {
      display: ["Plus Jakarta Sans"]
    }
  },
  plugins: [],
}

