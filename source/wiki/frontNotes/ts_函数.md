---
layout: wiki
wiki: frontNotes
title: 函数
---

对函数进行声明

```ts
let func = () => "whbbit.cn"
// ts会自动推断类型为 let func:() =>string
```

明确类型赋值

```ts
let func: Function
```

## 对函数参数的类型限制

```ts
function add(a: number, b: number) {
  return a + b
}

add(1, 2)
```

参数为可选参数时，可以使用 `?` 进行限制，没有参数传参时，默认为 undefined

```ts
function add(a: number, b: number, c?: number) {
  console.log(c) // undefined
  return a + b
}

add(1, 2)
```

设置默认参数值

> 有默认值时，`?` 需要去除

```ts
function add(a: number, b: number, c: number = 20) {
  console.log(c) // 20
  return a + b
}

add(1, 2)
```

## 对函数返回值的类型限制

ts 可以对函数返回值进行自动推断

```ts
let add = (a: number, b: number) => {
  return a + b
}
```

也可以手动对返回值进行类型限制

```ts
let func = (a): void => {
  console.log(`接收到了参数 ${a}`)
}
```

```ts
function add(a: number, b: number): number {
  return a + b
}
```

## 使用 type 对重复类型声明进行抽离

```ts
let addUser = (user: { name: string; age: number }): void => {
  console.log(`添加用户${user}`)
}

addUser({ name: "whbbit", age: 25 })

let updateUser = (user: { name: string; age: number }): void => {
  console.log(`编辑用户${user}`)
}
updateUser({ name: "whbbit1999", age: 25 })
```

这时我们会发现，有重复的类型声明。我们可以使用 `type` 对重复的类型声明进行抽离

```ts
type userType = { name: string; age: number }
let addUser = (user: userType): void => {
  console.log(`添加用户${user}`)
}

addUser({ name: "whbbit", age: 25 })

let updateUser = (user: userType): void => {
  console.log(`编辑用户${user}`)
}
updateUser({ name: "whbbit1999", age: 25 })
```

## 对函数结构的定义

```ts
let func: (a:number, b: number) => number; // 这里是函数的结构

// 这里是函数的实现
func = (x: number, y:number) {
  return x + y
}
```

```ts
let addUser: (user: { name: string; age: number }) => void
addUser = (user: { name: string; age: number }) => {
  console.log(user)
}
addUser({ name: "whbbit", age: 25 })
```

可以使用 type 定义函数结构

```ts
type userType = { name: string; age: number }
type addUserFunc = (user: userType) => void
let addUser: addUserFunc
addUser = (user: userType) => {
  console.log(user)
}
addUser({ name: "whbbit", age: 25 })
```

## 剩余参数的使用

```ts
function sum(...args: number[]): number {
  return args.reduce((s, n) => s + n, 0)
}

console.log(sum(1, 2, 3, 4, 5))
```

```ts
function push(arr: any[], ...args: any[]): any[] {
  arr.push(...args)
  return arr
}
let arr = push([], 1, 2, true, false)
console.log(arr)
```
