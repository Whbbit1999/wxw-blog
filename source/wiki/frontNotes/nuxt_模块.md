---
layout: wiki
wiki: frontNotes
title: 模块使用
---

## 集成 tailwindcss

安装 tailwindcss

```shell
pnpm i @nuxtjs/tailwindcss
```

在 nuxt.config.ts 文件中配置

```ts nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
})
```

配置完成后，我们可以在 app.vue 文件中进行测试

```html app.vue
<template>
  <div class="bg-gray-200 h-screen flex items-center justify-center">app.vue</div>
</template>
```

页面成为下面的样式就说明我们已经成功将 tailwindcss 集成到我们的项目中了
![](/assets/wiki/Nuxt/Capture-2022-12-31-230703.png)
