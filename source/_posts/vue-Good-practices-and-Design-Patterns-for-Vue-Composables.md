---
title: 翻译：Vue 可组合项的良好实践和设计模式
tags: []
categories: []
poster:
  topic: null
  headline: null
  caption: null
  color: null
date: 2024-12-15 13:38:52
description:
cover: /assets/posts/vue-cover.jpg
banner: /assets/posts/vue-cover.jpg
references:
  - "[Good practices and Design Patterns for Vue Composables](https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk)"
---

最近，我与 Vue Storefront 的团队就编写 Vue 可组合项的模式进行了一次精彩的讨论。就我们的系统而言，可组合项负责存储主要业务逻辑（如计算、操作、流程），因此它们是应用程序的关键部分。不幸的是，随着时间的推移，我们没有那么多时间来创建某种 `Contract for writing Composables` 因为我们的一些可组合项并不是真正的可组合项 😉

我真的很高兴现在我们有时间重构我们构建新可组合项的方法，以便它们可维护、易于测试且真正有用。

在本文中，我将总结我们创建的想法，并将它们与我在几篇文章中读到的良好实践和设计模式相结合。

<!-- more -->

所以本文将分为三个部分：

1. 通用设计模式
2. 我的建议
3. 进一步阅读

享受并且让我知道您在项目中使用的模式和实践 🚀

## 通用设计模式

我认为了解构建可组合项模式的最佳来源实际上是 Vue.js 文档，您可以[在此处](https://vuejs.org/guide/reusability/composables.html)查看

### 基础可组合项

Vue 文档显示了以下 useMouse 可组合项的示例：

```js
// mouse.js
import { ref, onMounted, onUnmounted } from "vue"

// by convention, composable function names start with "use"
export function useMouse() {
  // state encapsulated and managed by the composable
  const x = ref(0)
  const y = ref(0)

  // a composable can update its managed state over time.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener("mousemove", update))
  onUnmounted(() => window.removeEventListener("mousemove", update))

  // expose managed state as return value
  return { x, y }
}
```

你可以在组件中使用它，如下所示：

```html
<script setup>
  import { useMouse } from "./mouse.js"

  const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

### 异步可组合项

为了获取数据，Vue 建议使用以下可组合结构：

```js
import { ref, watchEffect, toValue } from "vue"

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  watchEffect(() => {
    // reset state before fetching..
    data.value = null
    error.value = null
    // toValue() unwraps potential refs or getters
    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  })

  return { data, error }
}
```

然后可以在组件中使用它，如下所示：

```html
<script setup>
  import { useFetch } from "./useFetch.ts"

  const { data, error } = useFetch("...")
</script>
```

### 可组合项约定

根据上面的示例，以下是所有可组合项都应遵循的约定：

1. 可组合文件名应以 `use` 开头，例如 `useSomeAmazingFeature.ts`
2. 它可以接受输入参数，这些参数可以是字符串等基本类型，也可以接受 `refs` 和 `getter`，但它需要使用 `toValue` 帮助器
3. 可组合项应该返回一个 `ref` 值，该值可以在解构可组合项后访问，例如 `const { x, y } = useMouse()`
4. 可组合项可以保存可以在应用程序中访问和修改的全局状态。
5. 可组合性可能会导致副作用，例如添加窗口事件侦听器，但应在卸载组件时清除它们。
6. 可组合项只能在 `<script setup>` 或 `setup()` 挂钩中调用。它们也应该在这些上下文中同步调用。在某些情况下，您还可以在生命周期挂钩中调用它们，例如 `onMounted()` 。
7. 可组合项可以调用内部的其他可组合项。
8. 可组合项应在内部包装某些逻辑，当过于复杂时，应将它们提取到单独的可组合项中以便于测试。

## 我的建议

我已经为我的工作项目和开源项目构建了多个可组合项 - NuxtAlgolia、NuxtCloudinary、NuxtMedusa，因此基于这些，我想根据我的经验在上面的合同中添加一些要点。

### 有状态或/和纯函数可组合项

在代码标准化的某个时刻，您可能会得出这样的结论：您希望对可组合项中的状态保留做出决定。

最容易测试的函数是那些不存储任何状态的函数（即它们是简单的输入/输出函数），例如负责将字节转换为人类可读值的可组合函数。它接受一个值并返回一个不同的值 - 它不存储任何状态。

不要误会我的意思，您不必做出决定 `OR` 。您可以完全保留有状态和无状态可组合项。但这应该是一个书面决定，以便以后更容易与他们合作 🙂

### 可组合项的单元测试

我们希望使用 Vitest 为我们的前端应用程序实施单元测试。在后端工作时，进行单元测试代码覆盖率非常有用，因为您主要关注逻辑。然而，在前端，您通常使用视觉效果。

因此，我们认为对整个组件进行单元测试可能不是最好的想法，因为我们基本上将对框架本身进行单元测试（如果按下按钮，检查状态是否更改或模式是否打开）。

由于我们已将所有业务逻辑移至可组合项（基本上是 TypeScript 函数）内，因此它们很容易使用 Vitest 进行测试，并允许我们拥有更稳定的系统。

### 限制可组合项的范围

不久前，在 `VueStorefront` 中，我们开发了自己的可组合方法（早在它们实际上像这样被调用之前）。在我们的方法中，我们使用可组合项来映射电子商务的业务领域，如下所示：

```js
const { cart, load, addItem, removeItem, remove, ... } = useCart()
```

这种方法绝对有用，因为它允许将域包装在一个函数中。在 `useProduct` 或 `useCategory` 等更简单的示例中，实现和维护相对简单。然而，正如您在 `useCart` 的示例中所看到的，当包装一个包含更多逻辑而不仅仅是数据获取的域时，这个可组合项正在发展成为一种非常难以开发和维护的形状。

此时，我开始为 Nuxt 生态系统做出贡献，其中引入了不同的方法。在这种新方法中，每个可组合项仅负责一件事。因此，我们的想法不是构建一个巨大的 `useCart` 可组合项，而是为每个功能构建可组合项，即 `useAddToCart` 、 `useFetchCart` 、 `useRemovefromCart` 等。

因此，维护和测试这些可组合项应该更容易 🙂

## 进一步阅读

这将是我的研究的全部内容。如果您想了解有关此主题的更多信息，请务必查看以下文章：

- [https://vuejs.org/guide/reusability/composables.html](https://vuejs.org/guide/reusability/composables.html)
- [https://www.youtube.com/watch?v=bcZM3EogPJE](https://www.youtube.com/watch?v=bcZM3EogPJE)
- [https://vueschool.io/articles/vuejs-tutorials/what-is-a-vue-js-composable/](https://vueschool.io/articles/vuejs-tutorials/what-is-a-vue-js-composable/)
- [https://blog.logrocket.com/getting-started-vue-composables/](https://blog.logrocket.com/getting-started-vue-composables/)
- [https://macopedia.com/blog/news/how-can-vue-3-composables-make-your-life-easier](https://macopedia.com/blog/news/how-can-vue-3-composables-make-your-life-easier)
