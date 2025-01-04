// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts"],
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  rules: {
    "sort-keys": "off",
    "no-unused-vars": "off",
    "new-cap": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_", // Ignora los parámetros con guion bajo
        varsIgnorePattern: "^_", // Ignora las variables con guion bajo
      },
    ],
  },
});
