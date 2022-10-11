module.exports = {
	parserOptions: {
		ecmaVersion: 2018,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	plugins: ['sort-imports-es6-autofix', 'jsx-a11y'],
	extends: ['plugin:react/recommended', 'react-app', 'plugin:prettier/recommended', 'prettier'],
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
