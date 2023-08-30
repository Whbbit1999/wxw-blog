---
layout: wiki
wiki: 技术视频逐字稿
title: Stellar主题搭建个人站点
order: 20
---

{% ablock 参考文章 %}

- hexo 官网 https://hexo.io/zh-cn/
- node 官网 https://nodejs.org/zh-cn
- git 官网 https://git-scm.com/download/win
- Stellar 主题主题文档 https://xaoxuu.com/wiki/stellar/
- 彩虹猫图标 https://slackmojis.com/categories/25-blob-cats-emojis

{% endablock %}

## 前置知识

### markdown 基础

可以参考[markdown 基础](https://www.whbbit.cn/2023/08/30/markdown%E5%9F%BA%E7%A1%80/)进行观看。

这一节我们进行了 markdown 基础语法的学习，下一节我们就开始安装依赖搭建

## 搭建站点

### 依赖安装

1. 安装 nodejs
   访问 [nodejs 官网](https://nodejs.org/zh-cn) 进行对应系统的下载。

   > 下载 LTS/长期维护版 版本即可

   安装成功后可以在终端中使用`node --version` 和 `npm --version` 查看是否下载成功

2. 安装 git
   window 用户可以访问[git 官网](https://git-scm.com/download/win) 进行安装
   mac 用户可以使用 homebrew 进行安装 `brew install git`

3. 安装 hexo-cli
   安装 nodejs 后可以使用 npm 指令进行安装。
   > 全局安装即可，可以省去配置环境变量的过程，对新手更加友好
   ```bash
   npm i -g hexo-cli
   ```

到这一步，我们的环境已经搭建成功，下一节我们开始开始搭建个人站点

### 项目搭建

上一节我们把所有依赖的环境都安装成功了，这一节我们开始使用 hexo 搭建个人站点

这节视频中，我们使用 my-site 作为我们的站点目录进行演示：

#### 初始化项目

```bash
hexo init my-site
```

#### 启动项目

> 我们可以使用 npm 指令进行项目启动，也可以使用 hexo 进行启动。npm 指令可以在 package.json 文件中 scripts 中查看。这里我们使用 npm 指令启动项目。

```bash
npm run server
```

### 主题安装

这里我们可以访问 [Stellar 主题主题文档](https://xaoxuu.com/wiki/stellar/)进行查看详细说明。或者跟着我的步骤操作

1. 安装主题

   ```bash
   npm i hexo-theme-stellar
   ```

2. 更改主题
   在`_config.yml`中找到并修改
   ```yml
   theme: stellar
   ```

我们再次启动项目，可以发现已经是 Stellar 的样子了。下一节我们进行站点配置，来个性化的定制各种页面。

## 站点配置

### 配置文件一览

Stellar 主题的配置文件我们可以去`node_modules`里查看。我们找到`hexo-theme-stellar/_config.yml`文件。这里就是 Stellar 主题支持的所有配置了。

{% folding child:codeblock open:false Stellar主题配置 %}

````yml
######## Stellar info ########
stellar:
  version: "1.19.0"
  homepage: "https://xaoxuu.com/wiki/stellar/"
  repo: "https://github.com/xaoxuu/hexo-theme-stellar"
  cdn_css: # Use cdn links instead of /css/main.css
  cdn_js: # Use cdn links instead of /js/main.js

######## head tags ########
open_graph:
  enable: true
  twitter_id: # for open_graph meta

######## Sidebar ########
sidebar:
  logo:
    avatar: "[config.avatar](/about/)" # you can set avatar link in _config.yml or '[https://xxx.png](/about/)'
    title: "[config.title](/)" # you can set html tag like: '[<img no-lazy height="32px" src="xxx"/>](/)'
  menu:
    # post: '[btn.blog](/)'
    # wiki: '[btn.wiki](/wiki/)'
    # friends: '[友链](/friends/)'
    # about: '[关于](/about/)'
  # Sidebar widgets
  widgets:
    #### 自动生成的页面 ####
    # 主页
    home: search, recent, timeline # for home
    # 博客索引页
    blog_index: search_blog, recent, timeline # for categories/tags/archives
    # 文档索引页
    wiki_index: search_docs, recent, timeline # for wiki
    # 其它（404）
    others: search, recent, timeline # for 404 and ...
    #### 手动创建的页面 ####
    # 文章内页
    post: search_blog, toc, ghrepo, ghissues # for pages using 'layout:post'
    # 文档内页
    wiki: search, ghrepo, toc, ghissues, related # for pages using 'layout:wiki'
    # 其它 layout:page 的页面
    page: toc, search # for custom pages using 'layout:page'

######## Index ########
post-index:# 近期发布 分类 标签 归档 and ...
  # '朋友文章': /friends/rss/

######## Main ########
breadcrumb:
  home: home # config.title / config.author / home or custom content

######## Article ########
article:
  # 如果没有指定封面，是否根据 tags 作为关键词搜索封面图片？
  auto_cover: false # search from https://source.unsplash.com/
  # 如果没有指定横幅，是否根据 tags 作为关键词搜索横幅图片？
  auto_banner: false # search from https://source.unsplash.com/
  # 如果没有指定 excerpt 和 description，将自动取多长的内容作为文章摘要？
  auto_excerpt: 200
  # 分类颜色
  category_color:
    "探索号": "#f44336"
  # 文章许可协议
  license: "本文采用 [署名-非商业性使用-相同方式共享 4.0 国际](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议，转载请注明出处。"
  # 分享
  share: # [wechat, weibo, email, link]
  # 相关文章，需要安装插件 (for layout: post)
  # npm i hexo-related-popular-posts
  related_posts:
    enable: false
    max_count: 5

search:
  service: local_search # local_search, todo...
  local_search: # 在 front-matter 中设置 indexing:false 来避免被搜索索引
    field: all # post, page, all
    path: /search.json # 搜索文件存放位置
    content: true # 是否搜索内容

######## Comments ########
comments:
  service: # beaudar, utterances, giscus, twikoo, waline, artalk
  # beaudar
  # https://beaudar.lipk.org/
  beaudar:
    repo: xxx/xxx
    issue-term: pathname
    issue-number:
    theme: preferred-color-scheme
    label:
    input-position: top # top/bottom 评论框位置
    comment-order: desc # desc 排序
    keep-theme: # true/false
    loading: false
    branch: main
  # utterances
  # https://utteranc.es/
  utterances:
    repo: xxx/xxx
    issue-term: pathname
    issue-number:
    theme: preferred-color-scheme
    label:
  # giscus
  # https://giscus.app/zh-CN
  giscus:
    data-repo: xxx/xxx # [在此输入仓库]
    data-repo-id: # [在此输入仓库 ID]
    data-category: # [在此输入分类名]
    data-category-id:
    data-mapping: pathname
    data-strict: 0
    data-reactions-enabled: 1
    data-emit-metadata: 0
    data-input-position: top # top, bottom
    data-theme: preferred_color_scheme
    data-lang: zh-CN
    data-loading: lazy
    crossorigin: anonymous

  # Twikoo
  # https://twikoo.js.org/
  twikoo:
    js: https://gcore.jsdelivr.net/npm/twikoo@1.6.8/dist/twikoo.all.min.js # 建议锁定版本
    envId: https://xxx # vercel函数

  # Waline
  # https://waline.js.org/
  waline:
    js: https://unpkg.com/@waline/client@2.14.1/dist/waline.js
    css: https://unpkg.com/@waline/client@2.14.1/dist/waline.css
    # Waline server address url, you should set this to your own link
    serverURL:
    # If false, comment count will only be displayed in post page, not in home page
    commentCount: true
    # Pageviews count, Note: You should not enable both `waline.pageview` and `leancloud_visitors`.
    pageview: false
    # Custom emoji
    # emoji:
    #   - https://unpkg.com/@waline/emojis@1.1.0/weibo
    #   - https://unpkg.com/@waline/emojis@1.1.0/alus
    #   - https://unpkg.com/@waline/emojis@1.1.0/bilibili
    #   - https://unpkg.com/@waline/emojis@1.1.0/qq
    #   - https://unpkg.com/@waline/emojis@1.1.0/tieba
    #   - https://unpkg.com/@waline/emojis@1.1.0/tw-emoji
    #   - https://unpkg.com/@waline/emojis@1.1.0/bmoji
    # 设置自己的图床服务，替换默认的 Base 64 编码嵌入（有体积大小限制），在评论中上传图片更加方便
    # imageUploader:
    # 适配了兰空图床V1、V2版本
    # 以兰空图床V1为例，下列填写内容为：
    # fileName: file
    # tokenName: Authorization
    # api: https://xxxxxx/api/v1/upload
    # token: Bearer xxxxxxxxxxxxxx
    # resp: data.links.url
    # 以兰空图床V2为例，下列填写内容为：
    # fileName: image
    # tokenName: token
    # api: https://xxxxxx/api/upload
    # token: xxxxxxxxxxxxxx
    # resp: data.url
    #   fileName: # 根据版本二选一
    #   tokenName: # 根据版本二选一
    #   api: # 图床 api 地址
    #   token: # 图床验证
    #   resp: # 图片地址返回值的字段

  # Artalk
  # https://artalk.js.org/
  artalk:
    css: https://unpkg.com/artalk@2.4.3/dist/Artalk.css
    js: https://unpkg.com/artalk@2.4.3/dist/Artalk.js
    server: # 后端服务地址
    placeholder: ""
    darkMode: auto

######## Footer ########
footer:
  social:
    # github:
    #   icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.4/social/08a41b181ce68.svg"/>'
    #   url: /
    # music:
    #   icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.4/social/3845874.svg"/>'
    #   url: /
    # unsplash:
    #   icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.4/social/3616429.svg"/>'
    #   url: /
    # comments:
    #   icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.4/social/942ebbf1a4b91.svg"/>'
    #   url: /about/#comments
  sitemap:
    # '博客':
    #   - '[近期](/)'
    #   - '[分类](/)'
    #   - '[标签](/)'
    #   - '[归档](/)'
    # '项目':
    #   - '[开源库](/)'
    # '社交':
    #   - '[友链](/)'
    #   - '[留言板](/)'
    # '更多':
    #   - '[关于本站](/)'
    #   - '[GitHub](/)'
  content: | # 支持 Markdown 格式
    本站由 [@anonymity](/) 使用 [Stellar](https://github.com/xaoxuu/hexo-theme-stellar) 主题创建。
    本博客所有文章除特别声明外，均采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议，转载请注明出处。
  # 主题用户越多，开发者维护和更新的积极性就越高，如果您喜欢本主题，请在适当的位置显示主题信息和仓库链接以表支持。

######## Tag Plugins ########
tag_plugins:
  # {% ablock %} / {% note %}
  note:
    default_color: "" # light, dark, red, orange, yellow, green, cyan, blue, purple, warning, error
    border: true # true / false
  # {% checkbox %}
  checkbox:
    interactive: false # enable interactive for user
  # {% quot %}
  quot:
    default: # 可以自行配置多种图标方案
      prefix: https://bu.dusays.com/2022/10/24/63567d3e092ff.png
      suffix: https://bu.dusays.com/2022/10/24/63567d3e0ab55.png
    hashtag:
      prefix: https://bu.dusays.com/2022/10/24/63567d3e07da3.png
  # {% emoji %}
  emoji:
    default: https://gcore.jsdelivr.net/gh/cdn-x/emoji/qq/${name}.gif
    twemoji: https://gcore.jsdelivr.net/gh/twitter/twemoji/assets/svg/${name}.svg
    qq: https://gcore.jsdelivr.net/gh/cdn-x/emoji/qq/${name}.gif
    aru: https://gcore.jsdelivr.net/gh/cdn-x/emoji/aru-l/${name}.gif
    tieba: https://gcore.jsdelivr.net/gh/cdn-x/emoji/tieba/${name}.png
    blobcat: https://gcore.jsdelivr.net/gh/norevi/waline-blobcatemojis@1.0/blobs/${name}.png
  # {% image %}
  image:
    fancybox: false # true, false
    parse_markdown: true # 把 markdown 格式的图片解析成图片标签

  # {% timeline %}
  timeline:
    max-height: 80vh
  # {% mark %}
  mark:
    default_color: dark # light, dark, red, orange, yellow, green, cyan, blue, purple, warning, error
  # {% tag %}
  tag:
    default_color: yellow # red, orange, yellow, green, cyan, blue, purple

######## JS Plugins ########
plugins:
  ## required plugins ##
  # jquery
  jquery: https://gcore.jsdelivr.net/npm/jquery@3.6.2/dist/jquery.min.js

  # stellar api
  stellar:
    sites: /js/plugins/sites.js
    friends: /js/plugins/friends.js
    ghinfo: /js/plugins/ghinfo.js
    timeline: /js/plugins/timeline.js
    linkcard: /js/plugins/linkcard.js
    fcircle: /js/plugins/fcircle.js
    weibo: /js/plugins/weibo.js

  marked: https://cdn.bootcdn.net/ajax/libs/marked/4.0.18/marked.min.js

  ## optional plugins ##
  # preload
  preload:
    enable: true
    service: flying_pages # instant_page, flying_pages
    instant_page: https://gcore.jsdelivr.net/gh/volantis-x/cdn-volantis@4.1.2/js/instant_page.js
    flying_pages: https://gcore.jsdelivr.net/gh/gijo-varghese/flying-pages@2.1.2/flying-pages.min.js

  # image lazyload
  # https://www.npmjs.com/package/vanilla-lazyload
  lazyload:
    enable: true # [hexo clean && hexo s] is required after changing this value.
    js: https://gcore.jsdelivr.net/npm/vanilla-lazyload@17.8.3/dist/lazyload.min.js
    transition: blur # blur, fade

  # https://scrollrevealjs.org/api/reveal.html
  scrollreveal:
    enable: #true
    js: https://gcore.jsdelivr.net/npm/scrollreveal@4.0.9/dist/scrollreveal.min.js
    distance: 8px
    duration: 500 # ms
    interval: 100 # ms
    scale: 1 # 0.1~1

  # https://fancyapps.com/docs/ui/fancybox/
  # available for {% image xxx %}
  fancybox:
    enable: true
    js: https://gcore.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js
    css: https://gcore.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css
    # 可以处理评论区的图片（不支持 iframe 类评论系统）例如：
    # 使用twikoo评论可以写: .tk-content img:not([class*="emo"])
    # 使用waline评论可以写: #waline_container .vcontent img
    selector: .swiper-slide img # 多个选择器用英文逗号隔开

  # swiper
  swiper:
    enable: true
    css: https://unpkg.com/swiper@8.4.5/swiper-bundle.min.css
    js: https://unpkg.com/swiper@8.4.5/swiper-bundle.min.js

  # 赫蹏 (Heti) - 专为中文网页内容设计的排版样式增强
  # https://github.com/sivan/heti
  heti:
    enable: false # 此插件会和代码块冲突，仅适用于纯中文博主。
    css: https://unpkg.com/heti@0.9.2/umd/heti.min.css
    js: https://unpkg.com/heti@0.9.2/umd/heti-addon.min.js

  # MathJax
  # 需在Markdown文件开头加入mathjax: true
  # 推荐使用Pandoc: npm uninstall hexo-renderer-marked --save & npm install hexo-renderer-pandoc --save
  mathjax:
    enable: false
    cdn: https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js?config=TeX-AMS-MML_HTMLorMML

  # Katex - The fastest math typesetting library for the web
  # https://katex.org/docs/autorender.html
  # https://github.com/KaTeX/KaTeX
  # 使用 hexo-renderer-markdown-it-plus 作为公式渲染器：npm uninstall hexo-renderer-marked --save npm install hexo-renderer-markdown-it-plus --save
  katex:
    enable: false
    min_css: <link rel="stylesheet" href="https://gcore.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0" crossorigin="anonymous">
    min_js: <script defer src="https://gcore.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js" integrity="sha384-PwRUT/YqbnEjkZO0zZxNqcxACrXe+j766U2amXcgMg5457rve2Y7I6ZJSm2A0mS4" crossorigin="anonymous"></script>
    auto_render_min_js: <script defer src="https://gcore.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js" integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05" crossorigin="anonymous"onload="renderMathInElement(document.body);"></script>

  # Mermaid - markdwon to flow chart, seq chart, class chart ...
  # 需要安装 npm install --save hexo-filter-mermaid-diagrams
  # 使用时 需要在Markdown文件开头加入 mermaid: true
  # 使用示例：
  # ```mermaid
  # graph LR
  #   A(Section A) -->|option 1| B(Section A)
  #   B -->|option 2| C(Section C)
  # ```
  mermaid:
    enable: false
    # js: https://unpkg.com/mermaid@9.0.0/dist/mermaid.min.js
    js: https://cdn.jsdelivr.net/npm/mermaid@v9/dist/mermaid.min.js
    # Available themes: default | dark | forest | neutral
    # 推荐使用 dark 主题 在夜间模式下显示效果更好
    theme: dark

  # 代码块复制按钮
  copycode:
    enable: true
    js: /js/plugins/copycode.js
    default_text: "Copy"
    success_text: "Copied"

  # AI 摘要
  # https://github.com/zhheo/Post-Abstract-AI
  tianli_gpt:
    enable: false
    field: post # all, post, wiki
    api: 5Q5mpqRK5DkwT1X9Gi5e

style:
  darkmode: auto # auto / always / false
  smooth_scroll: true # true / false
  font-size:
    root: 16px
    body: .9375rem # 15px
    code: 85% # 14px
    codeblock: 0.8125rem # 13px
  font-family:
    logo: 'system-ui, "Microsoft Yahei", "Segoe UI", -apple-system, Roboto, Ubuntu, "Helvetica Neue", Arial, "WenQuanYi Micro Hei", sans-serif'
    body: 'system-ui, "Microsoft Yahei", "Segoe UI", -apple-system, Roboto, Ubuntu, "Helvetica Neue", Arial, "WenQuanYi Micro Hei", sans-serif'
    code: 'Menlo, Monaco, Consolas, system-ui, "Courier New", monospace, sans-serif'
    codeblock: 'Menlo, Monaco, Consolas, system-ui, "Courier New", monospace, sans-serif'
  text-align: left
  border-radius:
    card: 12px
    block: 12px
    bar: 6px
    image: 6px
  color:
    # 动态颜色（会根据明暗主题重设明度值，只用关心色相和饱和度即可）
    background: "hsl(212 16% 98%)" # 浅色背景颜色
    block: "hsl(212 8% 95%)" # 块背景颜色
    code: "hsl(14 100% 48%)" # 行内代码颜色
    text: "hsl(0 0% 20%)" # 文本颜色
    # 主题色配置（不会根据明暗动态调整，请设置为通用的颜色）
    theme: "hsl(192 98% 55%)" # 主题色
    accent: "hsl(14 100% 57%)" # 强调色
    link: "hsl(207 90% 54%)" # 超链接颜色
    button: "hsl(192 98% 55%)" # 按钮颜色
    hover: "hsl(14 100% 57%)" # 按钮高亮颜色
  animated_avatar:
    animate: auto # auto, always
    background: https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.4/avatar/round/rainbow64@3x.webp
  codeblock:
    scrollbar: 4px
    highlightjs_theme: https://gcore.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/atom-one-dark.min.css
  loading:
    loading: 正在加载
    error: 加载失败，请稍后重试。
  gradient: # https://webgradients.com/
    start: "linear-gradient(to right, hsl(215, 95%, 64%), hsl(195, 95%, 60%), hsl(165, 95%, 56%), hsl(165, 95%, 56%), hsl(195 95% 60%), hsl(215, 95%, 64%))"
    search: "linear-gradient(to right, #04F3FF, #08FFC6, #DDF730, #FFBD19, #FF1FE0, #C418FF, #04F3FF)"

default:
  avatar: https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.4/avatar/round/3442075.svg
  link: https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.4/link/8f277b4ee0ecd.svg
  cover: https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.4/cover/76b86c0226ffd.svg
  image: https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.4/image/2659360.svg

api_host:
  ghapi: https://api.github.com
  ghraw: https://raw.githubusercontent.com
  gist: https://gist.github.com
````

{% endfolding %}

### 各配置项功能说明

我们自己在项目根目录中创建一个`_config.stellar.yml`文件用于项目配置。一般我们只需要更改 sidebar 和 footer 部分即可

#### \_config.stellar.yml 文件配置

我们可以去 `node_modules/hexo-theme-stellar/_config.yml` 找到啊 stellar 项目的原始配置文件，复制到我们创建的`_config.stellar.yml`文件中。然后在此基础上进行改动

一般我们需要改动的只有`sidebar`部分和`footer`部分。

sidebar 部分我们需要配置网站的侧边栏

```yml
sidebar:
  menu:
    post: "[btn.blog](/)"
    wiki: "[专栏](/wiki/)"
    notes: "[导航](/notes/)"
    more: "[关于](/about/)"
```

我们也可以在 sidebar 部分配置每个页面需要出现的小部件。[自定义的小部件](#自定义小部件)需要我们在 `widgets.yml` 文件中声明

```yml
sidebar:
  widgets:
    #### 自动生成的页面 ####
    # 主页
    home: search, welcome, recent, ad, tagcloud, timeline # for home
    # 博客索引页
    blog_index: search_blog, recent, ad, timeline # for categories/tags/archives
    # 文档索引页
    wiki_index: search_docs, recent, ad, timeline # for wiki
    # 其它（404）
    others: search, welcome, recent, timeline # for 404 and ...
    #### 手动创建的页面 ####
    # 文章内页
    post: toc, ghrepo, search, ghissues, ad # for pages using 'layout:post'
    # 文档内页
    wiki: search, ghrepo, toc, ad, ghissues, related # for pages using 'layout:wiki'
    # 其它 layout:page 的页面
    page: welcome, toc, ad # for custom pages using 'layout:page'
```

当我们需要添加一个底部站点导航时，我们需要在`footer`部分添加`sitemap`

```yml
footer:
  sitemap:
    "博客":
      - "[近期](/)"
      - "[分类](/categories/)"
      - "[标签](/tags/)"
      - "[归档](/archives/)"
    "专栏":
      - "[vscode基础配置](/wiki/vscode/index.html)"
      - "[typescript基础](/wiki/typescript/index.html)"
    "更多":
      - "[友链](/)"
      - "[关于本站](/about/)"
      - "[文档站点](http://doc.whbbit.cn)"
      - "[GitHub](https://github.com/Whbbit1999)"
```

#### 自定义小部件

在`widgets.yml`文件中，我们可以定义一些小组件。官方定义的我们直接粘贴就行。这里我说一下自定义小组件

```yml
ad:
  layout: markdown
  title: 可能是广告位吧🤨
  content: |
    [![sable-admin-ad.jpg](/assets/sable-admin-ad.jpg)](https://github.com/Whbbit1999/sable)
```

#### 创建独立页面

在 widgets.yml 中创建对应的 widgets

```yml
Notes:
  name: 笔记
  title: 笔记
  description: 一个隐藏项目：笔记
  index: false
  # sidebar: [toc]
  tags: 知识库
  sections:
    "日常问题解决方案": [100, 199]
    "移动端开发笔记": [200, 299]
    "前端学习笔记": [300, 399]
    "在线工具": [400, 499]
```

添加后，可以在`_config.stellar.yml`中添加对应的 sidebar

```yml
sidebar:
  ...
  menu:
    ...
    notes: "[笔记](/notes/)"
```

> 创建对应的文件夹（文件夹名需要对应路径），这里需要创建对应的 notes 文件夹

如果你有 wiki 页面并且不想让它出现在 wiki 页面中时，可以在`projects.yml`中添加

```yml
Notes:
  index: false
```

接下来你就可以在对应的目录下书写对应的内容了。

#### 添加友链

[需要注意将 actions 的权限更改为可以写入内容](https://github.com/ad-m/github-push-action/issues/96#issuecomment-889984928)

## 高级功能

### 自定义 js 脚本

这里我们实现一个谷歌统计和百度统计脚本

```js
"use strict";

// 百度统计和google 统计
hexo.extend.injector.register("body_end", function () {
  return `<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?31181a38d70c8faf2c5bed0d93cab07b";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
  </script>

  <script async="async" src="https://www.googletagmanager.com/gtag/js?id=G-FTR5YKFFCM"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());
    gtag('config', 'G-FTR5YKFFCM');
  </script>
  `;
});
```

### 使用 GitHub pages 部署博客

### 使用 GitHub + vercel 部署

### 使用 GitHub + GitHub Actions + 服务器进行本地化部署
