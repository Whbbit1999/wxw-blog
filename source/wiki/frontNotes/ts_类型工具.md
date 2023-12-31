---
layout: wiki
wiki: frontNotes
title: TypeScript中的类型工具
---

**这部分内容不是很好懂，可以多练习几次**

## extends 的多种使用方式

### 类型继承

`extends` 可以表示必须包含后面的类型

```ts
function user<T extends { id: number; render: (x: number) => number }>(arr: T[]) {
  console.log(arr)
}
user([{ id: 1 }])
```

### extends 类型条件判断

`窄类型 extends 宽类型 ? xxx : xxx`
判断窄类型是否从属于宽类型，可以就为 true，否则为 false

```ts
type a = { name: string; age: number }
type b = { name: string }
type c = b extends a ? true : false

let d: c = false
d = true // 报错
```

<!-- TODO -->

### 对泛型进行条件判断分配类型

使用[]包裹表示完全比对 `[T] extends [a]`

```ts
type a = string | undefined
type b<T> = T extends a ? string : boolean

const c: b<number> = false // 这时number不在a的类型里，所以此时c类型为boolean
const d: b<string> = "d" // string在a的类型中，此时d的类型为string
```

## Exclude 过滤

从左侧联合类型中过滤掉右边的类型，保留左侧类型比右侧类型中多的类型

```ts
type a = number | boolean
type b = number | string | boolean

type c = Exclude<b, a>
// 获得的新类型为 string

type d = Exclude<a, b>
// 获得的新类型为 never
```

## Extract

和 Exclude 作用相反。只保留右侧类型声明中的类型

```ts
type a = number | boolean | string
type b = Extract<a, number | boolean>
// 获得的新类型为 number | boolean
```

## Pick

`type PICK<T,U extends keyof K> = {[P in U]: T[P]}`

在类型中提取某几个组成新类型

```ts
type User = { name: string; age: number; site: string }
let user: Pick<User, "name" | "site"> = { name: "wxw", site: "whbbit.cn" }
// 获得的新类型为 {name: string, site: string}
```

## Partial

将属性类型转为可选

```ts
type User = { name: string; age: number; site: string }
const user: Partial<User> = {}
// 获得的新类型为 { name?:string; age?:number; site?: string }
```

## Record

快速生成具有属性的类型

```ts
type User = Record<string, string | number>
// 获得的新类型为 {[x: string]: string | number}
```

## keyof

## infer
