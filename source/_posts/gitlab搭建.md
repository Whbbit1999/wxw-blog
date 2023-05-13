---
title: gitlab搭建
tags: []
categories: []
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - title: gitlab-cicd-保姆式讲解从零到一搭建部署流程
    url: https://www.bilibili.com/video/BV1YP411N7sT?p=2&vd_source=6e32730b05dc719c9f21598867bef69d
date: 2023-03-29 18:35:11
description:
cover:
banner:
---

这两天买了一个零刻的小主机用来练习 linux 系统的使用，顺便搭建一个 gitlab 仓库，用来学习 gitlab 的自动集成。

<!-- more -->

## 安装环境和 gitlab

安装 ssh 用于远程连接

安装 `gitlab`

```shell
wget --content-disposition https://packages.gitlab.com/gitlab/gitlab-ce/packages/ubuntu/bionic/gitlab-ce_15.4.3-ce.0_amd64.deb/download.deb
​
sudo dpkg -i gitlab-ce_15.4.3-ce.0_amd64.deb
```

安装成功后 gitlab 的 logo 和名字会出现在命令行中

## 登录

安装完成后我们需要进入 `/etc/gitlab/initial_root_password` 查看初始密码

```shell
sudo vim /etc/gitlab/initial_root_password
```

> 初始用户是 root
