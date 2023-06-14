---
title: js拾遗--map
tags: [js]
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - title: ""
    url: ""
date: 2023-03-01 11:13:48
description:
cover:
banner:
---

## map 函数的第二个参数

map 可以传递第二个参数，第二个参数的值会赋值给当前 this

```js
const lesson = {
  name: "课程",
  lessons: ["js", "ts", "vue"],
  show() {
    return this.lessons.map(function (lesson) {
      return this.name + "-" + lesson;
    }, this);
  },
};
console.log(lesson.show());
```

当然，我们可以使用箭头函数

> **箭头函数的 this 就是函数执行上下文** - 父级作用域的 this

```js
const lesson = {
  name: "课程",
  lessons: ["js", "ts", "vue"],
  show() {
    return this.lessons.map((lesson) => this.name + "-" + lesson);
  },
};
console.log(lesson.show());
```
