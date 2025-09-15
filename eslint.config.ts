

// eslint.config.ts
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  //ignore files and folders 
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      "public",
      "scripts",
      "*.config.js",
      "*.config.cjs",
      "*.config.mjs",
      "*.config.ts",
      "vite.*.ts",
    ],
  },

  // Base JS rules
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
  },

  // JS recommended
  js.configs.recommended,

  // TypeScript recommended
  ...tseslint.configs.recommended,

  // React recommended
  pluginReact.configs.flat.recommended,

  // Custom rules & plugins
  {
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          "patterns": [{ "regex": "^@mui/[^/]+$" }]
        }
      ],
      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React Refresh rules
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // React rules
      "react/react-in-jsx-scope": "off", // ไม่ต้อง import React ใน JSX
      "react/prop-types": "off", // ใช้ TS ไม่ต้องใช้ prop-types
      "@typescript-eslint/no-empty-object-type": ["warn"], // อนุญาตให้ใช้ {} เป็น type

      // Prettier config (optional)
      ...prettier.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
