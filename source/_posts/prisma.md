---
title: prisma
tags: [node, prisma, orm]
categories: [代码人生, 后端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2023-01-02 23:08:07
description:
cover:
banner:
---

prisma 是 nodejs 中著名的 orm 框架，这篇文章我们一起来了解一下 prisma 怎么结合 node 进行数据操作

<!-- more -->

官方网址：
{% link https://www.prisma.io/ %}

## node 项目中引入 prisma 和初始化

创建一个 node 项目

```shell
mkdir prisma && cd prisma && pnpm init -y
```

引入 prisma

```shell
pnpm i prisma -D
```

初始化一个使用 sqlite 的 prisma

```
npx prisma init --datasource-provider sqlite
```

这时，你可以看到该项目中有一个 prisma 文件夹和一个`.env`文件，prisma 文件夹里面包含了一个`schema.prisma`文件，`.env`文件里则是数据库的配置

> 如果你使用 vscode 作为开发工具的话可以下载`https://marketplace.visualstudio.com/items?itemName=Prisma.prisma`插件让`.prisma`文件有高亮和格式化功能。

此时`schema.prisma`文件里的内容包含如下:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

### 知识点

1. `provider = "sqlite"` 标识当前使用的数据库是 `sqlite`
2. `provider = "prisma-client-js"` 标识当前项目是 js 项目
3. `url = env("DATABASE_URL")` 标识当前项目数据库文件地址

## prisma 中的模型创建

> 以一个用户表来进行演示

```prisma
model User{
  id        Int       @id @default(autoincrement())
  name      String?
  email     String    @unique
  nickName  String    @default("") @map("nick_name")
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")

  @@map("users")
}
```

上面这段代码表示：创建一个 User 模型，其中包含的字段有：

1. 一个 id ，整型自动递增
2. 一个可选的 name
3. 一个唯一值的 email

### 知识点

1. prisma 中创建模型使用关键字`model`
2. 标识一个字段为 id 使用 `@id`
3. 设置非必填字段使用 `?`
4. 给该字段一个默认值使用 `@default("")`
5. 给字段名在数据库中重新命名使用 `@map("")`
6. 给一个模型在数据库中重新命名使用 `@@map("")`

> **prisma 文件中所有引号需要使用双引号`""`**

## 使用 prisma studio 查看创建好的数据库

```shell
npx prisma studio
```

## 数据库迁移

创建好表结构定义后，执行 `npx prisma migrate dev` 命令，会在 `prisma/migrations` 目录下生成迁移文件，同时在数据库中创建表。

```bash
npx prisma migrate dev
```

此条命令动作为：根据定义生成迁移文件->执行新的迁移文件修改表 -> 生成 Prisma Client

## 重置数据库

```bash
npx prisma migrate reset
```

此条命令动作为：删除数据库->创建同名数据库->执行所有迁移文件->运行 seed 数据填充
