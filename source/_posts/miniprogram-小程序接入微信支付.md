---
topic: miniprogram
title: 小程序接入微信支付
tags: [uniapp, 小程序, 支付]
categories: [代码人生, 前端技术]
poster:
  topic:
  headline: 小程序接入微信支付
  caption:
  color: #fff
date: 2022-12-04 15:32:02
description:
cover: /assets/posts/miniprogram-cover.png
banner: /assets/posts/miniprogram-banner.png
---

```js
// 这里的数据是后端返回的订单数据
const wechatOrder = {
  orderInfo: {
    appid: "wx1e**********689f",
    noncestr: "2rxK********Gv3A",
    package: "Sign=WXPay",
    partnerid: "16****039",
    prepayid: "wx13************c615acf50000",
    timestamp: "1663061271",
    sign: "3513ECA3B3AC1AD6F7D8BA748970D51D2236589734518F086AB99673AAE844FE",
  },
}
```

## 依赖加密包

```shell
npm i crypto-js
```

## 小程序支付时的二次签名

```js
import crypto from "crypto-js/crypto-js"
const timeStamp = Math.floor(new Date().getTime() / 1000)
const key = "53E12F838************5A43C5DC3"
// 二次签名
const sign = `appId=${appid}&nonceStr=${wechatOrder.orderInfo.nonce_str}&package=prepay_id=${wechatOrder.orderInfo.prepay_id}&signType=HMAC-SHA256&timeStamp=${timeStamp}&key=${key}`

wx.requestPayment({
  timeStamp: timeStamp + "", // 时间戳（单位：秒）
  nonceStr: wechatOrder.orderInfo.nonce_str, // 随机字符串
  package: `prepay_id=${wechatOrder.orderInfo.prepay_id}`, // 固定值
  signType: "HMAC-SHA256", //固定值
  paySign: crypto.enc.Hex.stringify(crypto.HmacSHA256(sign, key)).toUpperCase(),
  success: function (res) {
    console.log("success:" + JSON.stringify(res))
    console.log("支付成功")
    showToast({
      title: "支付成功",
    })
  },
  fail: function (err) {
    console.log("fail:" + JSON.stringify(err))
    console.log("支付失败")
    showErrorMsgModal({
      content: err,
    })
  },
})
```

## app 支付时的二次签名

```js
const partnerid = "160*****39"
const key = "53E12F838************5A43C5DC3"
// 报错支付场景不合法
const appid = wechatOrder.orderInfo.appid
const timeStamp = Math.floor(new Date().getTime() / 1000) + ""
const sign = `appid=${appid}&noncestr=${wechatOrder.orderInfo.nonce_str}&package=Sign=WXPay&partnerid=${partnerid}&prepayid=${wechatOrder.orderInfo.prepay_id}&timestamp=${timeStamp}&key=${key}`

const orderInfo = {
  appid: appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
  noncestr: wechatOrder.orderInfo.nonce_str, // 随机字符串
  package: "Sign=WXPay", // 固定值
  partnerid: partnerid, // 微信支付商户号
  prepayid: wechatOrder.orderInfo.prepay_id, // 统一下单订单号
  timestamp: timeStamp, // 时间戳（单位：秒）
  sign: crypto.enc.Hex.stringify(crypto.HmacSHA256(sign, key)), // 签名，这里用的 MD5/RSA 签名
}
uni.requestPayment({
  provider: "wxpay",
  orderInfo: orderInfo,
  success: (res) => {
    console.log("调用微信支付", res)
  },
  fail: (err) => {
    console.log("调用支付失败", err)
  },
  complete(complete) {
    console.log("complete", complete)
  },
})
```
