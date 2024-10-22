---
title: rest client插件使用
tags: [vscode, 插件]
categories: [代码人生, 编码工具]
poster:
  topic: #标题上方的小字
  headline: rest client插件使用 #大标题
  caption: #标题下方的小字
  color: #标题颜色
date: 2023-01-03 20:13:52
description:
cover: /assets/posts/vscode.png
banner: /assets/posts/vscode.png
---

rest client 是 vscode 中类似 Postman 的 api 接口请求利器。

<!-- more -->

{% link https://marketplace.visualstudio.com/items?itemName=humao.rest-client %}

## 创建 http 文件

> 使用 `.http` 结尾的文件可以被 `rest-client` 插件识别

注意：

1. 以 `###` 分割接口
2. `@uri` 可以定义请求前缀，且不能加 `""`
3. 示例里的接口服务器地址在国外，测试时可能会发生错误，发生错误时多试几次即可
   {% link http://jsonplaceholder.typicode.com/ %}

```http api.http
@uri=https://jsonplaceholder.typicode.com

###
GET {{uri}}/posts/1

###
GET {{uri}}/posts

###
POST {{uri}}/posts
Content-Type: application/json;charset=UTF-8

{
  "title": "foo",
  "body": "bar",
  "userId": 1
}

###
PUT {{uri}}/posts/1
Content-Type: application/json;charset=UTF-8

{
  "id": 1,
  "title": "foo",
  "body": "bar",
  "userId": 1
}

###
PATCH {{uri}}/posts/1
Content-Type: application/json;charset=UTF-8

{
  "title": "foo",
}

###
DELETE {{uri}}/posts/1

### form表单传值
POST  {{uri}}/file
Content-Type: application/x-www-form-urlencoded

fileName=helloHono&fileSize=1024
```
