---
title: 使用GitHubActions部署
tags: [hexo, GitHubActions]
categories: [代码人生, CI/CD]
date: 2022-12-05 16:25:27
cover:
banner:
---

使用阿里云服务器搭建 hexo 博客

<!-- more -->

## GitHub Actions

GitHub Actions 是 GitHub 的持续集成服务，我们可以使用它做网站的自动部署等工作。可以点击下面的链接查看示例。
{% link https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html desc:true %}

我们这里只做应用。

## GitHub 变量

### 添加

可以到 GitHub 仓库的 settings -> Secrets -> Actions 中新增变量
{% folding 具体步骤如下 codeblock:false open:false color:green %}
![](https://whbbit-blog.oss-cn-beijing.aliyuncs.com/202212051727588.png)
![](https://whbbit-blog.oss-cn-beijing.aliyuncs.com/202212051727587.png)
![](https://whbbit-blog.oss-cn-beijing.aliyuncs.com/202212051727586.png)
![](https://whbbit-blog.oss-cn-beijing.aliyuncs.com/202212051727580.png)
{% endfolding %}

### 如何使用

在配置文件 `.github/workflows/main.yml` 中可以使用 `${{secrets.变量名}}` 的方式使用

```yml .github/workflows/main.yml
- name: copy dist file with scp
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.WXW_HOST }}
          username: ${{ secrets.WXW_USERNAME }}
          password: ${{ secrets.WXW_PASSWORD }}
          port: 22
          source: "public/"
          target: ${{ secrets.WXW_TARGET }}
```

> 这里的`WXW_HOST`是服务器公网 ip，`WXW_USERNAME` 是服务器用户名， `WXW_PASSWORD` 是服务器用户密码， `WXW_TARGET`是要复制文件到那个文件中。  
> **我们会在下面的配置中使用这几个变量**

## 最终代码

```yml .github/workflows/main.yml
name: deplay-hexo-blog
on:
  push:
    branches: [master]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # 安装nodejs
      - name: install nodejs
        uses: actions/setup-node@v3.4.1
        with:
          node-version: "16.x"
      # 安装依赖
      - name: install packages
        run: npm install
      # 打包项目
      - name: build
        run: npm run build
      # 文件复制到服务器
      - name: copy dist file with scp
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.WXW_HOST }}
          username: ${{ secrets.WXW_USERNAME }}
          password: ${{ secrets.WXW_PASSWORD }}
          port: 22
          source: "public/"
          target: ${{ secrets.WXW_TARGET }}
```

### 代码详解：

这段代码表示在 master 分支提交时会触发该 actions

```yml
on:
  push:
    branches: [master]
  workflow_dispatch:
```

这一段为使用 ubuntu-latest 虚拟机执行，安装 nodejs -> 安装依赖 -> 项目打包 -> 将文件复制到服务器指定位置

name 为 `copy dist file with scp` 这一段会把生成好的 `public` 文件复制到服务器指定位置 `${{secrets.WXW_TARGET}}` 下

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # 安装nodejs
      - name: install nodejs
        uses: actions/setup-node@v3.4.1
        with:
          node-version: "16.x"
      # 安装依赖
      - name: install packages
        run: npm install
      # 打包项目
      - name: build
        run: npm run build
      # 文件复制到服务器
      - name: copy dist file with scp
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.WXW_HOST }}
          username: ${{ secrets.WXW_USERNAME }}
          password: ${{ secrets.WXW_PASSWORD }}
          port: 22
          source: "public/"
          target: ${{ secrets.WXW_TARGET }}
```

## 服务器配置 nginx

我这里使用`www.whbbit.cn`这个域名

```nginx
server {
    listen 80;
    server_name www.whbbit.cn;
    location / {
      root /code/public;
      index index.html;
      try_files $uri $uri/ = 404;
    }
}
```

配置好后，运行`nginx -s reload`重启一下 nginx 服务器，我们就可以使用`www.whbbit.cn`来访问我们部署好的网站了。
