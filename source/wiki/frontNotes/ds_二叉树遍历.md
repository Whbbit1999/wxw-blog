---
layout: wiki
wiki: frontNotes
title: 二叉树遍历
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
  const resultult = []
  if(root === null) {
    return resultult
  }

  const stack = []
  let temp = root

  while(temp !== null) {
    stack.push(temp)
    temp = temp.left

  }

  while(stack.length) {
    const current = stack.pop()
    resultult.push(current.val)
    if (current.right !== null) {
      let temp2 = current.right

      while(temp2 !== null){
        stack.push(temp2)
        temp2 = temp2.left
      }
    }
  }
  return resultult
}
```

## 后序遍历

## 层序遍历
