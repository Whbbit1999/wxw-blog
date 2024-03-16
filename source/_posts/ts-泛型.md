---
topic: ts
title: ts 泛型
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: ts 泛型
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-03-17 00:18:11
description:
cover: /assets/posts/ts.jpeg
banner: /assets/posts/ts.jpeg
references:
---

## 什么是泛型

可以理解为动态的类型，类型中可以接受参数。

我们要做一个输入什么就返回什么的函数，当我们将类型写死后，传递其他类型的数据就会在编译时报错类型错误。我们能不能做到在传递参数时声明一个类型，让我们声明的类型进行判断呢？

```ts
function returnSomething(inputSomething: string): string {
  return inputSomething
}

returnSomething<string>("wx")
returnSomething(23) // 报错
```

这时我们可以使用泛型接受类型参数

```ts
function returnSomething<T>(inputSomething: T): T {
  return inputSomething
}

returnSomething<string>("wx")
returnSomething<number>(2)
```

## 泛型的继承 `extends`

有时我们需要一些特定类型的参数，里面包含一些相同的类型，我们可以用 extends 继承来约束可以传递的参数

```ts
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length
}
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length
}
getLength("www")
getLength([2, 3, 4])
getLength(2) // 报错
```

## 类中使用

我们可以使用泛型对函数的类型做限制，将类型的定义部分开放给用户。

```ts
class User<T> {
  constructor(private user: T) {}
  get(): T {
    return this.user
  }
}
interface IUser {
  name: string
  age: number
}
const user = new User<IUser>({ age: 2, name: "xxx" })
console.log(user.get())
```

## interface 使用泛型

```ts
interface IArticle<B, C> {
  title: string
  isLock: B
  comments: C[]
}
type CommentType = { content: string }

const article: IArticle<boolean, CommentType> = {
  title: "测试文章",
  isLock: false,
  comments: [{ content: "测试评论" }],
}
```
