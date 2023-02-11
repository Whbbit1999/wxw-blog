---
title: math.js 的使用
tags: [node, js, 工具]
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:54:08
description:
cover:
banner:
---

常用的 js 计算 精度解决方案

<!-- more -->

## 安装

```shell
npm i mathjs
```

## 使用

```js
import { create, all } from "mathjs";
const config = {
  number: "BigNumber",
  precision: 20,
};
const math = create(all, config);

function calc(expression) {
  if (expression) {
    return math.number(math.evaluate(expression));
  } else {
    return 0;
  }
}
// 可以使用表达式进行计算
console.log(calc(`0.1 + 0.2`)); // 0.3
```

> 这里推介使用表达式的方式进行计算，灵活且精确

## 其他计算库

- [currency.js](https://currency.js.org/)
