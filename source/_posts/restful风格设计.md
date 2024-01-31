---
layout: topic
topic: nest
title: restful风格设计
tags: []
categories: []
poster:
  # topic: 标题上方的小字
  headline: "restful风格设计"
  # caption: 标题下方的小字
  color: #fff
references:
  - "[RESTful API](https://restfulapi.cn/)"
date: 2024-01-20 22:56:21
description:
cover: /assets/posts/nest-cover.png
banner:
---

{% quot 为什么要使用 RESTful 架构？ el:h2%}

RESTful 可以充分利用 HTTP 协议的各种功能，可以让接口设计更加清晰、简洁、富有层次，可维护性更好。

{% quot API 设计风格 el:h2%}

<!-- {% note 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %} -->

**请求 = 动词 + 宾语**

动词：使用 HTTP 的 5 种方法，对应 CRUD 操作

宾语： URL 应该全部使用名词复数，可以有例外，比如搜索可以使用更加直观的 search 。

过滤信息（Filtering）： 如果记录数量很多，API 应该提供参数，过滤返回结果。 ?limit=10 指定返回记录的数量 ?offset=10 指定返回记录的开始位置。

{% quot 示例：一个用户的操作 el:h3%}

- 添加用户: {% mark GET color:green %} `/api/users`
- 编辑用户(更新该用户全部数据): {% mark PUT color:blue %} `/api/users/1`
- 编辑用户(更新用户部分数据): {% mark PATCH color:blue %} `/api/users/1`
- 查询用户列表: {% mark GET color:green %} `/api/users`
- 查询单个用户: {% mark GET color:green %} `/api/users/1`
- 删除用户: {% mark DELETE color:red %} `/api/users/1`

{% quot 响应设计 el:h2%}

### HTTP 状态码使用

客户端的每一次请求，服务器都必须给出回应。回应包括 HTTP 状态码和数据两部分。

使用 不同的 HTTP 状态码表示不同类型的响应。每一种状态码都有约定的解释，客户端只需查看状态码，就可以判断出发生了什么情况。

- {% mark 2xx %} 操作成功
- {% mark 3xx %} 重定向
- {% mark 4xx %} 客户端错误
- {% mark 5xx %} 服务器错误

### 服务端数据响应

客户端请求时，要明确告诉服务器，接受 JSON 格式，请求的 HTTP 头的 ACCEPT 属性要设成 application/json

服务端响应的数据不应该是纯文本，而应该是一个 JSON 对象。服务器回应的 HTTP 头的 Content-Type 属性要设为 application/json

错误处理 如果状态码是 4xx，就应该向用户返回出错信息。一般来说，返回的信息中将 error 作为键名，出错信息作为键值即可。 `{error: "Invalid API key"}`

认证 RESTful API 应该是无状态，每个请求应该带有一些认证凭证。推荐使用 JWT 认证，并且使用 SSL

Hypermedia 即返回结果中提供链接，连向其他 API 方法，使得用户不查文档，也知道下一步应该做什么
