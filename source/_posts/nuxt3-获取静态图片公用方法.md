---
topic: nuxt
title: nuxt3获取静态图片公用方法
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: nuxt3获取静态图片公用方法 #大标题
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-06-20 21:29:45
description:
cover: /assets/posts/nuxt3.jpg
banner: /assets/posts/nuxt3.jpg
references:
---

`utils/getAssetsImage.ts`

```ts
// 动态获取图片
export function getAssetsImage(src: string | undefined): string {
  if (!src) return ""
  const assets = import.meta.glob("~/assets/image/**/*", { eager: true, import: "default" })
  return assets[`/assets/image/${src}`] as string
}

export function getAssetsIcon(src: string | undefined): string {
  if (!src) return ""
  const assets = import.meta.glob("~/assets/icons/**/*", { eager: true, import: "default" })
  return assets[`/assets/icons/${src}`] as string
}
```

使用

```vue
<script setup>
import getAssetsImage from "~/utils/getAssetsImage"
</script>

<template>
  <img :src="getAssetsImage(card.bg)" alt="" />
</template>
```
