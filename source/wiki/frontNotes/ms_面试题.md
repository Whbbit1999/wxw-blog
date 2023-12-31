---
layout: wiki
wiki: frontNotes
title: 面试题
---

## vue 都有哪些生命周期

vue2 中有 beforeCreate,created, beforeMount,mounted, beforeUpdate, updated, beforeDestroy, destroyed

vue3 中有 onBeforeMount, onMounted, onUpdate, onUpdated, onUnmount,onUnmounted
都会在 setup 中同步调用

## vue 双向绑定的原理是什么

vue2 中使用 Object.defineProperty 来劫持每个数据的 getter 和 setter，在数据发生变化时进行响应的处理。

vue3 中使用 Proxy 来解决 Object.defineProperty 的一些问题

<!-- Vue 对数组的方法进行了重写 -->

## vue3 响应式数据原理是什么？

vue3 使用了 Proxy 来实现响应式数据，放弃了 vue2 中使用 Object.defineProperty，主要是有一下几点考虑：

1. Object.defineProperty 无法监听到数组下标的变化，导致数组通过下标添加或修改时无法响应
2. Object.defineProperty 只能劫持对象的属性，从而需要对每个对象进行遍历，如果属性值还是对象，就需要进行深度遍历。Proxy 可以劫持整个对象，并返回一个新对象
3. Proxy 不仅可以代理对象，还可以代理数组。甚至可以代理动态新增的属性

## ?? Proxy 只会代理对象的第一层，vue3 是如何处理这个问题呢？

判断当前的 Reflect.get 返回值是否为 Object，如果是就通过 reactive 方法进行代理，这样就做到了深度监听

## ?? v-model 的双向绑定原理是什么

v-model 的本质是 :value 和 updatedValue 的集合

## vue2 和 vue3 渲染器的 diff 算法有什么不同呢？

## 为什么 vue3 的性能会很好呢？

## 为什么 vue3 的表格有时会很卡呢？有什么解决方法？

## vue 组建参数传递

## vue 路由怎么实现呢？

## vuex 是什么，如何使用呢？什么场景下会使用它

## v-if 和 v-show 的区别

## 如何让 css 只在当前组建中起作用

使用 scoped，使用 scoped 后，每个 css 会被添加一个唯一的动态属性。

## scoped 如何实现样式穿透

## keep-alive 的实现原理是什么？相关的生命周期函数，什么场景下会使用？常用属性有哪些？

## 怎么声明一个组件？如何实现全局组件注册？

## nextTick 有什么作用？实现原理是什么？

## SSR 的实现原理

## vue2 data 为什么必须是一个函数

## vue computed 的实现原理

## watch 和 computed 的区别是什么？都在场景下使用？
