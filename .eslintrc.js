module.exports = {
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2018
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'off'
	}
};
