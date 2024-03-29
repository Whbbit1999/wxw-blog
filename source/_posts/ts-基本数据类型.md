---
topic: ts
title: ts 基本数据类型
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: ts 基本数据类型
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-03-16 23:59:14
description:
cover: /assets/posts/ts.jpeg
banner: /assets/posts/ts.jpeg
references:
---

> 包含了对断言、never、void 等类型的说明

## 基本类型

定义数据类型，基本数据类型中包含 `string` `number` `boolean` 等

```ts
let name: string = "whbbit" // name 的值只能是字符串类型
let age: number = 25 // age的值只能是数值类型
let work: boolean = false // work的值只能是true/false

let stringArr: string[] // 数组里的值只能是字符串

let obj1: object // obj1必须是一个对象
let obj: { name: string; age: number } // obj这个对象中只能包含name和age属性，且类型必须是规定的类型
```

在 `:` 前添加 `?` 表示这个值不是必填

```ts
let obj1: { name: string; age: number; work: boolean } = {
  name: "whbbit",
  aage: 25,
}
console.log(obj1) // 编译时会有报错，Property 'work' is missing in type '{ name: string; age: number; }' but required in type '{ name: string; age: number; work: boolean; }'.

let obj: { name: string; age: number; work?: boolean } = {
  name: "whbbit",
  age: 25,
}
console.log(obj)
```

## 类型自动推断

在不写类型时，ts 会自动进行类型推断

```ts
let name = "whbbit" // 等同于 -> let name: string = 'whbbit'
```

## 类型组合

使用 `|` 表示类型可以多选，符合 `|` 之前或者之后的类型即可

```ts
let a: string | number // 表示a可以是字符串也可以是一个数值
a = "whbbit"
a = 20

let b: string | number | boolean
b = "whbbit"
b = 20
b = false

let arr: (string | number)[] = [] // 数组内容只能为字符串或数值类型
let arr1: Array<string | number> = [] // 使用泛型
```

## any

在我们不知道是什么类型时，可以定义为 any 类型。对类型不做校验

```ts
let a: any
a = "whbbit"
a = 10
a = false
a = ["whbbit"]

let arr: Array[any]
let arr1: any[]
```

也可以对构造函数生成的实例进行类型限制。

**不推介这样做，class 的类型推断和限制就没有了，不符合使用 ts 的场景**

```ts
class Animal {
  constructor() {}
  get = () => "whbbit.cn"
}

const cat: any = new Animal()
```

### 对配置文件改动，取消对 any 类型的自动推断

```json
{
  "noImplicitAny": true
}
```

## unknown

unknown 和 any 的区别

- unknown 表示有类型但是不明确类型是什么，ts 会进行类型的判断
- any 表示这个值没有类型，ts 不会进行类型的判断

```ts
let a: any
let a1: string = a // 不会进行报错，ts不做类型校验

let b: unknown
let c: string = b // ts校验报错，类型不匹配
```

可以使用 as 断言来解决

```ts
let b: unknown
let c: string = b as string // 断言变量b一定是一个string类型的值
```

## 断言是什么? 怎么用?

```ts
let a: string = "20"
let b: number = a as number // 会报错，不能对已经声明类型的值进行断言
```

怎么解决这种问题呢？ 我们可以先将 b 转换为 unknown 类型再断言

```ts
let a: string = "20"
let b: number = a as unknown as number
```

## void

void 可以是 null 或 undefined，多用于函数返回值的类型

```ts
let a: void = null
a = undefined
```

## never

never 不是任何类型，在函数不能执行到结尾时进行类型推断

```ts
function err(): never {
  throw new Error("err")
}
```

**void 和 never 的区别**

- void 常用作函数的返回值的推断，**函数没有返回值**时，可以将返回类型写为 void
- never 常用作 **函数不能执行到末尾** 时对函数类型的限制

```ts
function printString(content: any): void {
  console.log(content)
}

function throwError(err): never {
  throw new Error(err)
}
```

## null & undefined

null 和 undefined 代表的类型就是 js 中对应的 null 和 undefined

```ts
let a: null = null
let b: undefined = undefined
```

默认情况下 null 和 undefined 可以作为其他类型的值

```ts
let a: string
a = null
a = undefined
// 这时不会报错
```

可以修改 tsconfig.json 文件中的配置让其不能作为其他类型的值

```json
{
  "strictNullchecks": true
}
```
