---
title: gin初始化项目
tags: [gin, go, 服务端]
categories: [代码人生, 后端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - '[gin](https://gin-gonic.com/zh-cn/docs/quickstart/)'
	- '[ini](https://ini.unknwon.io/docs)'
	- '[gorm](https://gorm.io/index.html)'
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

## 网站目录初始化

> 定义一个初始化的项目目录，方便后期开发

```txt
--| api/          # 放置api接口，相当于controller
	--| v1/
--| config/       # 放置网站配置文件
	--| config.ini
--| middleware/   # 中间件
--| model/        # 数据模型
--| routes/       # 网站路由
--| upload/       # 上传静态文件托管
--| utils/        # 公共函数
--| web/          # 前端静态文件托管
--| main.go       # 项目入口
```

## 使用 ini 做网站配置

```shell
go get -u gopkg.in/ini.v1
```

```ini config/config.ini
# 网站服务配置
[server]
AppMode = debug # debug or server
HttpPort = :9999
JWTToken = ajlsdflasjdjlasjdlf

# 数据库配置
[database]
DB = mysql
DBHost = localhost
DBPort = 3306
DBUser = root
DBPwd = admin888
DBName = ginblog
```

```go utils/setting.go
package utils

import (
	"fmt"

	"gopkg.in/ini.v1"
)

var (
	AppMode  string
	HttpPort string
	JWTToken string

	DB     string
	DBHost string
	DBPort string
	DBUser string
	DBPwd  string
	DBName string
)

func init() {
	file, err := ini.Load("config/config.ini")

	if err != nil {
		fmt.Println("配置文件错误，请确认配置文件是否正确")
	}

	LoadServer(file)
	LoadDataBase(file)
}

// 加载网站配置
func LoadServer(file *ini.File) {
	AppMode = file.Section("server").Key("AppMode").MustString("debug")
	HttpPort = file.Section("server").Key("HttpPort").MustString(":9999")
	JWTToken = file.Section("server").Key("JWTToken").MustString("ajlsdflasjdjlasjdlf")
}

// 加载数据库配置
func LoadDataBase(file *ini.File) {
	DB = file.Section("database").Key("DB").MustString("mysql")
	DBHost = file.Section("database").Key("DBHost").MustString("localhost")
	DBPort = file.Section("database").Key("DBPort").MustString("3306")
	DBUser = file.Section("database").Key("DBUser").MustString("root")
	DBPwd = file.Section("database").Key("DBPwd ").MustString("admin888")
	DBName = file.Section("database").Key("DBName").MustString("ginblog")
}

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

## 使用 gorm 操作 mysql 数据库

```shell
go get -u gorm.io/gorm
```

```shell
go get -u gorm.io/driver/mysql
```

### 配置 gorm 连接数据库

```go model/db.go
package model

import (
	"fmt"
	"server/utils"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB
var err error

func InitDB() {
	db, err = gorm.Open(mysql.Open(fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		utils.DBUser,
		utils.DBPwd,
		utils.DBHost,
		utils.DBPort,
		utils.DBName,
	)))

	if err != nil {
		fmt.Println("数据库连接失败，请检查参数", err)
	}

	// 迁移文件
	db.AutoMigrate(&User{}, &Article{}, &Category{})

	// 获取通用数据库对象 sql.DB ，然后使用其提供的功能
	db, err := db.DB()
	if err != nil {
		fmt.Println("数据库连接失败，请检查参数", err)
	}

	// SetMaxIdleConns 用于设置连接池中空闲连接的最大数量。
	db.SetMaxIdleConns(10)

	// SetMaxOpenConns 设置打开数据库连接的最大数量。
	db.SetMaxOpenConns(100)

	// SetConnMaxLifetime 设置了连接可复用的最大时间。
	db.SetConnMaxLifetime(10 * time.Second) // 最大连接时间10s，超出10s就超时

	// 关闭数据库连接
	db.Close()
}

```

### 创建数据模型

```go model/User.go
package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"type:varchar(20);not null" json:"username"`
	Password string `gorm:"type:varchar(20);not null" json:"password"`
	Role     int    `gorm:"type:int" json:"role"`
}
```

```go model/Category.go
package model

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	Name string `gorm:"varchar(20);not null" json:"name"`
}
```

```go model/Article.go
package model

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	Title    string   `gorm:"varchar(100);not null" json:"title"`
	Body     string   `gorm:"longtext;not null" json:"body"`
	Desc     string   `gorm:"varchar(200);" json:"desc"`
	Cover    string   `gorm:"varchar(100);" json:"cover"`
	Category Category `gorm:"foreignKey:Cid"`
	Cid      int      `gorm:"int;not null" json:"cid"`
}
```
