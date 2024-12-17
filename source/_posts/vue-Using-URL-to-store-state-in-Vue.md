---
title: 翻译：在 Vue 中使用 URL 存储状态
tags: []
categories: []
poster:
  topic: null
  headline: null
  caption: null
  color: null
date: 2024-12-17 15:39:05
description:
cover: /assets/posts/vue-cover.jpg
banner: /assets/posts/vue-cover.jpg
references:
  - "[Using URL to store state in Vue](https://dev.to/jacobandrewsky/using-url-to-store-state-in-vue-275c)"
---

受到 Lee Robinson 关于在 React / Next.js 应用程序中使用 URL 存储状态的帖子的启发（您可以查看<https://x.com/leeerob/status/1708280997488333078?s=20> ），我决定写这篇文章我将向您展示如何使用 URL 来保存状态。

通常，开发人员（包括我自己：D）使用 `ref()` 、 `reactive()` 甚至 `computed()` 来存储可以通过 URL 查询或参数轻松处理的状态。

![Using URL to Store State in Vue.jpeg](/assets/posts/Using-URL-to-Store-State-in-Vue.jpeg)

来源： <https://d186loudes4jlv.cloudfront.net/http/images/query_string_components.png>

在本文中，我想向您展示如何在 Vue 应用程序中利用这个强大的浏览器原生功能 🚀

## 代码

要在 Vue 应用程序中使用查询参数，最简单的方法是使用 Vue Router 的 push 方法：

```html
<script lang="ts" setup>
  import { useRouter } from "vue-router"
  const { push } = useRouter()
</script>
```

稍后可以在发生某些事件（例如单击按钮）后在应用程序中使用此路由器方法，将状态保存到 URL 查询参数：

```js
const saveUserNameToQuery = (name: string) => {
  push({
    query: {
      username: name,
    },
  })
}
```

要仅更改某些查询参数，同时将其余查询参数保持在相同状态，请使用以下命令：

```js
const { currentRoute, push } = useRouter()

const updateQueryState = (parameter: string, value: string) => {
  push({
    query: {
      ...currentRoute.value.query,
      [parameter]: value,
    },
  })
}
```

要在某些条件后重置查询参数，您可以使用以下方法：

```js
const resetQuery = () => {
  push({
    query: {},
  })
}
```

您可以使用 Vue Router 做更多的事情，但我想展示这一点，因为我最近使用它来开发一项新功能和一个全新的项目。

<https://router.vuejs.org/>

## 概括

就是这样！您已成功学习如何使用 Vue Router 轻松修改 URL 状态并更新查询参数。这是一个非常有用的功能，我每天都在使用，强烈建议您尝试:)
