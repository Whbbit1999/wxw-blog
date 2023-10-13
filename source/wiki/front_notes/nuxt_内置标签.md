---
layout: wiki
wiki: frontNotes
title: 常用内置标签
order: 5003
---

## NuxtLink

NuxtLink 会被编译为 a 标签

```html
<template>
  <NuxtLink to="https://whbbit.cn">whbbit</NuxtLink>
  <!-- 编译后：<a href="https://whbbit.cn"  rel="noopener noreferrer">whbbit</a> -->
  <NuxtLink to="/api">API</NuxtLink>
  <!-- 编译后：<a href="/api">API</a> -->
</template>
```

NuxtLink 包含有 target，rel，noRel 属性

```html
<template>
  <NuxtLink to="https://twitter.com/nuxt_js" target="_blank">
    Nuxt Twitter
  </NuxtLink>
  <!-- <a href="https://twitter.com/nuxt_js" target="_blank" rel="noopener noreferrer">...</a> -->

  <NuxtLink to="https://discord.nuxtjs.org" target="_blank" rel="noopener">
    Nuxt Discord
  </NuxtLink>
  <!-- <a href="https://discord.nuxtjs.org" target="_blank" rel="noopener">...</a> -->

  <NuxtLink to="https://github.com/nuxt" no-rel> Nuxt GitHub </NuxtLink>
  <!-- <a href="https://github.com/nuxt">...</a> -->

  <NuxtLink to="/contact" target="_blank">
    Contact page opens in another tab
  </NuxtLink>
  <!-- <a href="/contact" target="_blank" rel="noopener noreferrer">...</a> -->
</template>
```

路由可以匹配 NuxtLink 的 to 属性时，NuxtLink 编译后会被追加`router-link-exact-active`类。可以使用 `.router-link-exact-active` 控制 NuxtLink 的高亮样式。

```html layout/default.vue
<template>
  <nav>
    <NuxtLink to="/">首页</NuxtLink>
    <NuxtLink to="/getstart">新手入门</NuxtLink>
    <NuxtLink to="/api">API</NuxtLink>
    <NuxtLink to="/about">关于</NuxtLink>
  </nav>
  <main>
    <slot />
  </main>
</template>

<style>
  .router-link-exact-active {
    color: #12b488;
  }
</style>
```

## NuxtLayout

Nuxt 内置的布局标签，使用 name prop 来调用对应的布局

编写默认布局

```html layout/default.vue
<template>
  <div>
    default layout
    <slot />
  </div>
</template>
```

编写 docs 布局

```html layout/docs.vue
<template>
  <div>
    docs layout
    <slot />
  </div>
</template>
```

使用默认布局

```html app.vue
<template>
  <NuxtLayout>app.vue</NuxtLayout>
</template>
```

使用 docs 布局

```html app.vue
<template>
  <NuxtLayout name="docs"> app.vue </NuxtLayout>
</template>
```

## ClientOnly

<!-- TODO: ClientOnly -->

包裹只在客户端展示的代码片段

```html
<template>
  <ClientOnly></ClientOnly>
</template>
```

## \<NuxtLoadingIndicator \/\> 提供网页顶部加载效果

提供网页顶部加载效果

### 示例

```html layout/default.vue
<script lang="ts" setup></script>

<template>
  <nav class="bg-gray-700">
    <NuxtLoadingIndicator />

    <div class="container m-auto flex w-full justify-between items-center">
      <img src="/images/cnodejs_light.svg" alt="" class="h-[30px] w-auto" />
      <div class="flex gap-4 py-3 justify-end">
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/getstart">新手入门</NuxtLink>
        <NuxtLink to="/api">API</NuxtLink>
        <NuxtLink to="/about">关于</NuxtLink>
      </div>
    </div>
  </nav>
  <div class="container m-auto mt-2">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  a {
    text-decoration: none;
    color: #fff;
  }
  .router-link-exact-active {
    color: #12b488;
  }
</style>
```

### props

- color：加载条颜色
- height：加载条高度，默认 3
- duration：加载条持续时间，默认 2000ms
- throttle： 限制出现和隐藏，默认 200ms

## NuxtErrorBoundary

<!-- TODO:NuxtErrorBoundary -->

可以捕获错误并进行展示

## NuxtWelcome

Nuxt 欢迎界面，创建项目时的 app.vue 中存在

## Teleport

fajsdFDJAS

和 vue3 中的 `<Teleport>` 标签用法一致
