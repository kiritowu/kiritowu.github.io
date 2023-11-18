/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				heading: ['"Skavi 27px"', '"Roboto Slab"', 'serif'],
				main: ['Roboto', 'Helvetica', 'Open Sans', 'Arial', 'sans-serif'],
				mono: ['"Source Code Pro"', 'monospace']
			},
			colors: {
				primary: {
					light: '#07004D',
					DEFAULT: '#07004D'
				},
				secondary: {
					light: '#2D82B7',
					DEFAULT: '#2D82B7'
				},
				accent: {
					light: '#42E2B8',
					DEFAULT: '#42E2B8'
				},
				danger: {
					light: '#EB8A90',
					DEFAULT: '#EB8A90'
				},
				white: '#FFFFFF',
				gray: colors.neutral
			}
		}
	},
	plugins: []
};
