---
title: golang基础语法
tags: [go]
categories: [代码人生, 后端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 16:02:15
description:
cover:
banner:
---

golang 基础语法概览

<!-- more -->

## 打印内容

```go
package main
import "fmt"

func main () {
  fmt.Println("hello")
}
```

## 注释

```go
// 单行注释

/*
 多行注释
 */
```

## 变量声明

```go
// 单独声明
var age int
var name string

// 类型一致时可以只写一次
var a, b int

// 会自动推断类型
var username = "whbbit"
```
