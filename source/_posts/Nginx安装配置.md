---
title: Nginx安装配置
tags: [Nginx]
categories: [代码人生, Linux/运维]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 13:27:32
description:
cover:
banner:
---

ubuntu 系统中 Nginx 的简易安装和配置

<!-- more -->

# nginx

> 在这里我服务器使用的 ubuntu 的系统，所以就用它举例。其他操作系统几乎一致。

## 在 ubuntu 中安装 nginx

```shell
sudo apt update
sudo apt install nginx
```

安转完成 nginx 会自动启用，您可以在浏览器中输入您的 ip 进行查看（需要确认您的服务防火墙开启了 80 端口）。或者使用命令

```shell
sudo systemctl status nginx
```

## nginx 常用命令

- 启动 nginx 服务

```shell
sudo nginx -s start
```

- 停止 nginx 服务

```shell
sudo nginx -s stop
```

- 重启 nginx 服务

```shell
sudo nginx -s reload
```

## nginx 配置

### 配置文件详情

- 默认的配置文件在 `/etc/nginx/`目录下
- 主要的配置文件是 `/etc/nginx/nginx.conf`
- Nginx 服务器配置文件被储存在 `/etc/nginx/sites-available` 目录下。在 `/etc/nginx/sites-enabled` 目录下的配置文件都将被 Nginx 使用。

### 自定义配置

我们可以使用 `sudo vim /etc/nginx/sites-enabled/default` 来查看和修改 nginx 配置文件

> 这里使用 sudo 是为了避免遭遇权限问题导致文件保存报错

下面是主要要修改的配置

```text
server {
  listen 80;
  listen [::]:80;

  server_name example.com;

  root /var/www/example.com;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }
}
```

#### 我们可以在 `location` 这个模块下 新建一个 `root` 来指定我们要访问的跟路径

```
location / {
  root /code/vitepress/dist;
}
```

如果该项目和默认配置的 root 地址不是一个，需要在 location 模块中配置对应的 root 目录，不然网站的 css 或者其他文件会加载不到

#### 我们可以设置 index 来设置默认访问文件

```
location / {
  index index.html;
}
```

这里的 index.html 会自动拼接上面设置的 root 路径，如果在 location 中没有配置 root 就会使用全局的 server 下的 root 路径

{% note color:cyan 注意 记得每行命令结束后加上 `;`， 要不然会报错的 %}
