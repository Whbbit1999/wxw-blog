---
layout: wiki
wiki: frontNotes
title: 枚举类型
---

枚举的默认编号从 0 开始

```ts
enum SexType {
  BOY,
  GIRL,
}
console.log(SexType.BOY) // 0
```

可以自定义起始编号，后面的会自动 +1

```ts
enum SexType {
  BOY = 1,
  GIRL,
}
console.log(SexType.BOY, SexType.GIRL) // 1, 2
```

可以自定义值

```ts
enum Values {
  TOKEN = "token",
  SITE = "whbbit.cn",
}
```
