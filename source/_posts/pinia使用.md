---
title: pinia使用
tags: [pinia]
categories: [代码人生, 前端技术]
poster:
  # topic: 标题上方的小字
  # headline: 大标题
  # caption: 标题下方的小字
  # color: 标题颜色
date: 2022-12-04 15:42:19
description:
cover: /assets/posts/pinia使用.jpg
banner: /assets/posts/pinia使用.jpg
---

pinia 简易入门指南

<!-- more -->

> 详细文档请访问 [pinia](https://pinia.vuejs.org)

## 安装

使用 npm

```shell
npm i pinia
```

使用 yarn

```shell
yarn add pinia
```

使用 pnpm

```shell
pnpm i pinia
```

## 在 vue 中使用

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";

const app = createApp();
const pinia = createPinia();
app.use(pinia);
app.mount("#app");
```

## 定义一个 Store

> 导出的 store 函数名一般使用 use 开头

```ts
import { defineStore } from "pinia";
// 第一个参数在全局store中的唯一id
export const useUserStore = defineStore("user", {});
```

在页面中使用 store

```vue
<script lang="ts" setup>
import { useUserStore } from "@/store/model/userStore";
const userStore = useUserStore();
// 可以使用userStore.xx来访问store中的内容
</script>
```

or

```vue
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/model/userStore";
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
</script>
```

## State

```ts
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: null,
    };
  },
});
```

在页面中访问 state

> 可以直接写入/读取状态

```js
import { useUserStore } from "@/store/model/userStore";
const userStore = useUserStore();
userStore.userInfo = { name: "wxw", age: 23 };
console.log(userStore.userInfo);
```

重置状态

```js
import { useUserStore } from "@/store/model/userStore";
const userStore = useUserStore();
userStore.$reset();
```

## Getters

> 可以等同于 vue 中的计算属性

```ts
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: null,
    };
  },
  getters: {
    getUserInfo() {
      return this.userInfo;
    },
  },
});
```

在页面中使用 getter

> getter 是属性，访问时不需要使用函数的方式来访问

```vue
<script lang="ts" setup>
import { useUserStore } from "@/store/model/userStore";
const userStore = useUserStore();

setTimeout(() => {
  userStore.userInfo = { name: "wxw", age: 23 };
}, 3000);
</script>

<template>
  <div>{{ userStore.getUserInfo }}</div>
</template>
```

## Actions

> 相当于组件的方法（vue2 中的 methods）

```ts
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: null,
    };
  },
  getters: {
    getUserInfo() {
      return this.userInfo;
    },
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    // 也支持异步方法
    async setAdmin(userInfo) {
      try {
        const { code, data, message } = await setUserApi(userInfo);
      } catch (error) {
        throw error;
      }
    },
  },
});
```

在组件中使用

```vue
<script lang="ts" setup>
import { useUserStore } from "@/store/model/userStore";
const userStore = useUserStore();
const setUser = () => {
  userStore.setUserInfo({ name: "wxw", age: 23 });
};
</script>

<template>
  <button @click="setUser">设置用户信息</button>
  <div>{{ userStore.getUserInfo }}</div>
</template>
```

## Plugins

<!-- TODO -->

---

{%note 推介文章
[Pinia: How to reset stores created with function/setup syntax](https://dev.to/the_one/pinia-how-to-reset-stores-created-with-functionsetup-syntax-1b74)
%}
