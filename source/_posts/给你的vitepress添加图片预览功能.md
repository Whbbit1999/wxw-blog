---
title: 给你的vitepress添加图片预览功能
tags: ["转载", "vitepress"]
categories: []
date: 2024-01-06 17:02:26
description:
cover:
banner:
---

这次我们在 vitepress 中添加图片预览功能！
转载至：https://github.com/vuejs/vitepress/issues/854

<!-- more -->

安装 medium-zoom

```bash
npm i medium-zoom
```

在 vitepress 主题配置文件中配置

```js .vitepress/theme/index.js
// .vitepress/theme/index.js

import DefaultTheme from "vitepress/theme"
import { onMounted } from "vue"
import mediumZoom from "medium-zoom"

import "./index.css"

export default {
  ...DefaultTheme,
  setup() {
    onMounted(() => {
      mediumZoom("[data-zoomable]", { background: "var(--vp-c-bg)" })
    })
  },
}
```

添加 css 样式

```css
/* .vitepress/theme/index.css */

.medium-zoom-overlay {
  z-index: 20;
}

.medium-zoom-image {
  z-index: 21;
}
```

在 markdown 中使用

```markdown
![](path/to/file.jpg){data-zoomable}
```

如果您想在不显式添加{data-zoomable}的情况下为所有图像启用此功能，您可以将该 mediumZoom 调用更改为：

```js
mediumZoom(".main img", { background: "var(--vp-c-bg)" })
```
