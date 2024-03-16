---
title: vue3自动引入图标
tags: [vite使用]
categories: [代码人生, 前端技术]
poster:
  topic: #标题上方的小字
  headline: vue3自动引入图标 #大标题
  caption: #标题下方的小字
  color: #标题颜色
references:
date: 2023-02-05 12:27:31
description:
cover: /assets/posts/vue-cover.jpg
banner: /assets/posts/vue-cover.jpg
---

使用插件自动引入 svg 图标

<!-- more -->

## 依赖安装

```bash
pnpm i -D unplugin-icons vite-plugin-svg-icons @vitejs/plugin-vue
```

## 配置 vite.config.ts 文件

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

import { resolve } from "path";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// svg存放地址
const customIconPath = resolve(process.cwd(), "src/assets/svg");

export default defineConfig({
  return {
     plugins:  [
      vue(),
      Components({
        // auto import components 自动加载组件
        resolvers: [
          NaiveUiResolver(),
          IconsResolver({
            customCollections: ["custom"],
            componentPrefix: "icon",
          }),
        ],
        dts: false,
      }),
      Icons({
        compiler: "vue3",
        customCollections: {
          custom: FileSystemIconLoader(customIconPath),
        },
        scale: 1,
        defaultClass: "inline-block",
      }),
      createSvgIconsPlugin({
        iconDirs: [customIconPath],
        symbolId: "icon-custom-[dir]-[name]",
        inject: "body-last",
        customDomId: "__CUSTOM_SVG_ICON__",
      }),
    ],
  };
});
```

{% quot 在这里我们为什么要使用 `process.cwd()`呢？%}

{% note `__dirname和process.cwd()的区别`

```js
const { resolve } = require("path")

const dirnamePath = resolve(__dirname, "")
console.log(dirnamePath)
const pwdPath = resolve(process.cwd())
console.log(pwdPath)
```

输出结果是：

```txt
/Users/wangmou/workspace/whbbit-blog/wxw-blog/scripts
/Users/wangmou/workspace/whbbit-blog/wxw-blog
```

我们可以看到，`__dirname` 是命令执行目录，`process.cwd()` 是执行命令的 js 所的在目录
%}

## 使用

假设 assets/svg 文件夹中包含 logo.svg 和 menu.svg 两个 svg 图标。我们可以直接使用 `icon-custom-文件名` 来使用

```html
<template>
  <icon-custom-logo />
  <icon-custom-menu />
</template>
```
