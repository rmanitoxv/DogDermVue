/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '576px',
      '2xs': '480px',
      '3xs': '320px',
      ...defaultTheme.screens,
    },
    colors: {
      first: '#FE8D2A',
      second: '#112B3C',
      third: '#71839B',
      fourth: '#F99D89',
      fifth: '#324054',
      sixth: '#989898',
      seventh: '#ECF1F8',
      blue: '#6CBAFE',
      blue1: '#0075FF',
      red: '#FE2A2A',
      grey: '#808080',
      green: '#00BC35',
      white: '#FFFFFF',
      black: '#000000'
    }
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}