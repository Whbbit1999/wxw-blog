---
title: 组件设计 -- 父子组件调用时使用props还是ref？
tags: [思考]
categories: [代码人生]
poster:
  topic: null
  headline: null
  caption: null
  color: null
date: 2024-11-26 23:57:12
description:
cover:
banner:
references:
---

关于组件设计的一点思考。

<!-- more -->

最近在和朋友讨论一个问题，感觉蛮有趣的。他写程序时间没我长，所以有一些问题会和我一起讨论，在这期间，常常会给我带来另一种角度来看待某个问题。

比如今天我们要讨论的一个组件要调用另一个组件的时候，我们该使用 props 传递让子组件来处理还是直接在父组件中通过 ref 调用子组件的函数。

毫无疑问的说，我是更加倾向于 props 传递，具体状态改变或者函数调用交于子组件处理的。

## 优缺点比较

我们先来说明一下两者的优缺点：

### 通过 ref 调用子组件的方法

- 优点

1. 可以直接调用子组件方法
2. 方便直接控制子组件行为

- 缺点

1. 耦合度高：父组件使用时强依赖于子组件暴露的方法
2. 可维护性差：多次用到需要在不同的代码里维护想通的调用方式
3. 可读性差

### 通过 props 传递

- 优点

1. 耦合度低，只依赖于 props 的状态
2. 可维护性强
3. 可测试性高

- 缺点

1. 灵活性差
2. 可能需要传递大量的状态

## 思考

下面我来说下我对于此观点的思考：

1. 从代码耦合度方面考虑，props 传递明显是好于通过 ref 调用组件方法的；
2. 从维护方面来看，通过 props 传递可以明确数据流向，容易理解；
3. 从容易使用方面来看，通过 ref 调用组件方法是有好处的，但这仅限于对全部代码十分了解的情况下。二次开发和对组件重构时就需要做大量操作了。

我建议优先通过 props 传递，这样可以使组件更加容易维护和阅读。
