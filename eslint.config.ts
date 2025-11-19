import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import prettierPlugin from 'eslint-plugin-prettier';

const jsRecommended = js.configs.recommended;
const tsRecommended = tsPlugin.configs.recommended;
const reactRecommended = reactPlugin.configs.recommended ?? {};
const tailwindRecommended = tailwindPlugin.configs.recommended;
const prettierRecommended = prettierPlugin.configs?.recommended;

export default [
  {
    ignores: ['dist', 'build', 'coverage', 'node_modules'],
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      tailwindcss: tailwindPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...jsRecommended,
      ...tsRecommended,
      ...reactRecommended,
      ...tailwindRecommended,
      ...prettierRecommended,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
