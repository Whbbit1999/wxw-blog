---
title: nrm切换npm版本
tags: [nrm]
categories: [nrm]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:52:28
description:
cover:
banner:
---

如何快速切换 npm 镜像呢？可以试试这个

<!-- more -->

nrm 可以快速的帮我们在不同的镜像中切换。

## 安装

npm

```shell
npm i -g nrm
```

yarn

```shell
yarn global add nrm
```

## 命令

### 查看镜像列表

```shell
nrm ls
```

结果如下：

```
  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
* taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
```

### 选择镜像

> 使用淘宝镜像

```shell
nrm use taobao
```

### 查看当前源

```shell
nrm current
```

结果如下：

```
SUCCESS  The registry has been changed to 'taobao'.
```

### 测试速度

```shell
nrm test
```

结果如下：

```
  npm ---------- 1013 ms
  yarn --------- 1437 ms
  tencent ------ 101 ms
  cnpm --------- 1364 ms
* taobao ------- 215 ms
  npmMirror ---- 1865 ms
```

## 常见问题

mac m1 芯片可能会修改失败，可以执行以下命令解决

```shell
npm uninstall -g nrm
npm i -g @adams549659584/nrm
```
