/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dormy: {
          primary: '#1C8567',
          highlight: '#cd0000',
          text: '#212529',
          light: '#f8f9fa',
          muted: '#6c757d'
        }
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'morph': '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
        'morph-hover': '10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff'
      }
    },
  },
  plugins: [],
}