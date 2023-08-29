---
title: vue项目权限控制
tags: []
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - title: vue动态路由权限控制
    url: https://www.bilibili.com/video/BV1gR4y1f7tb/?vd_source=6e32730b05dc719c9f21598867bef69d
  - title: addRoute
    url: https://router.vuejs.org/zh/api/#addroute
  - title: hasRoute
    url: https://router.vuejs.org/zh/api/#hasroute
date: 2023-01-03 22:25:15
description:
cover:
banner:
---

实现 vue 动态路由的测试，登录 user 和 admin 可以访问不同的菜单

<!-- more -->

```ts router/index.ts
import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";

// 静态路由
const routes: RouteRecordRaw[] = [
  {
    name: "home",
    path: "/",
    meta: { label: "首页" },
    component: () => import("../pages/home.vue"),
  },
  {
    name: "login",
    path: "/login",
    meta: { label: "登录" },
    component: () => import("../pages/login.vue"),
  },

  {
    name: "disboard",
    path: "/disboard",
    meta: { label: "工作台" },
    component: () => import("../pages/disboard.vue"),
  },
];

// 动态路由
const dynamicRoutes: RouteRecordRaw[] = [
  {
    name: "list",
    path: "/list",
    meta: { label: "列表", roles: ["admin", "user"] },
    component: () => import("../pages/list.vue"),
  },
  {
    name: "about",
    path: "/about",
    meta: { label: "关于", roles: ["admin", "user"] },
    component: () => import("../pages/about.vue"),
  },
  {
    name: "user",
    path: "/user",
    meta: { label: "用户", roles: ["admin", "user"] },
    component: () => import("../pages/user.vue"),
    children: [
      {
        name: "user-info",
        path: "/user/info",
        meta: { label: "用户info", roles: ["admin", "user"] },
        component: () => import("../pages/user-info.vue"),
        children: [
          {
            name: "user-info.a",
            path: "/user/info/a",
            meta: { label: "用户info.a", roles: ["admin", "user"] },
            component: () => import("../pages/user-info-a.vue"),
          },
          {
            name: "user-info.b",
            path: "/user/info/b",
            meta: { label: "用户info.b", roles: ["admin", "user"] },
            component: () => import("../pages/user-info-b.vue"),
          },
        ],
      },
      {
        name: "user-orders",
        path: "/user/orders",
        meta: { label: "用户orders", roles: ["user"] },
        component: () => import("../pages/user-orders.vue"),
      },
    ],
  },
];

// routes 扁平化处理
const loopRoutes = (routes: RouteRecordRaw[], role: string = "") => {
  const result: RouteRecordRaw[] = [];
  const loopChildren = (
    children: RouteRecordRaw[] = [],
    parent: string = ""
  ) => {
    children.forEach((item) => {
      if (item.children) {
        const { children, ...rest } = item;
        if (
          !rest.meta?.roles ||
          (rest.meta?.roles as string[]).includes(role)
        ) {
          result.push(rest);
          if (!router.hasRoute(item.name!)) {
            if (parent) {
              router.addRoute(parent, rest);
            } else {
              router.addRoute(rest);
            }
          }
        }
        loopChildren(children, rest.name as string);
      } else {
        // meta信息中没有roles或者meta信息中roles包含当前登录用户的role
        if (
          !item.meta?.roles ||
          (item.meta?.roles as string[]).includes(role)
        ) {
          result.push(item);
          if (!router.hasRoute(item.name!)) {
            if (parent) {
              // 有父级
              router.addRoute(parent, item);
            } else {
              router.addRoute(item);
            }
          }
        }
      }
    });
  };
  loopChildren(dynamicRoutes);
  console.log(result);
  return [...routes, ...result].filter((item) => item.name !== "login");
};

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

export { routes, loopRoutes };
```

```html App.vue
<script setup lang="ts">
  import { provide, ref, watch } from "vue";
  import router, { routes } from "./router";
  const showRoutes = ref(routes);
  provide("showRoutes", showRoutes);
  const logout = () => {
    location.href = "/";
  };
  watch(showRoutes, () => {
    console.log(router.getRoutes()); // 查看当前路由列表
  });
</script>

<template>
  <router-link
    v-for="route in showRoutes"
    :key="route.name"
    :to="{ name: route.name }"
  >
    【{{ route.meta?.label }}】
  </router-link>
  <button @click="logout">退出登录</button>
  <hr />
  <router-view></router-view>
</template>

<style scoped></style>
```

```html login.vue
<script lang="ts" setup>
  import { inject, Ref } from "vue";
  import { loopRoutes, routes } from "../router";

  const showRoutes = inject("showRoutes") as unknown as Ref;
  const login = (userType: string) => {
    showRoutes.value = loopRoutes(routes, userType);
  };
</script>

<template>
  login.vue
  <button @click="login('user')">用户登录</button>
  <button @click="login('admin')">admin登录</button>
</template>

<style scoped lang="scss"></style>
```
