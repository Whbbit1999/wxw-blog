---
title: 最近学习到的小知识
tags: []
categories: []
poster:
  topic: " " #标题上方的小字
  headline: 最近学习到的小知识 「置顶内容」
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-04-13 11:54:18
description:
cover: /assets/posts/bugfix.jpg
banner: /assets/posts/bugfix.jpg
references:
# sticky: 1
---

## h5 获取经纬度

```javascript
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((res) => {
      console.log("经度" + res.coords.longitude + "纬度" + res.coords.latitude)
    })
  } else {
    alert("Geolocation is not supported by this browser.")
  }
}
```

## nuxt3 ssg 报错问题处理

可以在 nuxt.config.ts 中添加如下配置试试

```ts
nitro: {
  routeRules: {
    '/*': {
      cors: true,
    },
  },
  prerender: {
    crawlLinks: true,
    failOnError: false,
  },
  externals: {
    traceInclude: [],
  },
}
```
