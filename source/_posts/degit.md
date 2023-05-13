---
title: degit -- 拉取项目（不包含提交记录）
tags: []
categories: []
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - title: ""
    url: ""
date: 2023-03-28 20:47:28
description:
cover:
banner:
---

使用开源项目进行代码拉取时，我们不想要之前的提交记录该怎么办呢？

<!-- more -->

npm：
{%link https://www.npmjs.com/package/degit?activeTab=readme %}

{%quot 简单使用 %}
在使用时，我们需要先在本地全局安装

```bash
npm install -g degit
```

安装成功后，我们可以使用命令安装项目

```bash
degit [用户名/仓库] [本地项目名称]
```

这里我们使用 degit 安装 sable admin 来测试一下

```bash
degit Whbbit1999/sable.git sableAdmin
```

![deigt克隆项目](/assets/posts/deigt克隆项目.png)

进入项目我们可以发现，这时我们没有对应的 git 提交记录了。我们可以开心的进行二次开发了

```bash
cd sableAdmin
```

<!-- ![成功后没有git记录]()

![使用git克隆，会有完整的git提交记录]() -->
