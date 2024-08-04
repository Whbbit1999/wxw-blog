---
title: mongodb快速使用
tags: ["mongodb", "学习笔记"]
categories: ["代码人生", "数据库"]
poster:
  topic: null
  headline: mongodb快速使用 # null
  caption: 使用 express + mongoose 快速开发API接口 # null
  color: null
date: 2024-08-01 22:28:48
description:
cover: /assets/posts/mongodb02.webp
banner: /assets/posts/mongodb02.webp
references:
---

## 安装

[mongodb 官网](https://www.mongodb.com/)
[mongodb 中文官网](https://www.mongodb.com/zh-cn)

{% quot el:h2 node 实例: 使用 express 和 mongoose 实现简单的文章管理 API %}

### 初始化项目

```bash
npm init -y
```

### 依赖安装

```bash
npm i express@latest cors mongoose
```

### 数据建模

```js
import mongoose from "mongoose"

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    title: { type: String },
  })
)
```

### 增删改查 API 实现

{% tabs active:1 align:center %}

<!-- tab 获取列表 -->

```js
app.get("/articles", async (req, res) => {
  const article = await Article.find()
  res.send({
    success: true,
    message: "get article list",
    data: article,
  })
})
```

<!-- tab 根据 id 获取详情 -->

```js
app.get("/articles/:id", async (req, res) => {
  const id = req.params.id
  const article = await Article.findById(id)
  res.send({
    success: true,
    message: "get article by id",
    data: article,
  })
})
```

<!-- tab 创建文章 -->

```js
app.post("/articles", async (req, res) => {
  const body = req.body

  const article = await Article.create({
    title: body.title,
  })

  res.send({
    success: true,
    message: "create article",
    data: article,
  })
})
```

<!-- tab 编辑文章 -->

```js
app.put("/articles/:id", async (req, res) => {
  const id = req.params.id
  const body = req.body

  const article = await Article.findById(id)
  article.title = body.title
  await article.save()

  res.send({
    success: true,
    message: "update article",
    data: article,
  })
})
```

<!-- tab 删除文章 -->

```js
app.delete("/articles/:id", async (req, res) => {
  const id = req.params.id
  await Article.deleteOne({ _id: id })

  // 或者可以使用以下方法进行删除
  // const article = await Article.findById(id)
  // await article.remove()

  res.send({
    success: true,
    message: "delete article",
  })
})
```

{% endtabs %}

{% folding child:codeblock open:false color:green 完整代码 %}

```js main.js
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/mongodb-test")
} catch (error) {
  console.error("error:数据库连接失败\n", error)
}

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    title: { type: String },
  })
)

app.get("/articles", async (req, res) => {
  const article = await Article.find()
  res.send({
    success: true,
    message: "get article list",
    data: article,
  })
})

app.get("/articles/:id", async (req, res) => {
  const id = req.params.id
  const article = await Article.findById(id)
  res.send({
    success: true,
    message: "get article by id",
    data: article,
  })
})

app.post("/articles", async (req, res) => {
  const body = req.body

  const article = await Article.create({
    title: body.title,
  })

  res.send({
    success: true,
    message: "create article",
    data: article,
  })
})

app.put("/articles/:id", async (req, res) => {
  const id = req.params.id
  const body = req.body

  const article = await Article.findById(id)
  article.title = body.title
  await article.save()

  res.send({
    success: true,
    message: "update article",
    data: article,
  })
})

app.delete("/articles/:id", async (req, res) => {
  const id = req.params.id
  await Article.deleteOne({ _id: id })
  res.send({
    success: true,
    message: "delete article",
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
```

{% endfolding %}

#### 查看运行情况

可以使用 vscode 插件 rest client 来测试接口运行情况，以下是我本地接口测试文件。如果你要在本地测试，可以将 `66ae4047563fa3933c1b38ba` 改成真实的查询列表里的某一个文章的 id 即可

{% note 说明 color:green
rest client 这个插件在我的博客里有介绍，可以移步 [rest client 插件使用](https://www.whbbit.cn/2023/01/03/rest-client%E6%8F%92%E4%BB%B6%E4%BD%BF%E7%94%A8/) 了解其基础使用方法
%}

{% folding child:codeblock open:false color:green 测试代码 %}

```http articles.http
@uri=http://localhost:3000

### 获取文章列表
GET {{uri}}/articles

### 创建文章
POST {{uri}}/articles
Content-Type: application/json

{
  "title": "添加文章标题"
}

### 根据id获取文章
GET {{uri}}/articles/66ae4047563fa3933c1b38ba

### 编辑文章
PUT {{uri}}/articles/66ae4047563fa3933c1b38ba
Content-Type: application/json

{
  "title": "编辑文章标题"
}

### 删除文章
DELETE {{uri}}/articles/66ae4047563fa3933c1b38ba
```

{% endfolding %}
