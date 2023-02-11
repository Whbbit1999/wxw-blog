---
title: 小程序分包及uniapp分包
tags: [小程序, uniapp]
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:35:30
description:
cover:
banner:
---

分包是什么？我们为什么要进行分包？

在微信小程序开发中，为了更加快速的加载，微信限制主包的大小不能超过 2M。对于一些稍大型的程序来说就要引入分包的概念了。

## uniapp 小程序分包操作

1. 找到 manifest.json 文件

在 `mp-weixin` 一项下新增

```json
"optimization": {
  "subPackages": true //是否启用分包优化
}
```

> 此段代码意思为： `启用分包优化`

2. 在文件根目录下创建一个文件夹作为分包，这里用`page_`开头来作为分包的名称。这里创建一个`page_user`作为演示
3. 在 pages.json 文件中添加配置`subPackages`，和`pages`同级

```json
{
  "pages": {
    ...
  },
  "subPackages": [{
    "root": "page_user", // 这里是分包的文件夹名称
    "pages": [{
      "path": "userinfo/userinfo",
      "style": {
        "navigationBarTitleText": "用户信息",
        "enablePullDownRefresh": false
      }
    }]
  }]
}
```

> 分包访问时的路径为`/page_user/userinfo/userinfo`

## 分包预加载

---

参考文章：
[UNIAPP----小程序分包及预加载](https://blog.csdn.net/weixin_44126737/article/details/119212633)
