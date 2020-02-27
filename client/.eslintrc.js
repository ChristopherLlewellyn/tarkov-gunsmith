module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    camelcase: 'off',
    'no-undef': 'off',
    'import/no-cycle': 'off',
    'consistent-return': 'off',
    'no-unused-vars': 'off',
    'vue/no-parsing-error': 'off',
    'no-plusplus': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'no-restricted-globals': 'off',
    'no-unused-expressions': 'off',
    'no-alert': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
