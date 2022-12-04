---
title: uniapp中使用pinia
tags: [uniapp, 小程序, pinia]
categories: [小程序]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:34:35
description:
cover:
banner:
---

## 在小程序中使用 pinia

```bash
npm init -y
```

安装 pinia

```bash
npm install pinia
```

创建 store 文件夹用来管理状态

```js store/index.js
// store/index.js
import { createPinia } from "pinia";

const store = createPinia();
export default store;
```

在 mian.js 中引入 pinia

```js main.js
// #ifndef VUE3
import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import pinia from "./store/index.js";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return {
    app,
  };
}
// #endif
```

## 创建 store 及在页面中使用

详情见[pinia](/program/vue/pinia)一章

## 在小程序中实现数据的持久化存储

> 在一些时候，我们需要持久化存储一些数据，保证页面刷新后还能拿到对应的数据

我们可以使用 uni-app 的数据存储方法，uni-app 的数据存储和获取方法可以做到直接存储对象或数组到本地缓存中。我们可以利用这个来做。

### 存储数据/获取数据/删除数据的简易封装

```js
export default {
  // 获取本地缓存中的数据
  get(key) {
    try {
      return uni.getStorageSync(key);
    } catch (e) {
      console.error(e);
    }
  },
  // 数据持久化存储
  set(key, value) {
    try {
      uni.setStorageSync(key, value);
    } catch (e) {
      console.error(e);
    }
  },
  // 移除本地存储中的数据
  remove(key) {
    try {
      uni.removeStorageSync(key);
    } catch (e) {
      console.error(e);
    }
  },
};
```

### 存储数据键值对的封装

我们可以参考 ts 的 enum，将要存储到 storage 中的 key 和程序中的 key 分离开来，后期要修改 storage 中的键时，程序部分只需改动该文件即可

```js
export default {
  TOKEN: "TOKEN",
  USER_INFO: "USER_INFO",
};
```

此时，我们存入本地存储的 key 为 TOKEN 和 USER_INFO， 如果我们想将 TOKEN 更改为 USER_TOKEN 的话，也只需要改动该文件即可

```js {1}
export default {
  TOKEN: "USER_TOKEN",
  USER_INFO: "USER_INFO",
};
```

### 在对应仓库中使用

> 这里用 useUserStore 举例

```js
import { defineStore } from "pinia";

import Enmu from "@/enmu/index.js";
import PerStorage from "@/utils/PerStorage.js";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: null,
      token: "",
    };
  },
  getters: {
    getUserInfo() {
      return this.userInfo || PerStorage.get(Enmu.USER_INFO) || {};
    },
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      PerStorage.set(Enmu.USER_INFO, userInfo);
    },
  },
});
```
