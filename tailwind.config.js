const colors = require('tailwindcss/colors')

module.exports = {
	theme: {
		colors: {
			...colors,
		},
	},
	content: ['./src/modules/**/*.js', './src/shared/**/*.js'],
	corePlugins: {
		preflight: false,
	},
}
