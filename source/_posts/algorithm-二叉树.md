---
topic: algorithm
title: 二叉树
tags: []
categories: []
poster:
  topic:
  headline: 二叉树
  caption:
  color: #fff
date: 2024-02-17 16:35:14
description:
cover: /assets/posts/algorithm.png
banner: /assets/posts/algorithm.png
references:
---

什么是二叉树？

## 前序遍历

中左右

### 递归

```js
var preorderTraversal = function (root) => {
  const result = []

  if (root === null) {
    return result
  }

  const order = (node) => {
    result.push(node)
    if(node.left !== null) {
      order(node.left)
    }
    if(node.right !== null){
      order(node.right)
    }
  }
  order(root)

  return result
}
```

9 6 8

### 迭代

```js
var preorderTraversal = function(root) => {
  const result = []

  if (root === null) {
    return result
  }

  const stack = []
  stack.push(root)

  while(stack.length > 0){
    const current = stack.pop()
    result.push(current.val)

    if (current.right !== null) {
      stack.push(current.right)
    }
    if (current.left !== null) {
      stack.push(current.left)
    }
  }

  return result
}
```

## 中序遍历

左中右

### 递归

```js
var preorderTraversal = function(root) => {
  const result = []

  if (root === null) {
    return result
  }

  const order = (node) => {
    if (node.left !== null) {
      order(node.left)
    }
    result.push(node.val)
    if (node.right !== null) {
      order(node.right)
    }
  }
  order(root)

  return result
}
```

### 迭代

```js
var preorderTraversal = function(root) => {
  const result = []
  if(root === null) {
    return result
  }

  const stack = []
  let temp = root

  while(temp !== null) {
    stack.push(temp)
    temp = temp.left

  }

  while(stack.length) {
    const current = stack.pop()
    result.push(current.val)
    if (current.right !== null) {
      let temp2 = current.right

      while(temp2 !== null){
        stack.push(temp2)
        temp2 = temp2.left
      }
    }
  }
  return result
}
```

## 后序遍历

## 层序遍历
