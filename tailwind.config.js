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
      },
      colors: {
        'default-black': '#1c1c1c',
        'default-gray': '#AAAAAA',
        'light-gray': '#F8F8F8',
        lunch: '#F178B6',
        gray: '#999999'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
