---
title: uniapp常见问题(一)
tags: [uniapp, 小程序]
categories: [小程序]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:25:34
description:
cover:
banner:
---

## 使用 pinia 后报错

解决方式：实例化 store 时需要放置于 composable 函数内

```js
import { useLoginStore } from "@/store/login";
const { loginStore } = useLoginStore();
function useIsLogin() {
  function isLogin() {
    xxx; //逻辑代码
  }
  return { isLogin };
}
```

上面的写法打成 app 包时会导致页面白屏。更改成下面的写法就解决了

```js
import { useLoginStore } from "@/store/login";
function useIsLogin() {
  function isLogin() {
    const { loginStore } = useLoginStore();
    xxx; //逻辑代码
  }
  return { isLogin };
}
```

## 使用组件默认插槽

```html
<MyComponents>
  <template #default>content...</template>
</MyComponents>

<!-- or -->
<MyComponents> content... </MyComponents>
```

## 打包为 app 后调用微信客服

```js
uni.share({
  provider: "weixin",
  openCustomerServiceChat: true,
  corpid: WX_CORP_ID, // 客服ID
  customerUrl: WX_SERVICE_CHAT_URL, // 客服的页面路径
});
```

> 可能会遇到调用微信客服报错 (bad_param)的问题，需要在微信开放平台中创建一个移动应用。并在 hbuilderx 中配置微信分享的 appid（开放平台中移动应用的 appid）

## 打包时需注意

1. 使用电脑模拟器进行测试时需要勾选对 x86 的支持，否则有些模拟器会打不开
2. 正式打包时需要去除对 x86 CPU 的支持（勾选 x86 后云打包只能打包为 32 位的包，有些平台上传失败

## 小程序路径跳转时出现的问题

跳转时携带的参数中含有`&`字符串，会导致在跳转后的界面中使用解构获取参数时不完整。

### 解决方式

1. 可以在跳转前将不需要截取的参数中使用其他字符将 `&` 符替换，在跳转后的界面中重新替换回来
2. 可以使用 `sotrage` 存储数据，在跳转页面中获取 `storage` 中的值

## 小程序请求本地接口报错不在以下 request 合法域名列表中

解决方法: 在微信开发者工具中 `详情 -> 本地设置` 把 `不校验本地合法域名` 一项勾选

## uniapp 中使用 official-account 组件时 bindload 属性和 binderror 属性不会执行

{%note 解决方法
将其改为 load 和 error 即可
%}

uniapp 中的写法

```html
<official-account
  @error="officalAccountError"
  @load="officalAccountErrorLoad"
/>
```
