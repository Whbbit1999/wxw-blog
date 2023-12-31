---
layout: wiki
wiki: frontNotes
title: 面试题
---

## this

## 闭包

## 深度克隆

递归

```js
const cache = new WekaMap()

function deepClone(value) {
  if (typeof value !== "object" || value === null) {
    return value
  }

  const cached = cache.get(value)
  if (cached) {
    return cached
  }

  const result = Array.isArray(value) ? [] : {}

  // 保持原形一致
  Object.setPrototypeOf(result, Object.getPrototypeOf(value))
  cache.set(value, result)

  for (const key in value) {
    // 剔除原型链上的内容
    if (value.hasOwnProperty(key)) {
      result[key] = deepClone(value[key])
    }
  }
  return result
}
```

JSON 转换

> 无法处理循环引用

```js
function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}
```

标签页通信

> 当消息包含函数、Symbol 等不可序列化的值时，就会报无法克隆的 DOM 异常。

```js
function deepClone(value) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel()
    port1.postMessage(value)
    post2.onmessage = (msg) => {
      resolve(msg.data)
    }
  })
}
```

## 性能优化

1. CDN 引入
2. SPA 路由懒加载
3. 图片懒加载
4. 图片压缩 / 使用 webp 格式图片
5. 相同类型包替换，dayjs 替换 momentjs
6. 打包优化
   - 代码切割，将不同的代码分包
   - 开启 gzip 压缩
