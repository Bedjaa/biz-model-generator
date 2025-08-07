module.exports = {
  env: { browser: true, es2023: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  settings: { react: { version: 'detect' } },
  parserOptions: { sourceType: 'module' },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
