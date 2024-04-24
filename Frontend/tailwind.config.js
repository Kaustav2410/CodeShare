/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily:{
      Outfit:["Outfit"]
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors:{
        'blackish':'#1e1e1e',
        'grey':'#364153',
        'greyish':'#CED6E1',
        'white':'#FFFFFE',
        'blue':'#406AFF',
        'violet':'#b787f5',
        'dark_violet':'#743ee4'
      },
      backgroundImage: {
        'hero-pattern': "url('/src/media/Hero-Background-notecode@2x.png')",
        
      }
    },
  },
  plugins: [], 
};
