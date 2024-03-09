---
title: vue3批量注册自定义指令
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: vue3批量注册自定义指令 #大标题
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-03-07 20:23:27
description:
cover: /assets/posts/vue-cover.png
banner: /assets/posts/vue-cover.png
references:
  - "[自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html)"
---

自定义指令可以方便的复用一些需要操作 DOM 的逻辑

<!-- more -->

创建一个 directives 文件夹，用来存放自定义指令，目录结构如下：

```
├── index.ts
└── permission.ts
```

permission.ts

```ts
import type { Directive } from "vue"
import { ref, watchEffect } from "vue"

function hasIntersection(arr1: any[], arr2: any[]) {
  const map = new Map()
  arr1.forEach((item) => map.set(item, true))
  return arr2.some((item) => map.get(item))
}
const userPermission = ["read"]

export default {
  created(el: HTMLButtonElement, binding) {
    const { value } = binding
    const buttonPermission = Array.isArray(value) ? value : [value]
    const visible = ref(false)

    watchEffect(() => {
      visible.value = hasIntersection(userPermission, buttonPermission)
    })

    el.style.display = visible.value ? "" : "none"
  },
} as Directive
```

index.ts

```ts
import type { App, Directive } from "vue"

import permission from "./permission"

const directives = {
  permission,
} as Record<string, Directive>

export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      console.log(key)
      app.directive(key, directives[key])
    })
  },
}
```

在 main.ts 中注册自定义指令

```ts
import { createApp } from "vue"
import App from "./App.vue"
import directives from "./directives"

function bootstrap() {
  const app = createApp(App)

  app.use(directives)

  app.mount("#app")
}

bootstrap()
```

在页面中使用

```vue
<script setup lang="ts"></script>

<template>
  <div>
    <button v-permission="['read1']">hidden</button>
    <button v-permission="['read']">block</button>
  </div>
</template>

<style scoped></style>
```
