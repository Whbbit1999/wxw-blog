---
title: useAsyncData vs useFetch
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: useAsyncData vs useFetch 🤯 #大标题
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-06-10 22:15:04
description:
cover: /assets/posts/nuxt3.jpg
banner: /assets/posts/nuxt3.jpg
references:
  - "[useAsyncData vs. useFetch 🤯](https://www.youtube.com/watch?v=0X-aOpSGabA)"
---

nuxt 为我们提供了 useFetch 和 useAsyncData 我们应该用哪个呢？

## 如何在数据变化后自动重新加载数据？

在使用 useFetch 时，需要在数据变化后自动请求数据的时候，我们不应该在参数中进行解包

```html
<script lang="ts" setup>
  const page = ref(1)
  const { data } = await useFetch("/api/result", {
    query: {
      page: page.value,
    },
    method: "POST",
  })
</script>

<template>
  <button @click="page++">更改分页</button>
</template>
```

上面这段代码相当于下面这段代码，在 page 变化时不会自动进行数据的重新加载。

```html
<script lang="ts" setup>
  const page = ref(1)
  const { data } = await useFetch("/api/result", {
    query: {
      page: 1,
    },
    method: "POST",
  })
</script>

<template>
  <button @click="page++">更改分页</button>
</template>
```

我们我们如果需要在 page 变化时重新调用接口，我们不需要对 page 进行解包

```html
<script lang="ts" setup>
  const page = ref(1)
  const { data } = await useFetch("/api/result", {
    query: {
      page: page,
    },
    method: "POST",
  })
</script>

<template>
  <button @click="page++">更改分页</button>
</template>
```

下面两段代码实现的效果是一致的，会在在 page 变化时重新请求数据

```js
const page = ref(1)
const { data } = await useFetch("/api/result", {
  query: {
    page: page,
  },
  method: "POST",
})
```

```js
const page = ref(1)
const { data } = await useAsyncData("result", async () =>
  $fetch(
    "/api/result",
    {
      query: {
        page: page.value,
      },
      method: "POST",
    },
    {
      watch: [page],
    }
  )
)
```

`useFetch` 近似等同于 `useAsyncData` + `$fetch

## 结论

- $fetch 没有响应性
- useAsyncData 可以配置 watch 属性在某些字段变更时具备响应性
- useFetch 可以自动扫描方法内的响应式数据，并在数据变更时重新加载数据

我们一般情况下使用 useFetch，useFetch 为我们提供的自动重新加载数据会有更好的 DX，我们不在需要手动处理什么时候重新加载数据，只要保证参数中的数据是响应式的即可；如果你有特殊的情况，可以使用 useAsyncData 自己处理一些数据，而且 结合 useAsyncData 提供的一些属性比如 watch 也可以尽可能的更加友好的处理一些数据的自动重新加载；而$fetch 来自于 ofetch 它更像是 axios 之类 HTTP 请求库，需要手动对每次请求做出判断。
