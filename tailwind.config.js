/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        bounceleft: {
          "0%": {
            right: "0px",
          },
          "50%": {
            right: "8px",
          },
          "100%": {
            right: "0px",
          },
        },
        bounceright: {
          "0%": {
            left: "0px",
          },
          "50%": {
            left: "8px",
          },
          "100%": {
            left: "0px",
          },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeout: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slidein: {
          "0%": {
            bottom: "-250px",
            scale: "0",
          },
          "100%": {
            bottom: "0px",
            scale: "1",
          },
        },
        slideout: {
          "0%": {
            bottom: "0px",
            scale: "1",
          },
          "100%": {
            bottom: "-250px",
            scale: "0",
          },
        },
      },
      animation: {
        fadein: "fade 0.6s ease forwards",
        fadeout: "fadeout 0.6s ease forwards",
        slidein: "slidein 0.6s ease forwards",
        slideout: "slideout 0.6s ease forwards",
        bounceleft: "bounceleft 1s infinite",
        bounceright: "bounceright 1s infinite",
      },
    },
  },
  plugins: [],
};
