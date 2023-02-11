---
title: vite开发时问题及解决方案
tags: []
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:58:34
description:
cover:
banner:
---

使用 vite 开发时可能会遇到的问题及解决方案

<!-- more -->

## vue+ts 工程：找不到模块“@/api/user”或其相应的类型声明

在 `tsconfig.node.json` / `tsconfig.json` 文件中添加

```json {3-6}
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## vue3 项目报错：无法使用 JSX，除非提供了 "--jsx" 标志

在 `tsconfig.node.json` / `tsconfig.json` 文件中添加

```json {3}
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```
