import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  // JavaScript files
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        route: 'readonly',
        React: 'readonly'
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: pluginReact
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReact.configs.flat['jsx-runtime'].rules,
      ...eslintConfigPrettier.rules
    }
  },
  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        route: 'readonly',
        React: 'readonly'
      },
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        project: './tsconfig.json'
      }
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tseslint
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReact.configs.flat['jsx-runtime'].rules,
      ...tseslint.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      // Disable some TypeScript rules that conflict with React
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      // Allow any types for now (can be made stricter later)
      '@typescript-eslint/no-explicit-any': 'warn',
      // Disable prop-types for TypeScript files since we use TypeScript interfaces
      'react/prop-types': 'off',
      // Allow unescaped entities for now
      'react/no-unescaped-entities': 'off'
    }
  }
];
