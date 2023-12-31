---
layout: wiki
wiki: frontNotes
title: 常用目录使用概览
---

## pages 目录

我们可以根据约定式路由来访问对应的界面

```txt
|-- pages/
  |-- index.vue
  |-- user-[group]/
    |-- [id].vue
```

```html

```

## 静态资源

## composables 目录

composables 目录下的文件会被自动引入

具名导出

```ts composables/useFoo.ts
epxort const useFoo = () => {
  return useState('foo', () => 'bar')
}
```

匿名导出

```ts composables/useFoo.ts
export default () => {
  return useState("foo", () => "bar")
}
```

在 `.vue` 文件中使用

```html app.vue
<template>
  <div>{{foo}}</div>
</template>
<script setup>
  const foo = useFoo()
</script>
```

## layouts 目录

```txt
|-- layout/
  |-- default.vue
  |-- doc.vue
```

```html layouts/default.vue
<template>
  <div>
    default layout
    <slot />
  </div>
</template>
```

```html layouts/doc.vue
<template>
  <div>
    doc layout
    <slot />
  </div>
</template>
```

## components 目录

```txt
|-- layout/
  |-- default.vue
  |-- doc.vue
```

```html layouts/default.vue
<template>
  <div>
    default layout
    <slot />
  </div>
</template>
```

```html layouts/doc.vue
<template>
  <div>
    doc layout
    <slot />
  </div>
</template>
```
