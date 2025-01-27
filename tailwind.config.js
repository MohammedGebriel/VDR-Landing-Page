/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // contained:"#5A5FE0",
        contained: '#9F9685',
        darkModeColor: '#313B3E',
        primary: '#C5B279',
        secondary: '#9F9685',
        primaryText: '#1d1d1d',
        secondaryText: '#967860',
        dark: {
          primary: '#2c3639'
        }
      },
      screens: {
        '3xl': '1940px',
        xs: '350px',
        L: '700px',
        mx: '915px',
        customSix: '1330px'
      }
    }
  },
  plugins: ['@tailwindcss/forms', 'tailwindcss-rtl', 'tailwind-scrollbar']
};
