---
topic: miniprogram
title: uniapp 条件编译
tags: [uniapp, 小程序]
categories: [代码人生, 前端技术]
poster:
  topic:
  headline: uniapp 条件编译
  caption:
  color: #fff
date: 2022-12-04 15:26:54
description:
cover: /assets/posts/miniprogram-cover.png
banner: /assets/posts/miniprogram-banner.png
---

## 写法

条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

写法：以 #ifdef 或 #ifndef 加 %PLATFORM% 开头，以 #endif 结尾。

#ifdef：if defined 仅在某平台存在
#ifndef：if not defined 除了某平台均存在
%PLATFORM%：平台名称

## %PLATFORM% 可取的值

| 标识                                                                          | 生效条件/平台  |
| :---------------------------------------------------------------------------- | :------------- |
| APP-PLUS                                                                      | App            |
| APP-PLUS-NVUE 或 APP-NVUE                                                     | App nvue       |
| H5                                                                            | H5             |
| MP-WEIXIN                                                                     | 微信小程序     |
| MP-ALIPAY                                                                     | 支付宝小程序   |
| MP-BAIDU                                                                      | 百度小程序     |
| MP-TOUTIAO                                                                    | 字节跳动小程序 |
| MP-LARK                                                                       | 飞书小程序     |
| MP-QQ QQ                                                                      | 小程序         |
| MP-KUAISHOU                                                                   | 快手小程序     |
| MP-JD                                                                         | 京东小程序     |
| MP-360 360                                                                    | 小程序         |
| MP 微信小程序/支付宝小程序/百度小程序/字节跳动小程序/飞书小程序/QQ 小程序/360 | 小程序         |
| QUICKAPP-WEBVIEW 快应用通用(包含联盟、华为                                    | )              |
| QUICKAPP-WEBVIEW-UNION                                                        | 快应用联盟     |
| QUICKAPP-WEBVIEW-HUAWEI                                                       | 快应用华为     |

---

## 参考文章

[跨端兼容](https://uniapp.dcloud.io/tutorial/platform.html#%E8%B7%A8%E7%AB%AF%E5%85%BC%E5%AE%B9)
