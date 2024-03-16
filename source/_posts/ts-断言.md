---
topic: ts
title: ts 断言
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: ts 断言
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-03-17 00:14:35
description:
cover: /assets/posts/ts.jpeg
banner: /assets/posts/ts.jpeg
references:
---

断言就是**我说了算**。

```ts
// 这里的element 默认类型是HTMLElement | null ，这里我们可以直接说明这个element一定存在并且为一个div标签
const element = document.getElementById("el") as HTMLDivElement
```

## as const 断言

```ts
let a: string = "whbbit"
a = "whbbit.cn"

const b = "whbbit" // 按照js语法，b的值不能被改变

let c = "whbbit" as const // c的值可以改变，但是只能改变为'whbbit'
// 写法等同于 let c: 'whbbit' = 'whbbit'
```

数组使用 as const 时，相当于声明一个元组。

```ts
const arr = ["whbbit", 25] as const
// 等同于 const arr: ['whbbit', 25] = ["whbbit", 25]

let a: string = "whbbit"
let b: number = 25
const arr1 = [a, b] as const
// 等同于 const arr: [string, number] = [a, b]
```

对象使用 as const 时

```ts
let age: number = 20
let c = true as const
const obj = {
  name: "whbbit",
  age,
  c,
} as const
// 类型为 {readonly name: 'whbbit', readonly age: number, readonly c: true}
```

> 数组或对象使用 as const 时，如果内容是引入别处的变量时，就使用该变量的类型，如果是常量时，就使用该常量的值

as const 在解构中使用的便利性

```ts
function func() {
  let a = "whbbit"
  let b = 25
  return { a, b } as const
}
let { a, b } = func()
// 这时ts可以准确的推断a的类型是string，b的类型是number。
// 不使用as const 时，a和b的类型都是 string | number
console.log(a, b)
```

## 非空断言

```ts
const el = document.querySelector("#app")
// 类型为 HTMLElement | null
```

当我们知道 id = app 的元素是一个 div 元素时，我们想让其类型明确为`HTMLDivElement` 以获得更好的类型提示

```ts
const el: HTMLDivElement = document.querySelector("#app")
// 这时会报错 Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'. Type 'null' is not assignable to type 'HTMLDivElement'.
```

当我们清楚的知道这个元素一定不为空时，就可以使用非空断言

```ts
const el: HTMLDivElement = document.querySelector("#app")!
```

或者我们也可以直接为其断言

```ts
const el = document.querySelector("#app") as HTMLDivElement
```

## DOM 类型推断

我们可以断言 DOM 类型， 事件类型等

```ts
const el = document.querySelector("#app") as HTMLDivElement

el.addEventListener("click", (e: Event) => {
  console.log(e.target)
})
```
