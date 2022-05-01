module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'off',
    curly: 'off',
  },
};
