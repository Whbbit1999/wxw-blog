---
title: vue3权限指令
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: vue3权限指令 #大标题
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-03-09 23:23:27
description:
cover: /assets/posts/vue-cover.png
banner: /assets/posts/vue-cover.png
references:
---

自定义一个权限指令来动态显示、隐藏， 详细代码可查看[sable](https://github.com/Whbbit1999/sable)。这里只列出了主要的代码

<!-- more -->

## 自定义权限指令

permission.ts

```ts
import type { App } from "vue"
import { ref, watchEffect } from "vue"

import { storeToRefs } from "pinia"
import { usePermissionStore } from "@/store/usePermissionStore.ts"

// 按钮权限
export function registerPermission(app: App) {
  const { permissions } = storeToRefs(usePermissionStore())

  app.directive("permission", {
    created(el: HTMLButtonElement, binding) {
      const { value } = binding

      const buttonPermission = Array.isArray(value) ? value : [value]
      const visible = ref(false)

      watchEffect(() => {
        visible.value = hasIntersection(permissions, buttonPermission)
        el.style.display = visible.value ? "" : "none"
      })
    },
  })
}

function hasIntersection(permissions: Ref<string[]>, arr2: string[]) {
  const map = new Map()
  permissions.value.forEach((item) => map.set(item, true))
  return arr2.some((item) => map.get(item))
}
```

## 权限 store

usePermissionStore.ts

```ts
import { defineStore } from "pinia"

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    permissions: [],
  }),
  getters: {},
  actions: {
    setPermissions(permissions: string[]) {
      this.permissions = permissions
    },
  },
})
```

## 使用

permission.vue

```html
<script lang="ts" setup>
  import { storeToRefs } from "pinia"

  const userPermissionStore = usePermissionStore()
  const { setPermissions } = userPermissionStore
  const { permissions } = storeToRefs(userPermissionStore)
</script>

<template>
  <div>
    自定义指令

    <n-divider title-placement="left"> 根据权限列表来展示 </n-divider>
    <div>
      <n-space>
        <n-button @click="setPermissions(['read'])"> 设置为只有阅读权限 </n-button>
        <n-button @click="setPermissions(['read', 'write'])"> 设置为阅读和修改权限 </n-button>
      </n-space>
    </div>
    <div mt-4>
      权限列表： {{ permissions }}
      <n-button v-permission="'read'"> 阅读 </n-button>
      <n-button v-permission="'write'"> 写入 </n-button>
    </div>
  </div>
</template>

<style></style>
```
