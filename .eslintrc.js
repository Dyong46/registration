module.exports = {
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ["node_modules"],
	overrides: [
		{
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "tsconfig.json",
				sourceType: "module"
			},
			plugins: ["@typescript-eslint/eslint-plugin"],
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:prettier/recommended"
			],
			rules: {
				"@typescript-eslint/explicit-function-return-type": "off",
				"@typescript-eslint/explicit-module-boundary-types": "off"
			}
		},
		{
			files: ["**/*.js"],
			extends: ["eslint:recommended", "plugin:prettier/recommended"]
		}
	]
};
