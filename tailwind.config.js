/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'sans' anahtarını ezerek projenin varsayılan fontunu Inter yapıyoruz.
        sans: ['Poppins', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}