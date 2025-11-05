/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'unicorn-pink': '#ffc0e3',
        'unicorn-purple': '#d4a5d4',
        'unicorn-blue': '#c7e6f5',
        'unicorn-lavender': '#e6e6fa',
      },
    },
  },
  plugins: [],
}
