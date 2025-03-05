const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const prettier = require("eslint-plugin-prettier");

module.exports = [
  js.configs.recommended,
  {
    ignores: ["dist", "node_modules"],
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
      globals: {
        console: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        process: "readonly",
        __dirname: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "prettier/prettier": "error",
      "no-console": "off",
    },
  },
];
