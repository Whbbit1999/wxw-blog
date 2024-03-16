---
title: 浅尝histoire
tags: []
categories: []
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2024-03-14 20:08:00
description:
cover:
banner:
references:
  - "[histoire](https://histoire.dev/)"
---

<!-- https://storybook.js.org/docs/get-started -->

安装 histoire

```shell
pnpm i -D histoire @histoire/plugin-vue
```

创建 `histoire.config.ts` 配置文件

```ts
import { defineConfig } from "histoire"
import { HstVue } from "@histoire/plugin-vue"

export default defineConfig({
  plugins: [HstVue()],
})
```

添加启动命令

- `histoire dev` 开发环境启动
- `histoire build` 打包
- `histoire preview` 打包并预览打包结果

```json
{
  "scripts": {
    "story:dev": "histoire dev",
    "story:build": "histoire build",
    "story:preview": "histoire preview"
  }
}
```

## 编写 story

使用.story.vue 结尾的文件会被 histoire 自动识别为 story 组件，该文件中只需要再根节点使用 Story 标签即可

```vue
<script lang="ts" setup>
import HelloWorld from "./HelloWorld.vue"
</script>

<template>
  <Story>
    <HelloWorld msg="Hello Vue 3 + Vite" />
  </Story>
</template>
```
