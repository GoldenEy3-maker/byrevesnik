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
    screens,
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
    },
  },
  plugins: [
    fluid({
      checkSC144: false,
    }),
  ],
} satisfies Config;
