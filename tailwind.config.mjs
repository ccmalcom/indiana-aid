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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'blue': '#0D1D4F',
        'yellow': '#FFC857',
        'yellow-dark': '#E7AE00',
        'red': '#C33149',
        'red-dark': '#8C2234',
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
