## 项目简介

小兔鲜儿项目包含从首页浏览商品，商品详情，微信登录，加入购物车，提交订单，微信支付，订单管理等功能。

当前仓库为小兔鲜儿的**项目模板**。

### 技术栈

- 前端框架：[uni-app](https://uniapp.dcloud.net.cn/) (Vue3 + TS + Setup)
- 状态管理：[pinia](https://pinia.vuejs.org/zh/)
- 组件库：[uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html)

## 资料说明

### 📀 视频学习

[https://www.bilibili.com/video/BV1Bp4y1379L/](https://www.bilibili.com/video/BV1Bp4y1379L/?share_source=copy_web&vd_source=2ac50d29193927b3c8597537dc4bc81d)

### 📗 接口文档

[https://www.apifox.cn/apidoc/shared-0e6ee326-d646-41bd-9214-29dbf47648fa/](https://www.apifox.cn/apidoc/shared-0e6ee326-d646-41bd-9214-29dbf47648fa/)

### ✏️ 在线笔记

[https://megasu.gitee.io/uni-app-shop-note/](https://megasu.gitee.io/uni-app-shop-note/)

### 📦 项目源码

[https://gitee.com/Megasu/uniapp-shop-vue3-ts/](https://gitee.com/Megasu/uniapp-shop-vue3-ts/)


## 使用cli创建uniapp项目
https://uniapp.dcloud.net.cn/quickstart-cli.html

```bash
# 创建vite + vue3 + ts uniapp项目
npx degit dcloudio/uni-preset-vue#vite-ts 项目名
```

## 如果创建的项目版本和 HBuilder X 版本不一致，cli的版本更低，导致如下报错
本应用使用HbuilderX4.07或对应的cli版本编绎，而手机端sdk版本是4.15。不匹配的版本可能造成应用异常

cli中的版本在package.json中查看，如 "@dcloudio/uni-app": "3.0.0-alpha-4010520240507001", 版本号即为 4.105

```shell
# 使用此命令 更新到最新正式版
npx @dcloudio/uvm@latest
# 更新到正式版指定版本
npx @dcloudio/uvm@latest 3.2.0
# 或
npx @dcloudio/uvm@latest 3.2.12.20211029

# 使用此命令 更新到最新 Alpha 版
npx @dcloudio/uvm@latest alpha
# 更新到 Alpha 版指定版本
npx @dcloudio/uvm@latest 3.2.0-alpha
# 或
npx @dcloudio/uvm@latest 3.2.14.20211112-alpha
```

## 安装vscode插件更好的支持uniapp开发
- Vue - Official
- uni-create-view
- uni-helper
- uniapp小程序扩展

## 运行程序

1. 安装依赖

```shell
# npm
npm i --registry=https://registry.npmmirror.com

# pnpm
pnpm i --registry=https://registry.npmmirror.com
```
增加一些依赖
```shell
# 安装一堆开发依赖
yarn add @types/node @dcloudio/uni-vue-devtools@3.0.0-alpha-4010520240507001 @rushstack/eslint-patch @vue/eslint-config-typescript eslint eslint-plugin-vue husky lint-staged miniprogram-api-typings prettier sass -D

#安装uniapp官方ui库 uniui
# https://uniapp.dcloud.net.cn/component/uniui/quickstart.html
npm i @dcloudio/uni-ui   或   yarn add @dcloudio/uni-ui
# uniui 需要在pages.json 并添加 easycom 节点 实现组件自动导入
# pages.json
{
	"easycom": {
		"autoscan": true,
		"custom": {
			// uni-ui 规则如下配置
			"^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
		}
	},
	
	// 其他内容
	pages:[
		// ...
	]
}

# 安装 uni-ui类型申明文件
yarn add @uni-helper/uni-ui-types -D
#https://www.npmjs.com/package/@uni-helper/uni-ui-types
# 配置 tsconfig.json，确保 compilerOptions.types 中含有 @dcloudio/types、@uni-helper/uni-app-types 和 @uni-helper/uni-ui-types，且 include 包含了对应的 vue 文件
{
  "compilerOptions": {
    "types": [
      "@dcloudio/types",
      "@uni-helper/uni-app-types",
      "@uni-helper/uni-ui-types"
    ]
  },
}

# 安装生依赖 pinia 及实现pinia数据持久化
yarn add pinia pinia-plugin-persistedstate -S
# https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMemberStore = defineStore(
  'member',
  () => {
    const profile = ref<any>()
    const setProfile = (val: any) => {
      profile.value = val
    }
    return {
      profile,
      setProfile
    }
  },
  // TODO: 持久化
  {
    // persist: true // 开启数据持久化, 此方案只适用于h5网页端
    persist: {
      storage: {
        // 改用uniapp的存储方式
        getItem: (key: string) => uni.getStorageSync(key),
        setItem: (key: string, value: any) => uni.setStorageSync(key, value)
      }
      // paths: ['profile'] // 需要持久化的数据
    }
  }
)
```

增加以下配置文件

.prettierrc.json
```json
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 85,
  "trailingComma": "none",
  "tabWidth": 2,
  "useTabs": false,
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "arrowParens": "always",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "ignore",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto"
}

```

.eslintrc.cjs
```js
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
```

.editorconfig
```bash
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

2. 运行程序

```shell
# 微信小程序端
npm run dev:mp-weixin

# H5端
npm run dev:h5

# App端
需 HbuilderX 工具，运行 - 运行到手机或模拟器
```

3. 微信开发者工具导入 `/dist/dev/mp-weixin` 目录

### 工程结构解析

```
├── .husky                     # Git Hooks
├── .vscode                    # VS Code 插件 + 设置
├── dist                       # 打包文件夹（可删除重新打包）
├── src                        # 源代码
│   ├── components             # 全局组件
│   ├── composables            # 组合式函数
│   ├── pages                  # 主包页面
│       ├── index               # 首页
│       ├── category            # 分类页
│       ├── cart                # 购物车
│       ├── my                  # 我的
│       └── login               # 登录页
│   ├── services               # 所有请求
│   ├── static                 # 存放应用引用的本地静态资源的目录
│       ├── images              # 普通图片
│       └── tabs                # tabBar 图片
│   ├── stores                 # 全局 pinia store
│       ├── modules             # 模块
│       └── index.ts            # store 入口
│   ├── styles                 # 全局样式
│       └── fonts.scss          # 字体图标
│   ├── types                  # 类型声明文件
│       └── component.d.ts      # 全局组件类型声明
│   ├── utils                  # 全局方法
│   ├── App.vue                # 入口页面
│   ├── main.ts                # Vue初始化入口文件
│   ├── pages.json             # 配置页面路由等页面类信息
│   ├── manifest.json          # 配置appid等打包信息
│   └── uni.scss               # uni-app 内置的常用样式变量
├── .editorconfig              # editorconfig 配置
├── .eslintrc.cjs              # eslint 配置
├── .prettierrc.json           # prettier 配置
├── .gitignore                 # git 忽略文件
├── index.html                 # H5 端首页
├── package.json               # package.json 依赖
├── tsconfig.json              # typescript 配置
└── vite.config.ts             # vite 配置
```
