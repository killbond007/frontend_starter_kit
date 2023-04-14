module.exports = {
	parserOptions: {
		sourceType: 'module',
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	ecmaFeatures: {
		modules: true,
		spread: true,
		restParams: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	plugins: ['sort-imports-es6-autofix', 'react-hooks'],
	extends: ['plugin:prettier/recommended', 'prettier', 'react-app'],
	rules: {
		'import/no-anonymous-default-export': 0,
		'import/no-named-as-default': 0,
		'import/no-named-as-default-member': 0,
		'react-hooks/exhaustive-deps': [
			'warn',
			{
				additionalHooks: '(usePostMountEffect)',
			},
		],
		'no-console': [1, { allow: ['error', 'info'] }],
		'import/order': 'error',
		'sort-imports-es6-autofix/sort-imports-es6': 'error',
	},
}
