---
layout: wiki
wiki: video-point
title: NuxtUI示例
---

[NuxtUI](https://ui.nuxt.com/) 是 Nuxt 团队出品的一套 UI 组件库。

从今天开始让我们一起来学习一下这套组件库要怎么使用吧。

## 环境搭建 -- Nuxt3 环境搭建

我们要先创建一个 Nuxt 项目

```bash
pnpm dlx nuxi@latest init nuxt-ui-template
```

进入项目并安装依赖

```bash
cd nuxt-ui-template && pnpm i
```

安装 NuxtUI

```bash
pnpm add @nuxt/ui
```

配置`nuxt.config.ts`

```ts nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
})
```

在 app.vue 中搞一个 button 组建看看先

```html app.vue
<template>
  <div>
    <UButton>button</UButton>
  </div>
</template>
```

启动项目

```bash
pnpm run dev
```

如果出现了这个按钮，就说明我们成功配置了 NuxtUI。我们先看看 Nuxt 官方的几个项目来看下这个组件库有多好看吧。

## 实例预览

### [volta](https://volta.net/)

### [NuxtLabs](https://nuxt.studio/)

## 组件配置 -- 配置项配置

我们可以创建一个 app.config.ts 作为 NuxtUI 的配置文件。可以配置组件的一些基本行为，像是按钮的圆角、颜色等。

我们这里配置一个经典的橙黑配色

```ts app.config.ts
export default defineAppConfig({
  ui: {
    primary: "orange",
    gray: "neutral",

    button: {
      rounded: "rounded-sm",
    },
  },
})
```

## 具体组件使用

## 实战 -- 我的世界资源站点

具体实战部分我们跳转到下一个系列，[我的世界资源站点](/wiki/%E6%8A%80%E6%9C%AF%E8%A7%86%E9%A2%91%E9%80%90%E5%AD%97%E7%A8%BF/%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C%E8%B5%84%E6%BA%90%E7%AB%99%E7%82%B9.html)
