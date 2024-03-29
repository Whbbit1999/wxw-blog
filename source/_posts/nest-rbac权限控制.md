---
topic: nest
title: RBAC权限控制简述
tags: []
categories: []
poster:
  topic:
  headline: RBAC权限控制简述
  caption:
  color: #fff
date: 2024-02-04 21:47:35
description:
cover: /assets/posts/nest-cover.png
banner: /assets/posts/nest-topic-cover.png
references:
  - "[oracle rbac](https://docs.oracle.com/cd/E19253-01/819-7061/rbac-38/index.html)"
---

RBAC —— 基于角色的访问控制

<!-- more -->

## RBAC 演化

在系统权限设置时，我们一般可以设置一个权限表 `permission` ，用户声明系统中所有的权限 (基础)。我们可以给用户分配不同的权限，使用 `user_permission` 记录用户拥有的权限。其实这就可以实现基本的权限控制了。

但是，如果我们给每一个用户都手动去分配权限，那么后期如果有相同类型的用户想要同时取消或者设置一个相同的权限时，我们就需要对所有的用户进行修改。这时，我们引入一个角色的概念。

我们可以创建一个角色，给角色赋予权限，使用 `role_permission` 记录角色拥有的权限。角色创建好后，我们就可以给用户分配一个或多个角色，使用 `user_role` 记录用户拥有的角色。

后续我们如果要取消或新增某个权限时，只需要对角色进行操作，不必对每个用户进行更改了。

这就是 RBAC 权限控制的所有流程了。
![RBAC](/assets/posts/rbac.png)

## 权限的查找

我们在查找用户是否有权限时，从用户自身查找，如果该用户本身拥有该权限，放行。如果用户没有该权限，查找用户角色拥有的权限，如果用户的一个角色拥有该权限，放行。否则就拒绝访问。
