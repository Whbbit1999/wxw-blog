---
title: 为您的stellar添加medium-zoom
tags: []
categories: []
poster:
  # topic: 标题上方的小字
  headline: ""
  # caption: 标题下方的小字
  # color: 标题颜色
references:
  - "[medium-zoom](https://github.com/francoischalifour/medium-zoom)"
date: 2024-01-14 14:41:05
description:
cover: /assets/posts/medium-zoom.png
banner:
---

<!-- 为您的文档添加图片预览功能而不适用 Stellar 提供的`{%image src%}`组件 -->

<!-- more -->

## Stellar 提供的图片组件是很强大的，为什么我不使用呢？

有时候我需要将 markdown 文件在各平台中都发布一次，使用 Stellar 自定义的图片组件其他平台不识别。发布时还得手动改

## 为什么要添加这个插件呢？

Stellar 提供的图片预览真的很不错，但是为了与其他平台进行兼容，不得不使用原生的 markdown 使用方式。我又想使用图片预览，就添加了这个插件

## 效果示例：

> 点击下面的图片查看效果

![暗色主题](/assets/wiki/vscode/110247187-f1eb6780-7fa5-11eb-9258-620309e20961.png)

## 插件添加

直接创建一个 zoom-img.js 文件，写入以下内容

```js
"use strict"

// inject font
hexo.extend.injector.register("head_end", () => {
  return `
    <style>
    .medium-zoom-overlay {
      z-index: 20;
    }
    .medium-zoom-image {
      z-index: 21;
    }
    </style>
    <link href="https://cdn.jsdelivr.net/npm/medium-zoom@1.1.0/dist/style.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/medium-zoom@1.1.0/dist/medium-zoom.min.js"></script>
  `
})
hexo.extend.injector.register("body_end", function () {
  return `
  <script>
    mediumZoom(".l_body img", { background: "var(--site-bg)" })
  </script>
  `
})
```

## 使用：

按照正常 markdown 图片书写方式

```markdown
![暗色主题](/assets/wiki/vscode/110247187-f1eb6780-7fa5-11eb-9258-620309e20961.png)
```
