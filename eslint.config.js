import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsdocPlugin from 'eslint-plugin-jsdoc';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      jsdoc: jsdocPlugin,
    },
    rules: {
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
          },
        },
      ],
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-throws': 'warn',
    },
  },
];
