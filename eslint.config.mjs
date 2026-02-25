import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig(
    // Ignore build artifacts
    {
        ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**'],
    },

    // Base JavaScript recommended rules
    eslint.configs.recommended,

    // TypeScript recommended rules (including type-checked set)
    tseslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,

    // Project-specific customizations and legacy rule migration
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                // Enable type-aware linting using your tsconfig
                projectService: true,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            // Core style rules migrated from .eslintrc.json
            'space-before-function-paren': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'semi': 'off',
            'quotes': ['error', 'single'],
            'key-spacing': ['error', {
                beforeColon: false,
                afterColon: true,
                mode: 'strict',
            }],
            'indent': ['error', 4, {
                VariableDeclarator: 1,
                SwitchCase: 1,
            }],
            'lines-between-class-members': ['error', 'always', {
                exceptAfterSingleLine: true,
            }],
            'keyword-spacing': ['error', {
                overrides: {
                    this: { before: false },
                },
            }],
            'object-curly-spacing': ['error', 'always'],

            // TypeScript-specific rules migrated and aligned with modern best practices
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/consistent-type-assertions': 'off',
            '@stylistic/member-delimiter-style': ['error', {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'comma',
                    requireLast: false,
                },
            }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/type-annotation-spacing': ['error', {
                before: false,
                after: true,
            }],
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-import-type-side-effects': 'error',
            // Replace obsolete brace-rules/brace-on-same-line with core brace-style
            'brace-style': ['error', 'allman', { allowSingleLine: true }],
        },
    },
);
