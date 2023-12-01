/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	  '.index.html',
	  './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
		fontFamily: {
			'manrope': ['Manrope', 'sans-serif'],
			'dmSans': ['DM Sans', 'sans-serif'],
			'dmSerifDisplay': ['DM Serif Display', 'serif'],
			'workSans': ['Work Sans', 'sans-serif'],
			'poppins': ['Poppins', 'sans-serif'],
			'syne': ['Syne', 'sans-serif'],
			'spaceGrotesk': ['Space Grotesk', 'sans-serif'],
			'youngSerif': ['Young Serif', 'serif'],
			'ibmPlexSans': ['IBM Plex Sans', 'sans-serif'],
			'rubik': ['Rubik', 'sans-serif'],
		},
		transitionProperty: {
			'width': 'width',
			'height': 'height',
		}
	},
  },
  plugins: [],
}

