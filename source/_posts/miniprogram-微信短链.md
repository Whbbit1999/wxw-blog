---
topic: miniprogram
title: 微信短链 URL Link
tags: [微信接口]
categories: [代码人生, 前端技术]
poster:
  topic: " "
  headline: 微信短链 URL Link
  caption:
  color: #fff
date: 2022-12-04 15:35:50
description:
cover: /assets/posts/微信短链.png
banner: /assets/posts/miniprogram-banner.png
---

我们可以使用微信提供的接口来生成一个短链，可以在微信外直接跳转至指定小程序界面

1. 获取 token

> 这个接口会返回一个 token

| 接口       | 请求方式 | 接口地址                                                                                         |
| ---------- | -------- | ------------------------------------------------------------------------------------------------ |
| 获取 token | GET      | `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=appid&secret=secret` |

2. 生成短链

> 此接口返回一个微信的短链

| 接口       | 请求方式 | 接口地址                                                            |
| ---------- | -------- | ------------------------------------------------------------------- |
| 获取 token | POST     | `https://api.weixin.qq.com/wxa/generate_urllink?access_token=token` |

{%note 注意
此处的 token 必须在拼接至路径中
%}

传参须使用 json 格式，在 body 中传参

```json
{
  "path": "/pages/index/index",
  "query": "name=wxw",
  "expire_type": 1,
  "expire_interval": 1,
  "env_version": "trial"
}
```

---

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/url-link/generateUrlLink.html)
