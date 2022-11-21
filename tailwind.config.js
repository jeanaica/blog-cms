/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      white: '#fff',
      transparent: 'transparent',
      accent: {
        DEFAULT: '#f9cfbc',
        100: '#fdf1eb',
        200: '#fbe3d7',
        300: '#fad5c3',
        400: '#c7a696',
        500: '#957d71',
      },
      primary: {
        DEFAULT: '#5c5168',
        100: '#efeef0',
        200: '#cecbd2',
        300: '#aea8b4',
        400: '#8d8595',
        500: '#6c6277',
        600: '#4a4153',
        700: '#403949',
        800: '#37313e',
        900: '#2e2934',
      },
      secondary: {
        DEFAULT: '#7f7f7f',
        100: '#b2b2b2',
        200: '#999999',
        300: '#8c8c8c',
        400: '#4c4c4c',
        500: '#333333',
      },
      error: {
        DEFAULT: '#B00020',
        100: '#efccd2',
        200: '#d88090',
        300: '#c0334d',
        400: '#9e001d',
        500: '#7b0016',
      },
    },
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme.primary,
            a: {
              color: theme.secondary,
              '&:hover': {
                color: theme('secondary.100'),
              },
            },
          },
        },
      }),
      fontFamily: {
        Poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        PoppinsLight: ['PoppinsLight', ...defaultTheme.fontFamily.sans],
        PoppinsSemiBold: ['PoppinsSemiBold', ...defaultTheme.fontFamily.sans],
        PoppinsThin: ['PoppinsThin', ...defaultTheme.fontFamily.sans],
        PoppinsExtraLight: [
          'PoppinsExtraLight',
          ...defaultTheme.fontFamily.sans,
        ],
        ClickerScript: ['ClickerScript'],
        sans: ['"Poppins"', 'sans-serif'],
        heading: ['"ClickerScript"', 'cursive'],
      },
      borderColor: {
        DEFAULT: '#cecbd2',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
