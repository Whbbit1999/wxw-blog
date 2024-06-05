---
title: nuxt3 请求数据
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: nuxt3 请求数据 #大标题
  caption: 请求数据的最佳实践 #标题下方的小字
  color: 标题颜色
date: 2024-06-05 22:26:42
description:
cover: /assets/posts/nuxt3.jpg
banner: /assets/posts/nuxt3.jpg
references:
  - "[A Better Approach To Data Fetching In Nuxt?](https://www.youtube.com/watch?v=HiFV027dEzk)"
  - "[useFetch](https://nuxt.com/docs/api/composables/use-fetch)"
  - "[useLazyFetch](https://nuxt.com/docs/api/composables/use-lazy-fetch)"
---

## 问题描述

在 nuxt3 中，我们通常使用 useFetch 来获取接口数据，一般情况下我们会在页面中这样使用

```ts
const data = await useFetch("/api/data")
```

这样使用的时候，如果接口返回很慢，会导致页面一直在加载状态。如果此时有页面跳转的话，我们会一直停留在之前的页面，直至请求完成，nuxt 才会跳转至新页面。

我们怎么操作才能有更好的用户体验呢？

## 解决方案

### 1. 显示加载状态

数据加载会阻塞页面跳转，如果有页面跳转时，用户可能为认为页面卡死或者没有对页面进行操作

这时我们的解决方案可以是：显示一个加载状态，让用户可以感知当前页面正在加载数据。

我们可以使用内置的`nuxt-loading-indicator`标签，将其放置于 `app.vue` 组件中，这样在页面加载数据时，顶部会出现一个加载条。用户会感知到页面的变化，不至于误认为自己未进行操作或者以为页面卡死。

这样做的话，在接口没返回数据前，页面会一直停留在跳转之前的页面。可能会给用户留下系统很卡的感觉。我们可不可以再做一些优化呢？

### 2. 为 useFetch 配置`{lazy: true}`

我们可以为 useFetch 的配置`{lazy: true}`，可以实现数据懒加载。这样，在加载数据时，页面的跳转和渲染不会被阻塞。

```ts
const { pending, data } = await useFetch("/api/data", { lazy: true })
```

这时，useFetch 的返回值里会有一个 pending 属性，pending 表示数据是否还未加载完成。我们可以在 pending 为 true 时做一些操作。

这样依赖，用户可以在点击后直接进入要跳转的页面。至于在接口请求时要展示的内容，就有很多发挥空间了。

我们可以展示一个加载页？或许我们可以展示一个骨架屏。。。

### 3. 使用 useLazyFetch

当然，nuxt3 也为我们提供了 useLazyFetch 这个函数，效果与手动配置 lazy: true 相同。

```ts
const { pending, data } = await useLazyFetch("/api/data")
```

> 注意： 这里是否有 await 都不影响数据的懒加载
