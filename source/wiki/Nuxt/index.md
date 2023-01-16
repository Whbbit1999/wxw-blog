---
layout: wiki
wiki: Nuxt
title: 初识Nuxt
---

官网网址
{% link https://nuxt.com desc:true %}

## 为什么会有 Nuxt

在了解为什么会出现 Nuxt 时，我们要先了解两个概念：spa 和 ssr

- spa： 单页应用，多用于客户端应用。使用 vue 或 React 开发的网站默认都是 spa。对 seo 不友好，搜索引擎收录率不好。
- ssr： 在服务端渲染，渲染完成后返回给客户端，每个页面都有独立的 URL，对 seo 友好，搜索引擎收录率良好。

对于一些应用（官网、活动页等）需要做搜索引擎优化，所以出现了服务端渲染技术。React 的服务端渲染框架中的优胜者是 Next，vue 的服务端渲染的优胜者是 Nuxt。

## 初次安装使用

我们可以使用 npx 直接使用 nuxi 初始化一个 Nuxt3 应用。

> 使用 npx 需要 npm 版本在 5.2 以上。

```shell
npx nuxi init nuxt3-learn
```

出现以下内容就是初始化成功了
![](/assets/wiki/Nuxt/nuxi初始化项目.png)

我们可以根据提示 `cd nuxt3-learn` 进入项目并使用 `pnpm i --shamefully-hoist` 安装需要的依赖。安装完成后，使用 `pnpm run dev` 来启动项目，出现下面的图片说明项目启动成功。
![](/assets/wiki/Nuxt/nuxt项目启动.png)

我们可以进入`http://localhost:3000`来访问启动的服务，可以看到 Nuxt 的欢迎页面
![](/assets/wiki/Nuxt/nuxt欢迎页.png)

## 目录结构

```txt 创建项目后的默认目录结构
|-- .nuxt/            // nuxt自动编译后的目录
|-- node_modules/     // npm 依赖包目录
|-- .gitignore        // git忽略文件
|-- app.vue           // 项目入口文件
|-- nuxt.config.ts    // nuxt项目配置文件
|-- package.json      // 项目配置文件
|-- pnpm-lock.yaml    // pnpm 依赖锁定文件
|-- README.md         // 项目说明文件
|-- tsconfig.json     // ts配置文件
```

随着开发的进展，开发时需要自己创建的文件目录

```txt 需要自己创建的目录概览
|-- pages       // 页面目录
|-- components  // 组件目录
|-- assets      // 静态资源目录
|-- public      // 静态资源目录
|-- layouts     // 布局目录
|-- composables // 在此目录下的文件会被nuxt自动引入
```

下一节我们会比较详细地讲解以上常用目录的使用方式
