---
title: 翻译：编写更简洁的Vue.js代码的10个技巧
tags: []
categories: []
poster:
  topic: null
  headline: null
  caption: null
  color: null
date: 2024-12-15 12:44:24
description:
cover: /assets/posts/vue-cover.jpg
banner: /assets/posts/vue-cover.jpg
references:
  - "[10 Tips to Write Cleaner Vue.js Code](https://dev.to/jacobandrewsky/10-tips-to-write-cleaner-vuejs-code-1dp6)"
---

本文翻译至[10 Tips to Write Cleaner Vue.js Code](https://dev.to/jacobandrewsky/10-tips-to-write-cleaner-vuejs-code-1dp6)。

当从一个项目过渡到另一个项目时（例如换工作时），总有那么一段时间我需要适应新的项目流程和开发流程。

对于某些项目来说，有些东西是独一无二的，但是在 Vue 中，有些东西被认为是构建干净且可维护的基于 Vue 的项目的良好实践。

在本文中，我想列出这些最佳实践，以便您可以开始在 Vue 项目中使用它们:)

<!-- more -->

干净且可维护的代码是任何成功应用程序的支柱。Vue.js 凭借其直观的 API，可以轻松编写干净的代码，但总有改进的空间。这里有 10 个可操作的技巧，可以帮助您编写更简洁的 Vue.js 代码。

## 1. 明智的使用 Composition API

将大型逻辑分解为更小的、可重用的可组合项，以保持模块化和可读性。

示例：不要将所有的逻辑都塞进 `setup()` 函数中，而是为不同的功能创建自定义钩子。

## 2. 遵循 Vue 的命名规定

使用 `PascalCase` 作为组件文件名，并可以选择使用`kebase-case`作为模板使用。

示例：将您的组件命名为 `UserProfile.vue` 并将其作用于模板中的`<UserProfile />` 或 `<user-profile />`

## 3. 避免过度使用 Vuex 或 Pinia

将 UI 状态（例如：弹窗的可见性）保留在组件本地，而不是在全局状态管理中。

示例： 使用 `ref` 或 `reactive` 进来表示临时状态。

## 4. 有效利用插槽

使用具名插槽可以提高可重用组件的灵活性并可以清晰的表明使用情况。

示例：在 `Card` 组件创建一个带有 `<slot name="header" />` 的组件可以用于创建自定义头部。

## 5. 利用 scoped 限制 css 作用区域

在`<style scoped>`标签上添加 scoped 使用作用域样式来防止 css 冲突。

示例：应用于特定组件的样式而不影响应用程序中其他部分的样式。

## 6. 编写可复用组件

将 UI 元素分解为可重用的、集中的组件，避免过于通用的设计。

示例：创建一个支持不同样式的 props 的可配置 Button 组件，而不是对按钮进行硬编码。

## 7. 优雅的处理异步代码

使用`async/await`进行 API 调用并使用一个『全局处理器』来处理错误。

示例： 创建一个`useApi`composable 来封装 API 请求逻辑和错误处理逻辑。

## 8. 使用 Typescript 标记 Props 和 Emit 事件

使用 Typescript 类型来清晰的定义 props 和 Emit 事件。

示例：在 Vue3 中可以使用`defineProps` 和 `defineEmit`

## 9. 添加自动格式化插件

添加 ESLint 或者 Prettier 并使用特定的规则对您的代码进行格式化和质量检查，以增强代码质量和一致性。

示例：将 linting 集成到 CI/CD 中，并自动执行代码审查。

## 10. 在模板（template）中保持简单

避免在 template 中放置复杂的逻辑，使用计算属性或者方法。

示例：将 `v-if="list.filter(item => item.active).length > 0"`的逻辑替换为计算属性。

## 总结

通过遵循这些技巧，您将创建更易于维护、扩展和可调试的 Vue.js 应用程序。干净的代码不仅有利于当前的项目，也有利于未来可能维护该项目的开发人员。今天就开始做起，试试其中的一些做法。

保重，下次再见！

一如既往的保持愉快的心情来编码吧！
