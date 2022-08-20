module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-rational-order',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin'
  ],
  rules: {
    'string-quotes': 'single',
    'selector-class-pattern': null,
    'no-missing-end-of-source-newline': null,
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'order/properties-order': [],
    'plugin/rational-order': [true, {
      'border-in-box-model': false,
      'empty-line-between-groups': false
    }],
    'font-family-no-missing-generic-family-keyword': null
  }
}