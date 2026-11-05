import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      ".archify/**",
      "**/.next/**",
      "**/coverage/**",
      "**/dist/**",
      "graphify-out/**",
      "**/node_modules/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);

