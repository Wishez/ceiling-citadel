module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
    // 'html'
  ],
  // add your custom rules here
  rules: {
    "no-undef": 1,
    "no-unused-vars": 1,
    "eqeqeq": [2, "smart"],
    "no-floating-decimal": 2,
    "no-multi-spaces": [2, {
      "exceptions": {
        "ImportDeclaration": true,
        "VariableDeclarator": true
      }
    }],
    "no-multi-str": 2,
    "camelcase": 1,
    "eol-last": 1,
    "indent": [2, 2, {
      "SwitchCase": 1,
      "VariableDeclarator": 1
    }],
    "quotes": [2, "double", "avoid-escape"],
    "semi": [2, "always"],
    "space-before-blocks": 2,
    "space-before-function-paren": [2, "never"],
    "constructor-super": 2,
    "arrow-spacing": 2,
    "no-console": 0,
    "no-useless-escape": 0
  }
}
