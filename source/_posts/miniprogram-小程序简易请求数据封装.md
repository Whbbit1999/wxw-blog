---
topic: miniprogram
title: 小程序简易请求数据封装
tags: [小程序, uniapp]
categories: [代码人生, 前端技术]
poster:
  topic:
  headline: 小程序简易请求数据封装
  caption:
  color: #fff
date: 2022-12-04 15:29:02
description:
cover: /assets/posts/miniprogram-cover.png
banner: /assets/posts/miniprogram-banner.png
---

## uniapp 请求封装

```js
// 从配置文件中引入配置好的默认路径
import config from "./config.js"

class Request {
  constructor() {}
  /**
   * BASEURL  -> 请求路径（公用）
   * method -> 请求方式
   * url -> 请求路径
   * data -> 请求数据
   * header -> 请求头
   * responseType -> 返回数据类型
   */
  request({
    BASEURL = config.BASEURL,
    method = "POST",
    url,
    data,
    header = { "Content-Type": "application/json" },
    responseType = "text",
  }) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${BASEURL}/${url}`,
        method,
        data,
        header,
        responseType,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  }
}

const http = new Request()
export { http }
```
