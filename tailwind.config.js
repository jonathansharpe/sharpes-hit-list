/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	  '.index.html',
	  './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
		fontFamily: {
			'manrope': ['Manrope', 'sans-serif']
		},
	},
  },
  plugins: [],
}

