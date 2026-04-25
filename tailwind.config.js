/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🌞 Core Palette
        primary: "#FF7043",        // Vibrant Orange
        secondary: "#FFF3E0",      // Soft Peach
        background: "#FFFFFF",     // Pure White
        surface: "rgba(255,255,255,0.7)",

        // 🖤 Text System
        text: {
          main: "#1A1A1A",
          muted: "#71717A",
        },

        // 🎯 Optional semantic colors (recommended)
        accent: "#FF7043",
        borderSoft: "rgba(0,0,0,0.05)",
      },

      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Figtree'", "sans-serif"],
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.05)",
      },

      backdropBlur: {
        xs: "2px",
      },

      borderRadius: {
        pill: "9999px",
      },

      backgroundImage: {
        // 🍊 Gradient for progress / status
        "orange-gradient":
          "linear-gradient(90deg, #FFF3E0 0%, #FF7043 100%)",
      },
    },
  },
  plugins: [],
}