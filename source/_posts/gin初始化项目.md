---
title: gin初始化项目
tags: [gin, go, 服务端]
categories: [go]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 16:02:46
description:
cover:
banner:
---

初始化一个 gin 的项目，领略一下 go 语言的风采

<!-- more -->

## 初始化项目

1. 初始化 go 项目

```shell
go mod init <program-name>
```

2. 配置国内镜像

```shell
go env -w GOPROXY=https://goproxy.io,direct
```

3. 引入 gin 框架

```shell
go get -u github.com/gin-gonic/gin
```

4. 编写一个网络请求

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "ping",
		})
	})
	r.Run(":9999") // 在9999端口启动服务，不填默认在8080端口启动
}
```

5. 启动项目

```shell
go run main.go
```

## router 分组

```go main.go
package main

import (
	"github.com/gin-gonic/gin"
	v1 "whbbit.cn/gin/router/v1"
)

func main() {
	r := gin.Default()
	v1.InitRouter(r)
	r.Run(":9999")
}

```

```go router/v1
package v1

import "github.com/gin-gonic/gin"

func InitRouter(g *gin.Engine) {
	v1 := g.Group("v1")

	v1.GET("/hello", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello v1",
		})
	})

	v2 := g.Group("v2")
	v2.GET("/hello", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello v2",
		})
	})
}
```

---

## 使用资料

[gin](https://gin-gonic.com/zh-cn/docs/quickstart/)  
[ini](https://ini.unknwon.io/docs)  
[gorm](https://gorm.io/index.html)
