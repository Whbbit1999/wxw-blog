---

topic: miniprogram
title: 扫码获取微信抬头
tags: [uniapp, server, 公众号, 小程序]
categories: [代码人生, 前端技术]
poster:
  topic:
  headline: 扫码获取微信抬头
  caption:
  color: #fff
date: 2022-12-04 15:29:48
description:
cover: /assets/posts/miniprogram-cover.png
banner: /assets/posts/miniprogram-banner.png
---

[官方文档地址](https://developers.weixin.qq.com/doc/offiaccount/WeChat_Invoice/Quick_issuing/Interface_Instructions.html)

## 实现步骤

1. 前端扫码微信抬头，获取到返回的 result（链接）
2. 后端实现解析链接内容接口，在后端部分调用公众号接口解析链接内容

### 前端部分处理

```js
<script setup>
import { ref } from 'vue';
const result = ref('');
const sancode = () => {
  uni.scanCode({
    success(res) {
      result.value = res.result;
      console.log(result.value);
      uni.request({
        url: 'http://localhost:3020/api/getInvoiceTitle',
        method: 'POST',
        data: { link: result.value },
        success(invoiceTitle) {
          console.log(invoiceTitle);
        },
        fail(e) {
          console.log(e);
        }
      });
    },
    fail(e) {
      console.log('e: ', e);
    }
  });
};
</script>

<template>
  <view class="content"><button @click="sancode">获取扫码结果</button></view>
</template>

<style lang="scss"></style>
```

### 后端部分的处理

> 这里的 APPID 和 SECRET 需要在公众号中获取

```js
import axios from "axios"
import Fastify from "fastify"

import { APPID, SECRET } from "./config"

const fastify = Fastify({ logger: true })

fastify.post("/api/getInvoiceTitle", async (req, res) => {
  const { link } = req.body
  const access_token = await getAccessToken()
  const data = await getInvoiceTitle(link, access_token)
  return { data }
})

async function getAccessToken() {
  const res = await axios.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`
  )
  const { access_token } = res.data
  return access_token
}
async function getInvoiceTitle(link, access_token) {
  const res = await axios.post(`https://api.weixin.qq.com/card/invoice/scantitle?access_token=${access_token}`, {
    scan_text: link,
  })
  const { data } = res
  return data
}

fastify.listen({ port: 3020 }, (err, address) => {
  console.log("http://localhost:3020")
})
```
