---
title: app打包上线要注意的部分
tags: [app, uniapp]
categories: [app]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:17:52
description:
cover:
banner:
references:
  - title: "华为 APP 常见个人信息保护问题 FAQ"
    url: "https://developer.huawei.com/consumer/cn/doc/distribution/app/FAQ-faq#h2-1628486431553-2"
  - title: "隐私政策参考（CSDN 隐私政策）"
    url: "https://marketing.csdn.net/p/016dc84c68432f7ced83bd6d0bc43d1d?external=true"
  - title: uniapp Android 平台各功能模块隐私合规协议
    url: https://ask.dcloud.net.cn/article/39484
  - title: uni-AD App 端打包注意及 plus.ad 使用指南
    url: https://ask.dcloud.net.cn/article/36718
  - title: uniapp 国内应用市场上架
    url: https://uniapp.dcloud.net.cn/tutorial/store.html#
  - title: uniapp 示例项目
    url: https://uniapp.dcloud.net.cn/case.html#%E5%AE%98%E6%96%B9%E7%A4%BA%E4%BE%8B
---

## 隐私政策部分

在国内 app 上架应用商店必须要做此操作，大概流程如下：

1. 找到 manifest.json 文件 -> 选择 App 启动界面配置 -> 勾选 `使用原生隐私政策提示框`

2. 勾选后会在项目中自动添加 androidPrivacy.json 文件，可以双击打开自定义配置

```json
{
  "version": "1",
  "prompt": "template",
  "title": "服务协议和隐私政策",
  "message": "　　请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了更好的向你提供服务，我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。<br/>　　你可阅读<a href=\"https://fp.newtimeai.com/khsyxy.html\">《服务协议》</a>和<a href=\"http://cs.newtimeai.com:8889/uni-yszc.html\">《隐私政策》</a>了解详细信息。如果你同意，请点击下面按钮开始接受我们的服务。",
  "buttonAccept": "同意并接受",
  "buttonRefuse": "暂不同意",
  "hrefLoader": "system|default",
  "second": {
    "title": "确认提示",
    "message": "　　进入应用前，你需先同意<a href=\"https://fp.newtimeai.com/khsyxy.html\">《服务协议》</a>和<a href=\"http://cs.newtimeai.com:8889/uni-yszc.html\">《隐私政策》</a>，否则将退出应用。",
    "buttonAccept": "同意并继续",
    "buttonRefuse": "退出应用"
  }
}
```

{%note uniapp对隐私政策的说明
详细内容请查看[uniapp 对隐私政策的说明](https://uniapp.dcloud.net.cn/tutorial/app-privacy-android.html#)
%}

## android 应用隐私管理

在应用商城上架时，在应用内必须要有用户可以关闭某些权限的功能。

关于权限判断和提示，官方推介使用[App 权限判断和提示](https://ext.dcloud.net.cn/plugin?id=594)插件。

下面的三个链接，就是 uniapp 对于这部分的 api 及说明

- [https://uniapp.dcloud.net.cn/api/system/getappauthorizesetting.html#getappauthorizesetting](https://uniapp.dcloud.net.cn/api/system/getappauthorizesetting.html#getappauthorizesetting)

- [https://uniapp.dcloud.net.cn/api/system/getsystemsetting.html](https://uniapp.dcloud.net.cn/api/system/getsystemsetting.html)

- [https://uniapp.dcloud.net.cn/api/system/openappauthorizesetting.html](https://uniapp.dcloud.net.cn/api/system/openappauthorizesetting.html)

### 隐私政策参考

- [华为 APP 常见个人信息保护问题 FAQ](https://developer.huawei.com/consumer/cn/doc/distribution/app/FAQ-faq#h2-1628486431553-2)

- [隐私政策参考（CSDN 隐私政策）](https://marketing.csdn.net/p/016dc84c68432f7ced83bd6d0bc43d1d?external=true)

- [uniapp Android 平台各功能模块隐私合规协议](https://ask.dcloud.net.cn/article/39484)

- [uni-AD App 端打包注意及 plus.ad 使用指南](https://ask.dcloud.net.cn/article/36718)

- [uniapp 国内应用市场上架](https://uniapp.dcloud.net.cn/tutorial/store.html#)

- [uniapp 示例项目](https://uniapp.dcloud.net.cn/case.html#%E5%AE%98%E6%96%B9%E7%A4%BA%E4%BE%8B)

## ios 分享

## 签名问题

- 包名签名自查：https://docs.qq.com/doc/DRHJjS0RHRGFHdnly
- 微信开放平台：https://developers.weixin.qq.com/doc/oplatform/Downloads/Android_Resource.html
