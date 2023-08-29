---
layout: wiki
wiki: sable
title: 快速开始
order: 0
beaudar:
  "issue-term": "Sable Admin"
---

## 介绍

### 运行环境配置

1. [nodejs](https://nodejs.org/en/) 版本需要在 14.x 以上
   > nodejs 是完全免费的，您不必为此支付任何资金
2. 本项目使用 [pnpm](https://pnpm.io/) 作为包管理工具，建议使用 pnpm 进行依赖的安装及其他操作

### 前置知识

1. 您需要了解 Vue3 的基础知识
2. ts 需要了解基础部分，您可以观看本站点的 [TypeScript 基础](/wiki/typescript) 来对 ts 进行初步了解
3. 需要会使用 git 进行代码拉取

### 如何加入

- [sable](https://www.github.com/Whbbit1999/sable)还在持续更新中，本项目欢迎您的参与。
- 本项目使用 MIT 开源协议，理论上您可以免费使用且不必担心版权问题。

## 代码获取与运行

```bash
git clone git@github.com:Whbbit1999/sable.git
```

依赖安装

```bash
pnpm i
```

依赖安装后，可以使用以下命令启动项目

```bash
pnpm run dev
```

## 目录说明

src 目录

- src/api/ 目录用来存放与后端交互的接口信息
- src/assets/ 用来存放项目静态文件
- src/components/ 目录放置自定义组件
- src/composables/ 放置 vue 可复用代码
- src/enum/ 用来放置项目中的静态变量
- src/layouts/ 用来放置项目布局文件
- src/plugins/ 项目使用的插件的配置
- src/router/ 路由及路由配置文件
- src/store/ pinia 公共数据
- src/styles/ 公共样式文件
- src/utils/ 公共工具函数
- src/views/ 页面

其他目录

- types/ 存放 ts 类型
- vite/ 存放 vite 配置文件
- public/ 项目公共静态资源
- mock/ mock 数据接口
