const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // false or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'fade-in-custom': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-fast': 'fade-in-custom 0.5s ease-out',
      },
      fontFamily: {
        'display': ['Oswald', 'ui-sans-serif', 'system-ui'],
        'body': ['Quicksand', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'xxs': '.5rem',
        'xxxs': '.375rem',
        '4half': '2.4rem',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        solblue: {
          light: '#94FDFF',
          lighter: '#C0FFFF',
          brighter: '#73FFFF',
          brighter2: '#4EC8C8',
          DEFAULT: '#5399A5',
          '2': '#457887',
          dark: '#001922',
          darker: '#005779',
          darker2: '#005779',
          darkest: '#001922',
          darkest2: '#01131a',
          
        },
        safealternate: {
          accentblue: '#56c9f9',
          accentgreen: '#2EE59D',
        },
        solacid: {
          light: '#DFE281',
          DEFAULT: '#2EE59D', /* safe accent green */
          dark: '#A6AA00',
        },
        solgray: {
          darkest: '#848484',
          dark: '#B2B2B2',
          DEFAULT: '#CCCCCC',
          light: '#F1F1F1',
          lightest: '#F7F7F7',
        },
      },
      borderRadius: {
        'none': '0',
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '1rem',
        'xl': '3rem',
        'xxl': '5rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '5px 10px 20px 30px rgba(255, 255, 255, 0.05)',
        "solacid": '0px 5px 20px 0 rgba(213, 227, 0, 0.5)',
        "solacidlight": '0px 5px 15px 0 rgba(223, 226, 129, 0.8)',
        "solaciddark": '0px 5px 15px 0 rgba(166, 170, 0, 0.6)',
        "solbluelight": '0px 5px 20px 0 rgba(0, 87, 121, 0.2)',
        "solbluelight2": '0px 2px 12px 0 rgba(148, 253, 255, 0.4)',
        "solgray": '0px 5px 20px 0 rgba(30, 30, 30, 0.5)',
        "solblue-dark": '0px 5px 20px 0 rgba(16, 49, 71, 0.6)',
        "safera": '0px 8px 15px rgba(0, 0, 0, 0.1);',
        "safegreen": '0px 15px 20px rgba(46, 229, 157, 0.4)',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['dark'],
      fontWeight: ['dark']
    },
  },
  plugins: [],
}
