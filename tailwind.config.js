/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          50: "#e6e6f2",
          100: "#d9d9ec",
          200: "#b0b0d8",
          300: "#000080",
          400: "#000073",
          500: "#000066",
          600: "#000060",
          700: "#00004d",
          800: "#00003a",
          900: "#00002d",
        },
        dark: {
          50: "#e7e7e7",
          100: "#dbdbdb",
          200: "#b5b5b5",
          300: "#0f0f0f",
          400: "#0e0e0e",
          500: "#0c0c0c",
          600: "#0b0b0b",
          700: "#090909",
          800: "#070707",
          900: "#050505",
        },
        gray: {
          50: "#fcfcfc",
          100: "#fafafa",
          200: "#f4f4f4",
          300: "#dddddd",
          400: "#c7c7c7",
          500: "#b1b1b1",
          600: "#a6a6a6",
          700: "#858585",
          800: "#636363",
          900: "#4d4d4d",
        },
      },
    },
  },
  plugins: [],
};
