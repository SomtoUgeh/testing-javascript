module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
  },
  plugins: ['react-hooks', 'testing-library'],
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'react-app',
    'plugin:testing-library/recommended',
    'plugin:testing-library/react',
  ],
  rules: {
    'no-console': 'warn',
    'react/prop-types': 'off',
    strict: ['error', 'never'],
    'consistent-return': 'off',
    'jsx-a11y/label-has-for': 'warn',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/accessible-emoji': 'warn',
    'import/no-unassigned-import': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'error',
    semi: ['error', 'always'],
    'no-undef': 1,
    'no-empty': 'warn',
    'no-func-assign': 1,
    'no-unreachable': 1,
    'no-invalid-regexp': 1,
    'no-unused-vars': 1,
    'testing-library/no-debug': 'warn',
    'testing-library/prefer-wait-for': 'error',
    'testing-library/prefer-screen-queries': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
