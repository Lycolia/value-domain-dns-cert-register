const eslint = require('@eslint/js');
const eslintTypeScript = require('typescript-eslint');
const eslintJest = require('eslint-plugin-jest');
const eslintLycolia = require('@lycolia/eslint-config');
const eslintPrettier = require('eslint-config-prettier');

module.exports = eslintTypeScript.config(
  eslint.configs.recommended,
  ...eslintTypeScript.configs.recommended,
  eslintJest.configs['flat/style'],
  eslintJest.configs['flat/recommended'],
  eslintLycolia,
  eslintPrettier,
  {
    ignores: [
      'dist/*',
      'coverage/*',
      '**/*.d.ts',
      '/src/public/',
      '/src/type',
      '*.config.js'
    ],
    languageOptions: {
      parser: eslintTypeScript.parser,
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  }
);
