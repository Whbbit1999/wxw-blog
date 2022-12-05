---
title: git统计代码提交数量
tags: [git]
categories: [git]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 16:01:16
description:
cover:
banner:
---

查看项目中的每个人代码提交量，看看谁在摸鱼吧

<!-- more -->

统计 git 提交次数: 所有人的所有提交次数，会展示所有的提交人 提交次数详情

```shell
git log | grep "^Author: " | awk '{print $2}' | sort | uniq -c | sort -k1,1nr
```

查看 git 上的个人代码量

```shell
git log --author="username" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

> username 需要修改为提交人的 username

统计每个人增删行数

```shell
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

### 2021/04 - 2022/11 代码总量一览

| 项目                   | 用户名            |    添加 |  删除行 |    总数 |
| :--------------------- | :---------------- | ------: | ------: | ------: |
| 门户                   | 王晓伟            |       1 |       1 |       0 |
| 门户                   | whbbit            |  115145 |   17563 |   97582 |
| 官网                   | whbbit            |   23569 |    8000 |   15569 |
| 官网                   | wxw               |    5369 |    2315 |    3054 |
| 开票程序               | whbbit            | 1612697 |  871939 |  740758 |
| 票夹小程序             | whbbit            |   96152 |   10207 |   85945 |
| 开票云平台             | whbbit            |  231420 |  139413 |   92007 |
| 开票云平台             | 王晓伟            |      54 |      45 |       9 |
| 开票云平台             | wxw               |   87952 |   61171 |   26781 |
| 运营管理（数据可视化） | whbbit            |  191928 |   32904 |  159024 |
| 总计                   | whbbit/wxw/王晓伟 | 2364287 | 1143558 | 1220729 |
