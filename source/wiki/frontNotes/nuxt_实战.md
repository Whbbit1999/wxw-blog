---
layout: wiki
wiki: frontNotes
title: 项目实战——博客项目
---

<!-- TODO：假数据生成网站
依赖： mockjs + naive ui -->

<!--
1. 对mockjs的文档界面
2. 添加选项生成对应文档页面
3. 生成
 -->

实战部分我们使用 Nuxt3 实现一个博客项目

**使用到的 Nuxt 模块**
`@nuxtjs/tailwindcss`：用户编写页面样式
{% link https://nuxt.com/modules/tailwindcss %}
`@nuxt/content`：用于解析 markdown 文件
{% link https://nuxt.com/modules/content %}

## 项目初始化

初始化博客项目

```shell
pnpm dlx nuxi init nuxt-blog
```

```shell
cd nuxt-blog && pnpm i
```

依赖安装

```shell
pnpm i @nuxtjs/tailwindcss @nuxt/content
```

```shell
pnpm i -D sass
```

配置 `nuxt.config.ts`文件

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "@nuxt/ui"],
  highlight: {
    theme: "vitesse-dark",
  },
})
```

## 创建布局文件

## 创建 content 文件夹——存放 markdown 文件
