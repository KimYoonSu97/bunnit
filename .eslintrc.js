module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // TypeScript 사용하지 않는 변수 에러 끄기
    'no-unused-vars': 'off', // JavaScript 사용하지 않는 변수 에러 끄기
  },
};
