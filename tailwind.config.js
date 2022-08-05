/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      height: {
        header: '3.25rem',
        nav: '3.125rem'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
