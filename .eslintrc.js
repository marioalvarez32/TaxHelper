module.exports = {
  "env": {
    es2021: true,
    node: true,
    browser: true,
  },
  "extends": [
    "plugin:vue/vue3-essential",
    'standard-with-typescript'
  ],
  "overrides": [],
  "parserOptions": {
    parser: '@typescript-eslint/parser',
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": [
      "tsconfig.json"
    ]
  },
  "plugins": [
    "vue",
    '@typescript-eslint',
    'import',
    'node',
    'promise',
    'standard'
  ],
  "rules": {
    "semi": "off",
    "@typescript-eslint/semi": "off",
    "space-before-function-paren": "off"
  }
}