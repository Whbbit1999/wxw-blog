---
topic: ts
title: ts 元组
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: ts 元组 #大标题
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-03-17 00:26:43
description:
cover: /assets/posts/ts.jpeg
banner: /assets/posts/ts.jpeg
references:
---

```ts
// 数组类型的限制， 我们无法做到对对应位置元素类型的限制
let arr: (string | number)[] = ["whbbit", "wxw", 25]
```

元组可以对固定位置参数类型的限制

```ts
// 限制arr第一个元素是string类型，第二个元素是number类型，第三个元素是boolean类型
let arr: [string, number, boolean] = ["whbbit", 20, false]
arr[0] = "wxw" // 类型正确，可以进行更改
arr[0] = 10 // 这时就会报错
```
