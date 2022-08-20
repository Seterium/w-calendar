module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2021': true,
    'node': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    'parser': '@typescript-eslint/parser',
    'ecmaVersion': 2021,
    'extraFileExtensions': ['.vue']
  },
  rules: {
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2, {'SwitchCase': 1}],
    'no-console': 0,
    'no-debugger': 'warn',
    'semi': [2, 'never'],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'vue/no-v-html': 0,
    'vue/html-self-closing': 0,
    'no-unused-vars': 'warn',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/multi-word-component-names': 0,
    'vue/max-attributes-per-line': [
      'error',
      {
        'singleline': {
          'max': 1
        },
        'multiline': {
          'max': 1
        }
      }
    ]
  }
}