/** @type {import('tailwindcss').Config} */

const {spacing} = require('tailwindcss/defaultTheme');

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
            // https://tailwindcss.com/docs/typography-plugin (태그)
            // https://tailwindcss.com/docs/customizing-colors (색)
            // 필요한 설정은 위 링크에서 가져오면 됨!
            typography: (theme) => ({
                DEFAULT: {
                    fontFamily: {
                        sans: ['Noto Sans KR', 'sans-serif'],
                    },
                    css: {
                        maxWidth: '43rem',
                        h1: {
                            marginTop:32,
                            fontWeight: 800,
                        },
                        h2: {
                            marginTop:24,
                            fontWeight: 700,
                        },
                        h4: {
                            fontWeight: 500,
                        },
                        //...
                        'h1,h2,h3,h4': {
                            'scroll-margin-top': spacing[32],
                        },
                        del: { // strikeThrough text
                            color: theme('colors.neutral[400]'),
                        },
                        img: {
                            maxHeight: '27rem',
                            margin: 'auto',
                        },
                        p: {
                            marginBottom: 0,
                        },
                        a: {
                            '--tw-prose-links': theme('colors.neutral[400]'),
                        },
                        figure: {
                            marginTop: 0,
                        },
                        figcaption: {
                            marginLeft: 2,
                            marginTop: 6,
                            '--tw-prose-links': theme('colors.neutral[400]'),
                            '--tw-prose-captions': theme('colors.neutral[400]'),
                        },
                        'code::before': false,
                        'code::after': false,
                        code: {
                            fontWeight: theme('fontWeight.light'),
                            padding: '0.1rem 0.2rem',
                            backgroundColor: theme('colors.neutral[200]'),
                            color: theme('colors.red[500]'),
                            borderRadius: '3px',
                        },
                        ul: {
                            padding: 0,
                            listStyleType: 'none',
                        },
                    },
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
