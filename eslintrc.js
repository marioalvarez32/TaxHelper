module.exports = {
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
  },
};
