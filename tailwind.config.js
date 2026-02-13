/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'edu-green': '#16A34A',
        'edu-light': '#10B981',
        'edu-dark': '#065F46',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        eduportal: {
          "primary": "#059669",
          "secondary": "#10B981",
          "accent": "#047857",
          "neutral": "#1F2937",
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
}
