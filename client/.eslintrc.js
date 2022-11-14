module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "plugin:prettier/recommended", "plugin:storybook/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
    tsconfigRootDir: __dirname
  },
  root: true,
  ignorePatterns: [".eslintrc.js"],
  env: {
    node: true,
    jest: true
  },
  plugins: ["react", "@typescript-eslint/eslint-plugin"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
};