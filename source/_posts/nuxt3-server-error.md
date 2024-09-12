---
topic: nuxt
title: Nuxt报错解决
tags: []
categories: []
poster:
  topic: null
  headline: "Nuxt报错解决" #null
  caption: null
  color: null
date: 2024-09-09 15:33:19
description: "nuxt error"
cover: /assets/posts/nuxt.jpg
banner: /assets/posts/nuxt.jpg
references:
  - "[官方文档地址](https://nuxt.com/docs/api/utils/dollarfetch)"
---

## nuxt error Error: Hostname/IP does not match certificate's altnames
在 nuxt 项目中使用/server 中对接口进行转发，接口中的地址使用是和后端同一内网的地址，所以是一个 ip 地址，在近期更新中遇到页面中数据缺失，查看 pm2 日志发现报错：

cause: Error: Hostname/IP does not match certificate's altnames: IP: 192.168.xx.xxx is not in the cert's list:

解决方案如下：
**在环境变量中添加 `NODE_TLS_REJECT_UNAUTHORIZED: 0`**

由于生产环境中是以 pm2 启动，更改其配置文件`ecosystem.config.js`，在 `env_production` 字段添加 `NODE_TLS_REJECT_UNAUTHORIZED: 0`

## [nuxt] [request error] [unhandled] [500] Cannot find package 'deep-pick-omit' imported from

1. node版本需要高于16.20.x
2. 不要使用`cnpm`，想要加速下载可以在 `.npmrc` 中配置 `registry=https://registry.npmmirror.com/`
