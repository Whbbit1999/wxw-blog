---
title: prisma实践——结合nestjs实现restful风格api
tags: [node, prisma, orm, nestjs]
categories: [代码人生, 后端技术]
# poster:
#   topic: 标题上方的小字
#   headline: 大标题
#   caption: 标题下方的小字
#   color: 标题颜色
references:
  - title: ""
    url: ""
date: 2023-01-03 14:10:44
description: prisma实现restful风格api
cover:
banner:
---

本文我们使用 prisma + nestjs 实现一下 restful 风格的 api

<!-- more -->

## 初始化项目和依赖安装

初始化 nest 项目

```shell
nest new restful-test
```

安装依赖

```shell
pnpm i
```

```shell
pnpm i
```

## 编写 prisma 模型

```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String?
  email     String    @unique
  nickName  String    @default("") @map("nick_name")
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
}
```

## 接口编写

使用 nest cli 自动生成 crud 模板

```shell
nest g resolve user
```

编写对应的 controller

```ts

```

```ts

```

测试接口调用
