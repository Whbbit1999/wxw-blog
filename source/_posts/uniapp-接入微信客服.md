---
title: uniapp 接入微信客服
tags: [小程序, uniapp]
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:28:06
description:
cover:
banner:
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
});
```

---

参考文章：
[小程序中接入微信客服](https://work.weixin.qq.com/nl/act/p/a733314375294bdd)
