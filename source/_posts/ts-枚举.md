---
topic: ts
title: ts 枚举
tags: [ts]
categories: [代码人生, 前端技术]
poster:
  topic: #标题上方的小字
  headline: ts 枚举 #大标题
  caption: #标题下方的小字
  color: #标题颜色
references:
date: 2022-12-05 16:32:15
description:
cover: /assets/posts/ts.jpeg
banner: /assets/posts/ts.jpeg
---

ts 的枚举类型

<!-- more -->

## 枚举类型默认从 0 开始

```ts
enum SexType {
  BOY,
  GIRL,
}
console.log(SexType.BOY) // 0
console.log(SexType.GIRL) // 1
```

## 枚举编号会自动递增

```ts
enum SexType {
  BOY = 2,
  GIRL,
}
console.log(SexType.BOY) // 2
console.log(SexType.GIRL) // 3
```

## 枚举可以自定义

```ts
enum SexType {
  BOY = "男",
  GIRL = "女",
}
console.log(SexType.BOY) // 男
console.log(SexType.GIRL) // 女
```
