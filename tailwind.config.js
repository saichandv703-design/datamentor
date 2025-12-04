/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gfg: {
          green: '#2F8D46',
          'green-dark': '#0F7C34',
          'green-light': '#3CAA54',
          gray: '#f7f7f7',
          border: '#e3e6e8',
        },
      },
    },
  },
  plugins: [],
};
