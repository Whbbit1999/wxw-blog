---
title: showToast 在真机会闪退的问题及解决方案
tags: [小程序, uniapp]
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:33:29
description:
cover:
banner:
---

当你在 uni-app 中使用 showLoading 进行加载状态的实现，然后数据返回后进行其他文字提示。你可能会遇到以下问题：

- 在微信开发者工具中是完美的，但是到实际手机上运行（预览版/正式发布）会出现 loading 加载完成后，后面的提示问题一闪而过。

导致这个问题的原因是，在小程序底层 showLoading 和 showToast 其实都是 showToast 来实现的。在实机运行时，运行的顺序是 `showLoading -> showToast -> hideLoading`。而我们想要的效果是`showLoading -> hideLoading -> showToast`

如何解决这个问题呢？在 uniapp 中，我们可以使用 showToast 来实现 loading 的效果

```js
uni.showToast({
  icon: "loading",
  duration: 300000,
  mask: true,
});
```

这里的 icon 为 loading 是，就和 showLoading 现实的状态是一致的。这里的延时`duration`我们尽可能的设置长一些，尽量达到接口超时时间，这样，就不必担心数据还未返回，loading 状态就消失不见了。下面是一个简单的示例：

```js
async function getUserList() {
  try {
    uni.showToast({
      icon: "loading",
      duration: 300000,
      mask: true,
    });
    const { code, data, message } = await getUserListApi();
    uni.hideToast();

    uni.showToast({
      icon: "none",
      title: message,
    });
  } catch (error) {
    hideToast();
  } finally {
  }
}
```
