---
layout: wiki
wiki: frontNotes
title: JS 闭包 (Closure) 和 回调函数（callback）
---

## 什么是闭包呢？

在 JS 中当一个函数被创建的时候，闭包就形成了。

当一个函数<emp>能够直接访问外部作用域</emp>的条件下，形成闭包。

一个函数能够访问外部的**词法作用域**就是闭包

```js
function test() {
  var a = 1
  var b = 2

  function c() {
    console.log(a, b)
  }
  c() // 在内部调用
  return c
}

const t = test()
t() // 在外部调用，需要返回一个函数
```

有下面一段代码，函数 t2 是一个闭包吗？

```js
function t2() {
  console.log("123")
}
function t() {
  var a = 1
  return test2()
}
```

不是，因为它不能访问 t 函数范围内的词法作用域

### 闭包的作用

变量私有化

```js
function calculator(initialNumber) {
  let num = Number(initialNumber) || 0

  function changeNumber(value) {
    num += value
  } // 闭包（获取了num）

  function add(value) {
    changeNumber(value)
  } // 闭包（获取了changeNumber函数）

  function minus(value) {
    changeNumber(-value)
  } // 闭包（获取了changeNumber函数）

  function value() {
    return num
  } // 闭包（获取了num）

  return { add, minus, value }
}
const cal = calculator(10)
console.log(cal.value())
```

函数柯里化

```js
function add(a, b, c) {
  return function (b) {
    return function (c) {
      return a + b + c
    }
  }
}

add(1)(2)(3)
```

每个闭包都绑定了块级作用的变量

https://www.bilibili.com/video/BV1ch4y1L7cU/?p=2&vd_source=6e32730b05dc719c9f21598867bef69d

```js
const arr = []
function getNumber() {
  for (var a = 0; a < 5; a++) {
    arr[a] = a
    console.log(a)
  }
}
getNumber()
```

## 回调函数

一段函数执行完成后要调用的函数，一般作为另一个函数的参数传递

```js
function request(cb) {
  console.log("请求开始")
  cb()
  console.log("请求结束")
}
function callback() {
  console.log("回调函数")
}

request(callback)
```
