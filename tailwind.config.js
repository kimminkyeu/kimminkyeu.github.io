/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
