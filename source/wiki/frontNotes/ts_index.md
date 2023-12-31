---
layout: wiki
wiki: frontNotes
title: 初识 TypeScript
---

{% link https://www.typescriptlang.org/ %}

## 为什么要学习 TypeScript

1. 为大型系统而生

   ts 是静态类型化的 js 的超集，在大型工程中有无可比拟的优势。

2. 招聘市场需求

   大量的前端团队都在使用 ts 进行系统的开发。

3. 新框架几乎都在使用 ts

## 推荐课程

我觉得学习 ts 最快的方法就是跟着别人的视频先大概了解一下 ts 到底是什么，能干什么事，大概的语法了解一下，深入部分可以自己去官方文档去查看。这里我推介一下我学习 ts 用到的部分视频资料网址。

### 付费教程：

1. 后盾人网站

> 包含了装饰器等的使用，可以从多个角度了解 ts 在日常开发中的使用。
> 在这个网站中甚至有 vue3、vue-router、js 基础、php 等全方面教程。可以全方位了解开发时前后端的流程。

{% link https://www.houdunren.com%}

### 免费教程：

1. `小满zs` 的 ts 基础教程

{% link https://www.bilibili.com/video/BV1wR4y1377K/?vd_source=6e32730b05dc719c9f21598867bef69d %}

## 开发前的准备

在开始使用 ts 前要有以下的准备工作：

- nodejs > 8.0，最好是在 12 版本以上
- 包管理工具： npm、yarn 或 pnpm 其一

可以现在 typescript 官方训练场测试学习测试 ts 代码
{% link https://www.typescriptlang.org/play %}
也可以在本地安装 typescript 进行项目开发

### 安装 ts

> 推荐使用 vite 创建 ts 项目，开箱即用。

通过 npm 全局安装 ts

```shell
npm i -g typescript
```

### 创建环境

#### 手动创建

创建 ts-learn 目录用于 ts 的学习

```shell
mkdir ts-learn && cd ts-learn
```

在 ts-learn 目录下进行 node 项目初始化

```shell
npm init -y
```

进行 ts 的初始化工作

> 全局安装 ts 后会有 tsc 命令

```shell
tsc --init
```

tsc 项目初始化后，会出现 tsconfig.json 文件，可以在 tsconfig.json 中开启或关闭某些设定。

#### 使用 vite 创建

更推介这种创建方式，省去很多对 tsc 的配置，可以让我们专注在 ts 的内容中

```shell
pnpm create vite
```

选择 Vanilla , typescript 即可创建好一个 typescript 的项目。
