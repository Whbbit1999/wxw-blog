---
title: code review  黑话摘录
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: code review  黑话摘录 #大标题
  caption: 逼格拉满 #标题下方的小字
  color: #标题颜色
date: 2024-06-08 22:22:49
description:
cover: /assets/posts/git.jpg
banner: /assets/posts/git.jpg
references:
  - "[LGTM : code review 行话](https://www.jianshu.com/p/238a1e1f4037)"
---

最近在给 element plus 提交 pr 的时候看到一些莫名其妙的单词缩写。查阅后发现其是有功能的，现摘录如下。

以后在写代码 review 的时候，可以用一下，逼格拉满。

<center>{% emoji blobcat ablobcatrainbow height:1em %}{% emoji blobcat ablobcatrainbow height:2em %}{% emoji blobcat ablobcatrainbow height:3em %}{% emoji blobcat ablobcatrainbow height:2em %}{% emoji blobcat ablobcatrainbow height:1em %}</center>

| 简写         | 含义                                                                                                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LGTM         | Looks good to me，表示认可这次 PR，同意 merge 合并代码到远程仓库                                                                                                                       |
| NACK/NAK     | negative acknowledgement, i.e. disagree with change and/or concept                                                                                                                     |
| ASAP         | as soon as possible! 尽快                                                                                                                                                              |
| ACK          | acknowledgement, i.e. agreed/accepted change                                                                                                                                           |
| RFC          | request for comments, i.e. I think this is a good idea, lets discuss                                                                                                                   |
| WIP          | Work In Progress 「进展中」，常见词汇，这里做为 Best Practice 单独提出来，主要针对改动较多的 PR，可以先提交部分，标题或 Tag 加上 WIP，表示尚未完成，这样别人可以先 review 已提交的部分 |
| IIRC         | : if I recall correctly                                                                                                                                                                |
| IANAL        | :“ I am not a lawyer ”, but I smell licensing issues                                                                                                                                   |
| IMO          | :（In my opinion），在我看来                                                                                                                                                           |
| TL;DR        | : Too Long; Didn't Read 「太长懒得看」，README 文档常见。                                                                                                                              |
| AFAIK/AFAICT | as far as I know / can tell                                                                                                                                                            |
| PR           | Pull request「合并请求」                                                                                                                                                               |
| CR           | Code Review 「代码审查」                                                                                                                                                               |
| PTAL         | Please Take A Look. 你来瞅瞅？用来提示别人来看一下                                                                                                                                     |
| TBR          | To Be Reviewed. 提示维护者进行 review                                                                                                                                                  |
| TBD          | To Be Done(or Defined/Discussed/Decided/Determined). 根据语境不同意义有所区别，但一般都是还没搞定的意思。                                                                              |
| TBH          | To be honest 「老实说」                                                                                                                                                                |
| ATM          | at the moment 「现阶段」，                                                                                                                                                             |
