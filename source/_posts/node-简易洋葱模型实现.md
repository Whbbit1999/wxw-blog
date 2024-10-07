---
title: node-简易洋葱模型实现
tags: ['JavaScript', 'node', 'koa']
categories: ['代码人生','JavaScript']
poster:
  topic: null
  headline: null
  caption: null
  color: null
date: 2024-10-07 15:15:22
description: 仿照koa实现一个简易的洋葱模型
cover:
banner:
references:
---

**就像我们睡觉一样，盖了三床被子，要从外面一层一层展开；躺进去后，再一层一层盖上一样。**

<!-- more -->

## koa 中的洋葱圈模型

在koa中，中间件是洋葱圈模型。什么是洋葱圈模型呢？

![](/assets/posts/ShapesOct-24-15.23.png)

每一层都是一个中间件，先从外到里执行next前的处理，再由中心向外部执行next之后的处理。每一层都有两次执行时机。

我们先使用koa来看一下中间件执行的时机及过程

```js
const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  console.log('中间件1 -- next之前')
  next()
  console.log('中间件1 -- next之后')
})

app.use((ctx, next) => {
  console.log('中间件2 -- next之前')
  next()
  console.log('中间件2 -- next之后')
})

const port = 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
```

执行如图所示

![](/assets/posts/ShapesOct-24-15.32.png)

打印结果如下

```
中间件1 -- next之前
中间件2 -- next之前
中间件2 -- next之后
中间件1 -- next之后
```

## 简易的洋葱圈模型实现

```js
const { createServer } = require("node:http")
class Koa {
  handlers = []
  ctx = {}
  use(handler) {
    if (typeof handler !== "function") {
      throw new Error("middleware is must be a function")
    }

    this.handlers.push(handler)
  }

  _execute() {
    if (this.handlers.length === 0) return
    const first = this.handlers.shift()

    first(this.ctx, () => {
      this._execute()
    })
  }

  listen(port, callback) {
    const app = createServer((req, res) => {
      this._execute()

      res.writeHead(200, { "Content-type": "application/json" })
      res.end(
        JSON.stringify({
          status: 200,
          message: "hello my koa",
        })
      )
    })

    app.listen(port, typeof callback === "function" ? callback : null)
  }
}

const app = new Koa()

app.use((ctx, next) => {
  console.log("中间件1 -- next之前")
  next()
  console.log("中间件1 -- next之后")
})

app.use((ctx, next) => {
  console.log("中间件2 -- next之前")
  next()
  console.log("中间件2 -- next之后")
})

const port = 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
```