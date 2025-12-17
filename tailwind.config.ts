import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#fef5f1',
          100: '#fce8df',
          200: '#f9d0c0',
          300: '#f5b199',
          400: '#f08866',
          500: '#e86642',
          600: '#d54d2f',
          700: '#b33d24',
          800: '#933522',
          900: '#7a3020',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
