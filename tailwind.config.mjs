/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       keyframes: {
        flipX: {
          '0%, 100%': { transform: 'perspective(600px) rotateX(0deg)' },
          '50%':       { transform: 'perspective(600px) rotateX(180deg)' },
        },
      },
      animation: {
        flipX: 'flipX 3s ease-in-out infinite',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'blue': '#0D1D4F',
        'blue-dark': '#071029ff',
        'yellow': '#FFC857',
        'yellow-dark': '#E7AE00',
        'red': '#C33149',
        'red-dark': '#8C2234',
        'green': '#80BC55',
      },
       screens: {
        'xx': '1180px',
      },
      // fontFamily: {
      //   urbanist: ['var(--font-urbanist)', 'sans-serif'],
      //   heading: ['var(--font-urbanist)', 'sans-serif'],
      //   body: ['var(--font-urbanist)', 'sans-serif'],
      // },
    },
  },
  plugins: [],
};
