---
layout: wiki
wiki: frontNotes
title: namespace 命名空间
---

我们可以使用命名空间进行隔离，命名空间中的内容想让外部使用时，需要导出。类似于 es6 中的模块

```ts
namespace User {
  export let username: string = "whbbit"
}
console.log(User.username)
```

## 命名空间的嵌套

想让外部使用时，需要对嵌套的命名空间进行导出

```ts
namespace User {
  export let username: string = "whbbit"
  export namespace Member {
    export let name = "wxw"
  }
}
console.log(User.Member.username)
```
