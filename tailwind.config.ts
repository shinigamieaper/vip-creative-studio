import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        "text-primary": "hsl(var(--text-primary))",
        "accent-primary": "hsl(var(--accent-primary))",
        "accent-secondary": "hsl(var(--accent-secondary))",
        "border-standard": "hsl(var(--border-standard))",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        md: "8px",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        shine: {
          "0%": { backgroundPosition: "100% 0" },
          "100%": { backgroundPosition: "-100% 0" },
        },
      },
      animation: {
        shimmer: "shimmer var(--shimmer-duration, 2s) linear infinite",
        shine: "shine var(--shine-duration, 5s) linear infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
