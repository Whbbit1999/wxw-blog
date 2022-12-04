---
title: sass
tags: []
categories: []
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:59:32
description:
cover:
banner:
---

在我们日常开发中，使用 less/sass 提供的层级样式方便于代码的编写，甚至我们可以使用 sass 中的一些函数来完成一个简单的 css 库来供我们复用 css 代码，这里我会仿照 tailwindcss 来写一些公共代码。我相信，有了这个基础，我们可以对 sass 有更加深入的了解。

{%note 官方网址
[sass 官方](https://sass-lang.com/)

[sass 中文](https://www.sass.hk/)
%}

## 安装

使用 yarn 安装

```sh
yarn add sass -D
```

使用 npm 安装

```sh
npm i sass -D
```

使用 pnpm 安装

```sh
pnpm i sass -D
```

## 变量

sass 的变量都是使用 `$` 开始，以 `;` 结束

```scss
// 申明单个值
$primary: #22c55e;

// 申明一组值
$colors: (
  "white": #ffffff,
  "primary": #367ee8,
  "primary-light": #e9f0ff,
);
```

或者我们可以在一个变量中用另一个变量

> 下面两种的写法是等效的

```scss
$border-color: map-get($colors, "primary");
// or
$border-color: map-get(
  $map: $colors,
  $key: "primary",
);
```

## 注释

scss 支持单行注释，使用单行注释后，在编译好的文件中不会包含备注内容。想要在编译后的 css 中显示注释的话需要使用 css 原本支持的注释方法`/**/`

## 循环

### 使用一组已有的数据

```scss
@each $colorKey, $color in $colors {
  .text-#{$colorKey} {
    color: $color;
  }
}
```

生成的 css 代码

```css
.text-white {
  color: #ffffff;
}
.text-primary {
  color: #367ee8;
}
.text-primary-light {
  color: #e9f0ff;
}
```

### 使用一组未定义的数据

```scss
@each $var in (left, center, right) {
  .text-#{$var} {
    text-align: $var;
  }
}
```

生成的代码

```css
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
```
