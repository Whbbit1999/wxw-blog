---
title: macos使用
tags: []
categories: []
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
date: 2023-04-17 12:58:58
description:
cover:
banner:
---

## 关闭指定端口

查看对应端口的详细信息

```bash
lsof -i:[host]
```

找到对应的 pid，使用 kill 关闭

```bash
kill -9 [pid]
```
