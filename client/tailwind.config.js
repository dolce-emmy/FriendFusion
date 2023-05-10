/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      satisfy: ["satisfy"],
      roboto: ["roboto"],
      raleway: ["raleway"],
      montserrat: ["montserrat"],
      lato: ["lato"],
      poppins: ["poppins"],
    },
    backgroundColor: {
      primary: "#F5F5F5",
      secondary: "#E5E5E5",
      navyBlue: "#0A192F",
      
    }
  },
  plugins: [],
}

