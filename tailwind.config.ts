import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

export default {
  content: {
    files: [
      "./src/**/*.pug",
      "./src/**/*.ts",
      "./src/**/*.js",
      "./src/**/*.css",
      "./src/**/*.scss",
      "./src/**/*.sass",
    ],
    extract,
  },
  theme: {
    screens: {
      ...screens,
      md2: "62rem",
    },
    fontSize,
    extend: {
      fontFamily: {
        playfair: ["PlayfairDisplay", ...fontFamily.sans],
        montserrat: ["Montserrat", ...fontFamily.sans],
        formular: ["Formular", ...fontFamily.sans],
      },
      colors: {
        background: "#ECE4DA",
        text: {
          DEFAULT: "#37332A",
          triary: "#74807F",
        },
        accent: {
          DEFAULT: "#B79F7F",
        },
        destructive: {
          DEFAULT: "#A55205",
        },
        border: {
          DEFAULT: "#666666",
        },
      },
      keyframes: {
        burgerOpen: {
          from: {
            transform: "translate(-100%, 0)",
          },
          to: {
            transform: "translate(0, 0)",
          },
        },
        burgerClose: {
          from: {
            transform: "translate(0, 0)",
          },
          to: {
            transform: "translate(-100%, 0)",
          },
        },
      },
      animation: {
        burgerOpen: "burgerOpen 300ms ease forwards",
        burgerClose: "burgerClose 300ms ease forwards",
      },
    },
  },
  plugins: [
    fluid({
      checkSC144: false,
    }),
  ],
} satisfies Config;
