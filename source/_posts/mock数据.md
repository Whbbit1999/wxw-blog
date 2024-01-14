---
title: mock数据
tags: []
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - "[json-server](https://www.npmjs.com/package/json-server)"
  - "[mockjs GitHub地址](https://github.com/nuysoft/Mock)"
  - "[mockjs 示例](http://mockjs.com/examples.html)"
date: 2022-12-31 13:59:25
description:
cover:
banner:
---

在开发中我们常会用到一些模拟数据来确定程序是否有问题，这次我们一起来看一下怎么使用模拟数据来进行测试

<!-- more -->

## json-server

### 安装

```shell
npm i -g json-server
```

### 使用

在本地创建一个`db.json`文件，填写需要模拟的数据

```json
{
  "post": [
    { "id": 1, "title": "三体" },
    { "id": 2, "title": "流浪地球" }
  ]
}
```

### 启动

```shell
json-server --watch db.json --port 3004
```

`--watch` 表示监听 db.json 数据的变化

`--port` 后可以根据实际情况来指定服务启动的端口

启动成功后，我们就可以使用 restful 风格的接口来进行增删改查的操作了

```
GET http://localhost:3004/post
GET http://localhost:3004/post/1
PUT http://localhost:3004/post/1
POST http://localhost:3004/post
DELETE http://localhost:3004/post/1
```

### 使用编程模式创建模拟数据

除了我们手动填写数据，还可以使用编程的方式来批量生成 mock 数据来进行测试

```js mock.js
module.exports = () => {
  const data = { post: [] }
  for (let i = 0; i < 20; i++) {
    data.post.push({
      id: i,
      content: `post content ${i}`,
    })
  }

  return data
}
```

```shell
json-server mock.js
```

上面的方法虽然可以模拟数据，但是少一些数据的随机性。我们可以使用 mockjs 来模拟生成其他类型的 mock 数据

## mockjs

初始化 node 项目

```shell
npm init -y
```

安装依赖

```shell
npm i -D mockjs
```

编写 mock.js 文件用于 json-server 模拟数据

```js mock.js
const mockjs = require("mockjs")
const Random = mockjs.Random
module.exports = () => {
  const data = { post: [] }
  for (let i = 0; i < 5; i++) {
    data.post.push({
      id: i,
      content: Random.cword(3),
    })
  }
  return data
}
```

启动

```
json-server --watch --port 9999 mock.js
```

我们在浏览器使用`http://localhost:9999/post`就可以获取到刚才创建好的 mock 数据了

```json
[
  {
    "id": 0,
    "content": "问形院"
  },
  {
    "id": 1,
    "content": "同离去"
  },
  {
    "id": 2,
    "content": "队农而"
  },
  {
    "id": 3,
    "content": "分列流"
  },
  {
    "id": 4,
    "content": "即飞月"
  }
]
```

具体 `mockjs` 的使用方式，可以查看文章下方的 [mockjs 示例](http://mockjs.com/examples.html)
