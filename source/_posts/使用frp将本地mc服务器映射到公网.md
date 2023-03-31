---
title: 使用frp将本地mc服务器映射到公网
tags: []
categories: []
poster:
  # topic: 标题上方的小字
  # headline: 大标题
  # caption: 标题下方的小字
  # color: 标题颜色
references:
  - title: ""
    url: ""
date: 2023-03-31 18:42:55
description:
cover: /assets/posts/minecraft.jpg
banner: /assets/posts/minecraft.jpg
---

最近买了一个迷你主机，想着用来搭建一个 minecraft 服务器用来和朋友们一起联机，搭建好了才发现好像没什么玩 minecraft 的朋友了。

<!-- more -->

我这里使用的都是 Ubuntu 系统，就按这个来操作吧

## 两端都需要的操作

### 安装 frp

从 GitHub 下载 frp

```bash
wget https://github.com/fatedier/frp/releases/download/v0.48.0/frp_0.48.0_linux_amd64.tar.gz
```

解压到本地

```bash
tar -zxvf frp_0.48.0_linux_amd64.tar.gz
```

将解压后的文件夹复制一份出来并重命名来操作

```bash
cp -r frp_0.48.0_linux_amd64 frp
```

## 服务端操作（公网云服务）

进入 frp 目录并编辑 frps.ini 文件

```ini
[common]
bind_port = 7000
vhost_http_port = 8080
```

安装 screen

```bash
sudo apt install screen
```

创建 screen 并且启动 frp

```bash
# 新建一个screen窗口并且命名为 minecraft-frp
screen -S minecraft-frp
```

```bash
# 启动frp
cd frp
sudo ./frps -c frps.ini
```

记得在云服务防火墙中开启 7000 和 25565 端口

## 本地服务端操作

进入 frp 目录并更改 frpc.ini 文件

```ini
[common]
server_addr = 云服务器公网ip
server_port = 7000

[minecraft]
type = tcp
local_ip = 127.0.0.1
local_port = 25565
remote_port = 25565
```

本地 Ubuntu 服务器开启对应端口

```bash
sudo ufw allow 7000
sudo ufw allow 25565
```

创建 screen 并且启动 frp

```bash
# 新建一个screen窗口并且命名为 minecraft-client-frp
screen -S minecraft-client-frp
```

```bash
# 启动frp
cd frp
sudo ./frpc -c frpc.ini
```

## 结语

在做完上面的操作后，就可以使用公网 ip 来链接 mc 服务器了。如果你有域名，也可以使用使用域名解析到对应的 ip。
