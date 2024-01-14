---
title: 使用Hexo Stellar 主题搭建一个独立博客站点
tags: [hexo]
categories: [代码人生, 静态站点]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - "[Stellar](https://xaoxuu.com/wiki/stellar/pages/)"
  - "[hexo](https://hexo.io/zh-cn/)"
date: 2023-01-31 00:48:42
description:
cover:
banner:
---

如何使用 stellar 主题做一个自己的独立站点呢？

<!-- more -->

{% note color:cyan 介绍 这里是使用[stellar创建个人站点]()系列视频的文字部分，可以方便的粘贴一些配置项。 %}

## 准备工作

1. 安装 git 环境 `https://git-scm.com/download/win`
2. 安装 nodejs 环境 `https://nodejs.org/en/`
   记得去官网下载，下载这个是免费的
3. 安装 hexo-cli
   我们可以访问[hexo 中文网](https://hexo.io/zh-cn/)按照提示安装 hexo-cli

```bash
npm i -g hexo-cli
```

## 初始化项目

```bash
hexo init stellar-blog && cd stellar-blog
```

初次运行前，我们需要下载对应的依赖

```bash
npm i
```

依赖安装后，我们可以运行

```bash
npm run server
```

或者

```bash
hexo server
```

来启动 hexo 项目。运行成功后，我们可以看到一个网址，我们访问这个网址，如果出现了下面的这个页面，说明我们已经成功初始化了一个 hexo 博客。接下来我们就使用 hexo 提供的主题功能美化一下它吧。

## 主题配置

进入[stellar 主题官网](https://xaoxuu.com/wiki/stellar/)，按照它的提示进行如下步骤：

1. 安装主题

```bash
npm i hexo-theme-stellar
```

2. 在 stellar-blog/\_config.yml 文件中找到并修改：

```yml
theme: stellar
```

完成后，我们重新启动一下服务`npm run server`来看一下，发现网站已经变的和官网的页面差不多了，接下来来和我一起配置一下网站的其他内容吧。

### 配置网站基本信息

在 stellar-blog/\_config.yml 文件夹中找到对应的选项修改为您站点的内容

```yml
title: 您的网站名称
avatar: 您的头像链接
favicon: 您的网站icon

# 多语言
language:
  - zh-CN
```

`_config.yml` 只是进行一些基础的配置，关于 stellar 主题的配置，我们需要在根目录下创建 `_config.stellar.yml`

### \_config.stellar.yml 文件配置

我们可以去 `node_modules/hexo-theme-stellar/_config.yml` 找到啊 stellar 项目的原始配置文件，复制到我们创建的`_config.stellar.yml`文件中。然后在此基础上进行改动

一般我们需要改动的只有`sidebar`部分和`footer`部分。

sidebar 部分我们需要配置网站的侧边栏

```yml
sidebar:
  menu:
    post: "[btn.blog](/)"
    wiki: "[专栏](/wiki/)"
    notes: "[导航](/notes/)"
    more: "[关于](/about/)"
```

我们也可以在 sidebar 部分配置每个页面需要出现的小部件。[自定义的小部件](#自定义小部件)需要我们在 `widgets.yml` 文件中声明

```yml
sidebar:
  widgets:
    #### 自动生成的页面 ####
    # 主页
    home: search, welcome, recent, ad, tagcloud, timeline # for home
    # 博客索引页
    blog_index: search_blog, recent, ad, timeline # for categories/tags/archives
    # 文档索引页
    wiki_index: search_docs, recent, ad, timeline # for wiki
    # 其它（404）
    others: search, welcome, recent, timeline # for 404 and ...
    #### 手动创建的页面 ####
    # 文章内页
    post: toc, ghrepo, search, ghissues, ad # for pages using 'layout:post'
    # 文档内页
    wiki: search, ghrepo, toc, ad, ghissues, related # for pages using 'layout:wiki'
    # 其它 layout:page 的页面
    page: welcome, toc, ad # for custom pages using 'layout:page'
```

当我们需要添加一个底部站点导航时，我们需要在`footer`部分添加`sitemap`

```yml
footer:
  sitemap:
    "博客":
      - "[近期](/)"
      - "[分类](/categories/)"
      - "[标签](/tags/)"
      - "[归档](/archives/)"
    "专栏":
      - "[vscode基础配置](/wiki/vscode/index.html)"
      - "[typescript基础](/wiki/typescript/index.html)"
    "更多":
      - "[友链](/)"
      - "[关于本站](/about/)"
      - "[文档站点](http://doc.whbbit.cn)"
      - "[GitHub](https://github.com/Whbbit1999)"
```

### 自定义小部件

在`widgets.yml`文件中，我们可以定义一些小组件。官方定义的我们直接粘贴就行。这里我说一下自定义小组件

```yml
ad:
  layout: markdown
  title: 可能是广告位吧🤨
  content: |
    [![sable-admin-ad.jpg](/assets/sable-admin-ad.jpg)](https://github.com/Whbbit1999/sable)
```

### 创建独立页面

在 widgets.yml 中创建对应的 widgets

```yml
Notes:
  name: 笔记
  title: 笔记
  description: 一个隐藏项目：笔记
  index: false
  # sidebar: [toc]
  tags: 知识库
  sections:
    "日常问题解决方案": [100, 199]
    "移动端开发笔记": [200, 299]
    "前端学习笔记": [300, 399]
    "在线工具": [400, 499]
```

添加后，可以在`_config.stellar.yml`中添加对应的 sidebar

```yml
sidebar:
  ...
  menu:
    ...
    notes: "[笔记](/notes/)"
```

> 创建对应的文件夹（文件夹名需要对应路径），这里需要创建对应的 notes 文件夹

如果你有 wiki 页面并且不想让它出现在 wiki 页面中时，可以在`projects.yml`中添加

```yml
Notes:
  index: false
```

接下来你就可以在对应的目录下书写对应的内容了。

### 添加友链

[需要注意将 actions 的权限更改为可以写入内容](https://github.com/ad-m/github-push-action/issues/96#issuecomment-889984928)

## 使用 GitHub pages 托管静态网站

## 进阶部分——使用 hexo 注入功能实现自定义功能

### 代码块复制功能

[实现代码块复制功能](https://www.whbbit.cn/2023/01/31/stellar%E4%B8%BB%E9%A2%98%E6%B7%BB%E5%8A%A0%E4%BB%A3%E7%A0%81%E5%9D%97%E5%A4%8D%E5%88%B6%E5%8A%9F%E8%83%BD/)

> 目前该主题已支持通过配置实现代码复制功能

### 注入谷歌统计和百度统计

```js
"use strict"

// 百度统计和google 统计
hexo.extend.injector.register("body_end", function () {
  return `<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?31181a38d70c8faf2c5bed0d93cab07b";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
  </script>

  <script async="async" src="https://www.googletagmanager.com/gtag/js?id=G-FTR5YKFFCM"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());
    gtag('config', 'G-FTR5YKFFCM');
  </script>
  `
})
```

这些只是 stellar 主题的基础使用，更多进阶部分您可以访问 stellar 主题页面中的[探索号]()进行查看

## 结语

结合官方文档，您应该可以很轻松的使用 stellar 主题来搭建一个你自己的站点了。不妨先去试试！！！

如果您遇到什么问题可以在本期视频下方或者文章下方评论，我们可以一起解决问题。
