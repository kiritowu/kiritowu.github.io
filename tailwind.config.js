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
					light: '#162E5C',
					DEFAULT: '#162E5C'
				},
				secondary: {
					light: '#4682CD',
					DEFAULT: '#4682CD'
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
