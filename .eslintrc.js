module.exports = {
  env: {
    commonjs: true,
    es2022: true,
    jest: true,
    browser: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
