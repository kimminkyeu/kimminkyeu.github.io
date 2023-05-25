/** @type {import('tailwindcss').Config} */

const { spacing } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        custom_innerUnderline: 'inset 0 -1px 0px 0px rgb(220, 220, 220) ',
      },
      // 적당히 스크롤되도록 scroll-margin-top을 추가해주면 금상첨화입니다.
      typography: (theme) => ({
        DEFAULT: {
          css: {
            //...
            'h1,h2,h3,h4': {
              'scroll-margin-top': spacing[32],
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
