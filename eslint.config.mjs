import vue from 'eslint-plugin-vue';
import ts from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import parserVue from 'vue-eslint-parser';
import parserTs from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      parser: parserVue,
      parserOptions: {
        parser: parserTs,
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': ts,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Правила из eslint-plugin-vue для Vue 3
      'vue/no-unused-vars': 'error',
      'vue/require-default-prop': 'off',
      // Правила из @typescript-eslint
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'sql/**'],
  },
];