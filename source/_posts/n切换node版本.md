---
title: n切换node版本
tags: [node]
categories: [node]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:53:21
description:
cover:
banner:
---

linux 和 mac 下如何切换不同的 node 版本呢？

<!-- more -->

## 安装

```bash
npm i -g n
```

## 为什么使用 n 切换版本无效

> n 的安装路径和 node 默认路径不一致

1. 查看 node 安装路径

```shell
which node
```

2. 编辑`.bash_profile`文件

```shell
vim ~/.bash_profile
```

在该文件中添加

```text
export N_PREFIX=/usr/local/bin/node #根据你的安装路径而定
export PATH=$N_PREFIX/bin:$PATH
```

---

3. 保存并刷新文件

```shell
source ~/.bash_profile
```

4. 重新安装 n

```shell
n stable
```

这次就可以切换版本了，但是需要授予 sudo 权限

```shell
sudo n
```

## 参考文章

[n 模块切换 node 版本无效的解决办法](https://segmentfault.com/a/1190000038420280)
