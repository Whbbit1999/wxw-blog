---
title: vite使用
tags: [vite, 前端工程化]
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:41:11
description:
cover:
banner:
---

vite 简易使用指南

<!-- more -->

> [vite](https://vitejs.dev/)

vite 的基本使用

## 使用 vite 创建项目

使用 pnpm

```shell
pnpm create vite
```

使用官方的模版

```shell
pnpm create vite vite-program -- --template vue-ts
```

生成好项目后你可以看到项目中有一个 `vite.config.ts`的文件，在这里我们可以进行一系列的配置

## 配置路径别名

安装类型声明文件

```bash
pnpm i -D @type/node
```

将 `@` 指向 `src` 文件

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
```

## 配置代理

```js
export default defineConfig({
  server: {
    proxy: {
      // string shorthand
      "/foo": "http://localhost:4567",
      // with options
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // with RegEx
      "^/fallback/.*": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
      // Using the proxy instance
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy'
        },
      },
      // Proxying websockets or socket.io
      "/socket.io": {
        target: "ws://localhost:3000",
        ws: true,
      },
    },
  },
});
```

## 配置项目端口及自动启动

```js
export default defineConfig({
  server: {
    port: 3030, // 服务启动端口
    open: true, // 服务启动自动打开默认浏览器
  },
});
```

## 配置插件

### 在 Vue.js 中写 Jsx

```bash
pnpm i -D @vitejs/plugin-vue-jsx
```

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```
