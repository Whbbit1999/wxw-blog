---
layout: wiki
wiki: frontNotes
title: 浏览器输入URL后发生了什么
---

`http://www.bilibili.com/space/xxxx.html`

URL 是由

- 访问协议 `http`
- 服务器名称：域名 `www.bilibili.com`
- 资源的路径名
  - 目录名 `/space/`
  - 文件名 `xxxx.html`

## DNS 查询

为什么要有 DNS？

每个服务器的地址其实是一个 IP 地址，IP 不是很好记忆，衍生出了域名来辅助我们记忆。DNS 可以通过域名来查找对应的 IP 地址

DNS 查询顺序如下，若其中一步成功则直接跳转到建立连接部分：

- 浏览器自身 DNS
- 操作系统 DNS
- 本地 hosts 文件
- 向域名服务器发送请求
  查找顺序如下：

  1. 客户端-> 本地 DNS 服务器 -> 根域名服务器
  2. 客户端-> 本地 DNS 服务器 -> 顶级域名服务器
  3. 客户端-> 本地 DNS 服务器 -> 权威域名服务器

## 发送网络请求

OSI 七层网络模型

## 解析页面
