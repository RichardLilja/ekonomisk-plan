import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: "inset 0px -1px 0px 0px",
        "input-focus": "inset 0px -2px 0px 0px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        interactive: "hsl(var(--interactive))",
        border: "hsl(var(--border))",
        danger: "hsl(var(--danger))",
        "shb-hb1": "hsl(var(--hsl-shb-hb1))",
        "shb-hb2-light": "hsl(var(--hsl-shb-hb2-light))",
        "shb-hb5-light": "hsl(var(--hsl-shb-hb5-light))",
        "shb-hb4": "hsl(var(--hsl-shb-hb4))",
        "shb-hb6": "hsl(var(--hsl-shb-hb6))",
        "shb-hb8": "hsl(var(--hsl-shb-hb8))",
        "shb-gray-5": "hsl(var(--hsl-shb-gray-5))",
        "shb-gray-10": "hsl(var(--hsl-shb-gray-10))",
        "shb-gray-15": "hsl(var(--hsl-shb-gray-15))",
        "shb-gray-62": "hsl(var(--hsl-shb-gray-62))",
        "shb-black": "hsl(var(--hsl-shb-black))",
        "shb-white": "hsl(var(--hsl-shb-white))",
      },
      fontFamily: {
        "header-slab": "var(--font-handelsbanken-slab-serif)",
        "ingresso-slab": "var(--font-handelsbanken-slab-serif-light)",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(12rem, 1fr))",
      },
      fontSize: {
        "shb-title-1": [
          "2.625rem",
          {
            lineHeight: "3.5rem",
            fontWeight: "bold",
          },
        ],
        "shb-title-2": [
          "2.375rem",
          {
            lineHeight: "3.25rem",
            fontWeight: "bold",
          },
        ],
        "shb-title-4": [
          "1.75rem",
          {
            lineHeight: "2.5rem",
            fontWeight: "bold",
          },
        ],
        "shb-title-5": [
          "1.5rem",
          {
            lineHeight: "2rem",
            fontWeight: "bold",
          },
        ],
        "shb-title-7": [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "bold",
          },
        ],
        "shb-title-10": [
          "1.125rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "normal",
          },
        ],
        "shb-title-11": [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "bold",
          },
        ],
        "shb-text-1": [
          "1.125rem",
          {
            lineHeight: "1.7rem",
          },
        ],
        "shb-text-2": [
          "1rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        "shb-text-3": [
          "0.875rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "200",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
