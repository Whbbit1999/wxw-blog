---
topic: miniprogram
title: uniapp 接入微信客服
tags: [小程序, uniapp]
categories: [代码人生, 前端技术]
poster:
  topic:
  headline: uniapp 接入微信客服
  caption:
  color: #fff
date: 2022-12-04 15:28:06
description:
cover: /assets/posts/miniprogram-cover.png
banner: /assets/posts/miniprogram-banner.png
---

{%note color:red 注意
必须有用户点击事件
%}

用户点击按钮后（必须有点击），打开微信客服。

## 示例代码

```js
wx.openCustomerServiceChat({
  extInfo: { url: "" },
  corpId: "",
  success(res) {},
  fail(error) {},
})
```

---

参考文章：
[小程序中接入微信客服](https://work.weixin.qq.com/nl/act/p/a733314375294bdd)
