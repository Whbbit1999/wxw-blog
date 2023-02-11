---
title: oss搭建个人图床
tags: [阿里云, oss]
categories: [代码人生, 其他, Linux/运维]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:44:28
description:
cover:
banner:
---

oss 的简单应用

<!-- more -->

> 在写 markdown 文档的时候，经常会想要插入一些图片来让文章变的尽可能的图文并茂，但是如果是托管到 GitHub 上的话，图片又不是太好处理，所以就有了今天的这篇文章。

## 搭建自己的图床的好处

再网上你可以搜索到许许多多的图床供你来使用，但是这些经常会因为各种各样的原因被封。如果你使用网上的图床，有可能会使你的博客的文章在一夜之间所有的图片显示不出来。这时你就会感到自己搭建图床的好处了。  
有的人可能会想，免费的图床它不香吗，被封了我再将图片传到另一个不就行了吗？  
但是你想过没有，有时你急需要图床的时候，又不是很好找到，还有自己的图片在本地不小心被删掉的状况。搭建一个自己的图床来保存图片，可以随时随地的使用自己的链接，不是很好吗？

## 搭建的方法（这里用阿里云 OSS）

### 一、开通阿里云 OSS 服务

首先在阿里云上购买 OSS 服务，地址 https://www.aliyun.com/product/oss
点击折扣套餐
![](https://img-blog.csdnimg.cn/img_convert/85bc003f4f1dcce2b1ff498ec050af4d.png)
跳转后，选择最低配置，选择支付
![](https://img-blog.csdnimg.cn/img_convert/c16213efc85c9ed83bfe4082b4da7f0a.png)

### 在管理控制台新建 Bucket

Bucket 名称按要求填好即可，下面的读写权限选择成为`公共读`
![](https://img-blog.csdnimg.cn/img_convert/d9f7035d466687feca5849ab67d0604a.png)
创建成功后，就先可告一段落

### 图片的上传

这里推荐使用**PicGo**，它是 GitHub 上的开源项目，可以快速的将本地图片上传到图床，可以去https://github.com/Molunerfinn/PicGo 下载 PicGo（文档都是中文，安装过程应该不用赘述）
下载安装好后，是这个样子的 ↓
![PicGo](https://img-blog.csdnimg.cn/img_convert/c8faebf2c042feaa2236de292d5f2f4c.png)

### PicGo 配置图床

点击图床设置，找到并点击阿里云 OSS

![](https://img-blog.csdnimg.cn/img_convert/fac6a985d5c953cf1a0c2d66805f5202.png)

- 这里的 accesskey 和 accesskeySecret 可以从阿里云控制台获取（鼠标移至阿里云你的头像上，可以发现 Accesskey 管理）
- 存储空间和你刚才创建 Bucket 时使用同一个，可以从阿里云 OSS 控制台上复制，以免手贱打错字
- 存储区域在阿里云 OSS 控制台去找，如下图所示
  ![](https://img-blog.csdnimg.cn/img_convert/af5ddb7ff3fda0cd12c9f65a5895ca92.png)
- 可以先填写有星号的，其他默认即可

### 使用

配置完成后，就可以再截图后，点击剪贴板图片上传直接将刚截到的图片上传至图床；或者可以将本地的图片拖到虚线框内即可。
如果你和我一样是在 markdown 中使用，就选择西方的 markdown 即可。

> 至此，图床就可以使用了。在 PicGo 中，点击相册，看到图片下面有 3 个按钮，点击第一个就是复制链接。复制后，将其直接粘贴到你的 markdown 文章中即可使用。**本文中所使用的所有图片都是来源于此**

## 注意事项

将自己阿里云上的 accesskey 保存好，不要轻易的告诉别人。信息安全问题，有可能就是一个疏忽造成的。
