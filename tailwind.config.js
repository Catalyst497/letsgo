/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        btnBg: "linear-gradient(to right, #ED9900, #FFA500)",
        bgHero: "url('/Hero-full.png')",
        bgAbout: "url('/About-full.png')",
      },
      colors: {
        forestGreen: "#228B22",
        darkGray: "#6D7175",
        warmOrange: "#FFA500",
        softGreen: "#98FB98",
        woodColor: "#F5E3C8",
        lightGray: "#D1D1D1",
        gainsboro: "#DCDCDC",
        sandyBrown: "#F4A460",
        steelBlue: "#B0C4DE",
        darkSlateGray: "#2F4F4F",
      },
      spacing: {
        sectionPad: "4.8rem",
        mobSectionPad: "0.625rem",
      },
    },
    fontFamily: {
      openSans: "Open Sans, sans-serif",
      poppins: "Poppins, sans-serif",
    },
  },
  plugins: [],
};
