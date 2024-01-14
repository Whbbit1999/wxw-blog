---
title: screen使用
tags: []
categories: []
poster:
  # topic: 标题上方的小字
  # headline: 大标题
  # caption: 标题下方的小字
  # color: 标题颜色
references:
date: 2023-03-31 19:44:20
description:
cover:
banner:
---

对于 使用 frp 将本地 mc 服务器映射到公网 文章中使用 screen 的说明和 screen 的简单使用

<!-- more -->

创建 screen 窗口并命名

```bash
screen -S 名称
```

查看 screen 列表

```bash
screen -list
```

```bash
screen -ls
```

![](/assets/posts/screen.png)

恢复 screen 会话

```bash
screen -r
```

从 screen 会话中脱离

```bash
ctrl + a d
```
