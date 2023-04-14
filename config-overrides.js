const {
	addLessLoader,
	disableEsLint,
	fixBabelImports,
	override,
	adjustStyleLoaders,
	addPostcssPlugins,
} = require('customize-cra')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const configOverrides = {
	webpack: (config, env) => config,
	jest: (config) => config,
}

module.exports = {
	webpack: override(
		fixBabelImports('import', {
			libraryName: 'antd',
			libraryDirectory: 'es',
			style: true,
		}),
		addLessLoader({
			lessOptions: {
				javascriptEnabled: true,
				modifyVars: {
					'@font-family': 'Roboto, sans-serif',
					'@primary-color': '#227abd',
				},
			},
		}),
		adjustStyleLoaders(({ use: [, , postcss] }) => {
			const postcssOptions = postcss.options
			postcss.options = { postcssOptions }
		}),
		addPostcssPlugins([require('tailwindcss')]),
		disableEsLint(),
		(config, env) => {
			const customConfig = configOverrides.webpack(config, env)

			/* The MiniCssExtractPlugin doesn't take kindly to us having two Less loaders, but in our
			 * particular case, CSS file ordering appears correct in build outputs and we can afford to
			 * disable the ordering warning. We only need to do so in production configs, though. The
			 * development config doesn't have the plugin. */
			const miniCssPlugin = customConfig.plugins.find((plugin) => plugin instanceof MiniCssExtractPlugin)
			if (miniCssPlugin) {
				miniCssPlugin.options.ignoreOrder = true
			}

			return customConfig
		}
	),
	jest: (config) => configOverrides.jest(config),
}
