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
  plugins: ['react-hooks'],
  extends: ['eslint:recommended', 'eslint-config-prettier', 'react-app'],
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
    'no-undef': 'off',
    'no-empty': 'warn',
    'no-func-assign': 1,
    'no-unreachable': 1,
    'no-invalid-regexp': 1,
    'no-unused-vars': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
