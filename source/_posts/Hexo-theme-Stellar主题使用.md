---
title: Hexo-theme-Stellar主题使用
tags: [hexo, hexo主题]
categories: [hexo]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 14:03:28
description:
cover:
banner:
---

hexo-theme-stellar 主题好看配置项又多，今天和我一起来看一下如何使用该主题创建一个 hexo 博客站点吧！

<!-- more -->

{% quot 官方文档 icon:hashtag el:h2 %}

{% link https://xaoxuu.com/wiki/stellar/#start desc:true %}

## 侧边栏配置

### 首页侧边栏欢迎语句

```yml _data/widgets.yml
welcome:
  layout: markdown
  title: 欢迎欢迎
  content: |
    本站是Whbbit1999的知识和个人博客集合站，希望您在这里玩的开心。
```

### 侧边栏文章大纲

```yml _data/widgets.yml
toc:
  layout: toc
  list_number: false # 是否显示序号
  min_depth: 2 # 建议不要低于 2 即从 H2 标签开始解析（H1标签用于文章大标题）
  max_depth: 5 # 5 代表最多解析到 H5 标签
  fallback: recent # Use a backup widget when toc does not exist.
```

### 侧边栏标签云组件

```yml _data/widgets.yml
tagcloud:
  layout: tagcloud
  title: 标签云
  # 标签云配置
  min_font: 12
  max_font: 24
  amount: 100
  orderby: name
  order: 1 # 1, sac 升序；-1, desc 降序
  color: false # 使用颜色
  start_color: # 开始的颜色。您可使用十六进位值（'#b700ff'），rgba（rgba(183, 0, 255, 1)），hsla（hsla(283, 100%, 50%, 1)）或 颜色关键字。此变量仅在 color 参数开启时才有用。
  end_color: # 结束的颜色。您可使用十六进位值（'#b700ff'），rgba（rgba(183, 0, 255, 1)），hsla（hsla(283, 100%, 50%, 1)）或 颜色关键字。此变量仅在 color 参数开启时才有用。
  show_count: false # 显示每个标签的文章总数
```

### 使用

在使用时，需要在文章配置`sidebar`项中配置对应的`layout_id`即可在对应页面展示相应的自定义组件如：

```md
---
sidebar: [toc, tagcloud]
---
```

## about 页面配置

### GitHub 信息

```yml _data/widgets.yml
# github info
ghuser:
  layout: ghuser
  api: https://api.github.com # 若有 api.github.com 镜像可填，否则保持默认
  username: Whbbit1999 # your github login username
  avatar: true # show avatar or not
  menu: true # show menu or not

ghrepo:
  layout: ghrepo
```

```marndown /source/about/index.md
---
sidebar: [ghuser, toc]
---
```

## 统一配置

以下是我的配置

```yml _config/stellar.yml
# 侧边栏配置
sidebar:
  widgets:
    #### 自动生成的页面 ####
    # 主页
    home: search, welcome, recent,tagcloud, timeline # for home
    # 博客索引页
    blog_index: search_blog, recent, timeline # for categories/tags/archives
    # 文档索引页
    wiki_index: search_docs, recent, timeline # for wiki
    # 其它（404）
    others: search, welcome, recent, timeline # for 404 and ...
    #### 手动创建的页面 ####
    # 文章内页
    post: toc, ghrepo, search, ghissues # for pages using 'layout:post'
    # 文档内页
    wiki: search, ghrepo, toc, ghissues, related # for pages using 'layout:wiki'
    # 其它 layout:page 的页面
    page: welcome, toc # for custom pages using 'layout:page'
  menu:
    post: '[btn.blog](/)'
    wiki: '[btn.wiki](/wiki/)'
    # notes: '[随记](/notes/)'
    more: '[社交](/about/)'

search:
  service: local_search # local_search, todo...
  local_search: # 在 front-matter 中设置 indexing:false 来避免被搜索索引
    field: all # post, page, all
    path: /search.json # 搜索文件存放位置
    content: true # 是否搜索内容
    codeblock: false # 是否搜索代码块（需要content: true)

# 开启图片点击放大功能
tag_plugins:
  # {% image %}
  image:
    fancybox: true

# footer
footer:
  social:
    github:
      icon: '<svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" class="octicon octicon-mark-github">
    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
</svg>'
      url: https://github.com/Whbbit1999
  content: | # 支持 Markdown 格式
    本站由 [@Whbbit1999](/) 使用 [Stellar](https://github.com/xaoxuu/hexo-theme-stellar) 主题创建。
    本博客所有文章除特别声明外，均采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议，转载请注明出处。
    [晋ICP备2020011938号-1](https://beian.miit.gov.cn/) | [晋公网安备 14062102000028号](http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=14062102000028)
```

{% quot 各种自定义标签 icon:hashtag el:h2 %}
可以在这里找到许多自定义标签配置
{% link https://xaoxuu.com/wiki/stellar/tag-plugins/#%E6%96%87%E6%9C%AC%E4%BF%AE%E9%A5%B0%E6%A0%87%E7%AD%BE%E9%9B%86 desc:true %}
