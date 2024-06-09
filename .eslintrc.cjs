/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  // 小程序全局变量
  globals: {
    uni: true,
    wx: true,
    WechatMiniprogram: true,
    getCurrentPages: true,
    getApp: true,
    UniApp: true,
    UniHelper: true,
    App: true,
    Page: true,
    Component: true,
    AnyObject: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        printWidth: 100,
        trailingComma: 'all',
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    'vue/no-deprecated-html-element-is': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],

    //  生产环境不允许控制台输出，开发允许允许控制台输出。
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0, // 不允许函数的()前有空格 （0为关闭这个条规则）
    'vue/no-multiple-template-root': 0, // 不允许向模版添加多个根节点 （0为关闭这个条规则）
    '@typescript-eslint/no-empty-function': 0, //不允许出现空的函数 （0为关闭这个条规则）
    '@typescript-eslint/no-explicit-any': [0], // 不允许使用any （0为关闭这个条规则）
    '@typescript-eslint/no-var-requires': 0, // 项目中不允许使用 require()语法。 （0为关闭这个条规则）
    semi: 0, // 关闭语句结尾分号 （0为关闭这个条规则）
    quotes: [2, 'single'], //使用单引号
    'prefer-const': 2, // 不变的变量一定要使用const （2为开启这条规则）
    // '@typescript-eslint/no-unused-vars': 0, // 不允许出现未使用过的变量 （0为关闭这个条规则）
    '@typescript-eslint/no-inferrable-types': 0, // 不允许变量后面添加类型 （0为关闭这个条规则）
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          //允许使用空括号
          '{}': false
        },
        extendDefaults: true
      }
    ]
  }
}
