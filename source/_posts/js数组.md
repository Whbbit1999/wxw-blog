---
title: js数组
tags: [js]
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - "[后盾人文档库/后盾人网站](www.hodunren.com)"
date: 2022-12-07 14:01:02
description:
cover:
banner:
---

js 数组的基础知识

<!-- more -->

## 基本操作

### 声明

数组里可以存放任何类型的数据

```js
// 使用构造函数创建
let arr = new Arrary(0, 1, 2, 3)
// 字面量方式创建
let newArr = [0, 1, 2, 3]
```

### 获取元素

根据下标获取，从 0 开始

```js
let arr = [0, 1, 2, 3, 4]
// 获取第三个元素
cosnole.log(arr[2]) // 2

let arr1 = [
  [1, 2],
  [2, 3],
]
console.log(arr[0]) // [1,2]
```

### 获取数组长度

根据 `arr.length` 获取数组长度

```js
let arr = [0, 1, 2, 3, 4]
console.log(arr.length) // 5

arr[10] = 2
console.log(arr.length) // 10，6-9会填充为empty
console.log(arr[7]) // undefined
```

{% quot 注意 el:h3 %}

使用构造函数创建数组时， 如果只填写一个为 number 类型的值，就会将此数组填充为对应长度的数组

```js
let arr = new Array(10)
console.log(arr.length) // 10
```

在 es6 以后，使用 `Array.of` 可以解决此问题

```js
let arr = Array.of(10)
console.log(arr.length) // 1
console.log(arr) // [10]
```

### 类型检测

可以使用 `Array.isArray` 检测一个数据是否是数组

```js
console.log(Array.isArray([])) // true
console.log(Array.isArray("")) // false
console.log(Array.isArray({})) // false
console.log(Array.isArray(1)) // false
console.log(Array.isArray(false)) // false
```

### 转换为字符串

可以使用 `数组.toString` 将数组转换为字符串

```js
console.log([].toString()) // ''
console.log([1, 2, 3].toString()) // '1,2,3'
```

{% note 使用
后端需要传递一个 id 字符串时，可以使用此方法转换
%}

可以使用数组 `String(数组)` 来转换

```js
console.log(String([1, 2, 3, 4])) // '1,2,3,4'
```

可以使用`数组.join('拼接的字符')`来自定义用什么符号拼接为字符串

```js
console.log([1, 2, 3, 4].join("-")) // '1-2-3-4'
console.log([1, 2, 3, 4].join(",")) // '1,2,3,4'
```

### 其他类型数据转换为数组

字符串可以使用`字符串.split()`转换为数组

```js
console.log("1,3,4,6".split(",")) // [1,3,4,6]
```

元素中有 length 属性时，可以使用 `Array.from(元素)` 转换

```js
const string = "whbbit.cn"
console.log(Array.from(string))
//['w', 'h', 'b', 'b', 'i', 't','.', 'c', 'n']
```

Object 也可以使用此特性转换：

```js
let obj = {
  0: 'whbbit.cn'
  1: 'wxw'
}
console.log(Array.from(obj)) // []
obj.length = 2
console.log(Array.from(obj)) // ['whbbit.cn', 'wxw']
```

Arrar.from()有第二个参数，是对第一个元素的操作

```html
<div>1</div>
<div>2</div>
<script>
  let divs = document.querySelectorAll("div")
  // 将div元素的color设置为红色
  Array.from(divs, (item) => {
    item.style.color = "red"
    return item
  })
</script>
```

## 扩展运算符

### 数组拼接

```js
let className = ["js", "css", "html"]
let numbers = [1, 2, 3]
console.log([...numbers, className])
```

### 函数传参

参数数量不确定时可以使用展开语法将所有参数接收到一个数组中

```js
function sum(...rest) {
  return rest.reduce((s, v) => (s += v), 0)
}

sum(1, 2, 3, 4)
```

### dom 节点操作

```html
<div>1</div>
<div>2</div>
<script>
  let divs = document.querySelectorAll("div")
  // 直接进行遍历会报错
  // divs.map(item => console.log(item)) // 报错
  // 需要转换为数组进行遍历
  ;[...divs].map((item) => {
    console.log(item)
  })
</script>
```

## 解构赋值

不使用解构赋值

```js
let arr = ["wxw", 23]
let name = arr[0]
let age = arr[1]
```

使用解构赋值

```js
let [name, age] = ["wxw", 23]
```

过滤某个值

```js
let [, age] = ["wxw", 23]
```

结合扩展运算符

```js
let [name, ...rest] = ["wxw", 23, "whbbit.cn"]
```

赋值默认值

```js
function show([name, year, site = 10]) {
  console.log(name, year, site) // 'wxw', 23, 10
}
show(["wxw", 23])
```

## 数组方法

### 数组元素添加

```js
let arr = [0, 1]
// 数组后追加
arr[arr.length] = [2]
arr[arr.length] = [3]
arr = [...arr, 4]
arr.push(5) // 返回值是数组长度
// 在数组前添加
arr.unshift(-1) // 返回值是数组长度
arr = [-2, ...arr]
```

### 数组删除元素

使用 pop()弹出数组最后一个元素，会改变原数组

```js
let arr = [0, 1]
let val = arr.pop()
console.log(val) // 1
```

使用 shift() 弹出数组第一个元素，会改变原数组

```js
let arr = [0, 1]
let val = arr.shift()
console.log(val) // 0
```

### 数组填充

```js
console.log(new Array(3).fill(0)) // [0,0,0]
```

在指定位置填充

```js
// 从下标为1填充至下标为3，不包含3
console.log([1, 2, 3, 4].fill("wxw", 1, 3))
// [1, 'wxw', 'wxw', 4]
```

### splice

会改变原数组，返回值为受改变的元素

```js
let arr = [0, 1, 2, 3, 4]
// 第一个参数从下标为几开始 第二个参数截取几位，第三个/n个参数：替换的元素
let change = arr.slice(1, 2)
console.log(change) // [1,2]
```

### slice

不会改变原数组，返回值为受改变的元素

```js
let arr = [0, 1, 2, 3, 4]
// 第一个参数从下标为几开始 第二个参数到下标为几结束
let change = arr.slice(1, 2)
console.log(change) // [2]
// 从0截取到末尾
change = arr.slice()
console.log(change) // [0,1,2,3,4]
// 从1截取到末尾
change = arr.slice(1)
console.log(change) // [1,2,3,4]
```

### 案例：移动数组元素方法

```js
function move(array, from, to) {
  if (from < 0 || to >= array.length) {
    console.log("参数错误")
    return
  }
  const newArray = [...array]
  let item = newArray.splice(from, 1)
  newArray.splice(to, 0, ...item)
  return newArray
}
let array = [0, 1, 2, 3]
console.log(move(array, 1, 3))
```

### 清空数组

赋值一个新数组，内存地址更改为新数组的地址。对原有内存地址数据没有改变

```js
let array = [0, 1, 2, 3, 4]
let w = array
array = []
console.log(array) // []
console.log(w) // [0, 1, 2, 3, 4]
```

长度设置为 0，对原有内存地址数据进行操作。其他引用该地址的数据也会清空

```js
let array = [0, 1, 2, 3, 4]
let w = array
array.length = 0
console.log(array) // []
console.log(w) // []
```

```js
let array = [0, 1, 2, 3, 4]
array.splice(0)
```

```js
let array = [0, 1, 2, 3, 4]
while (array.pop()) {}
```

## 数组拆分/合并

拆分

```js
let str = "1,2"
let arr = str.split(",")
```

合并 concat() 或 扩展运算符

```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
arr1.concat(arr2)
```

复制指定元素至指定位置 copyWithin()

## 查找数据

### indexOf 和 lastIndexOf

#### indexOf

从数组左侧开始查找对应元素。元素存在就返回当前元素在数组中第一次出现的位置，不存在就返回-1

```js
let arr = [1, 2, 3, 4]
console.log(arr.indexOf(2)) // 1
console.log(arr.indexOf(8)) // -1
```

#### lastIndexOf

从数组右侧开始查找对应的元素。元素存在就返回当前元素最后一次出现的位置，不存在就返回 -1

```js
let arr = [1, 2, 3, 4, 3]
console.log(arr.lastIndexOf(3)) // 4
console.log(arr.lastIndexOf(6)) // -1
```

{% note 注意 indexOf 和 lastIndexOf会进行类型匹配 %}

```js
let arr = [1, 2, 3, 4, "5"]
console.log(arr.indexOf(5)) // -1
console.log(arr.lastIndexOf(5)) // -1
```

{% note 注意 indexOf 和 lastIndexOf可以传递第二个参数，表示从第几个元素开始查找 %}

> 返回值还是该元素在数组中出现的第一次或最后一次

```js
let arr = [1, 2, 3, 4, 2]
console.log(arr.indexOf(2, 1)) // 1
console.log(arr.indexOf(3, 1)) // 4
```

### includes

查找对应的元素是否在对应的数组中，返回 boolean 类型

```js
let arr = [1, 2, 3, 4, 5]
console.log(arr.includes(2)) // true
console.log(arr.includes(10)) // false
```

includes 实现原理

```js
function includes(array, val) {
  for (const value of array) {
    if (value === val) return true
    return false
  }
}
let array = [1, 2]
console.log(includes(array, 2)) // true
```

```js
let lesson = [{ name: "html" }, { name: "js" }, { name: "css" }]

console.log(lesson.includes({ name: "html" })) // false
// 内存地址不一致导致没有找到对应的元素
```

### find 和 findIndex

#### find

find 可以传递一个回调函数，回调函数返回值为 true 时就返回找到第一个值，回调函数返回为 false 时就返回 undefined

```js
let arr = [1, 2, 3]
console.log(arr.find((item) => true)) // 1
console.log(arr.find((item) => item === 2)) // 2
console.log(arr.find((item) => item === "2")) // undefined
console.log(arr.find((item) => item === 200)) // undefined
```

```js
let lesson = [{ name: "html" }, { name: "js" }, { name: "css" }]

console.log(lesson.find((item) => item.name === "html")) // {name: 'html'}
```

#### findIndex

findIndex 可以传递一个回调函数，回调函数返回值为 true 时就返回找到第一个值所在的位置，回调函数返回为 false 时就返回 -1

```js
let lesson = [{ name: "html" }, { name: "js" }, { name: "css" }]

console.log(lesson.findIndex((item) => item.name === "html")) // 1
```

#### 自定义 find

```js
function find(array, callback) {
  for (const value of array) {
    if (callback(value)) {
      return value
    }
  }
  return undefined
}
find([1, 2, 3, 4], (item) => item === 2) // 2
```

在原型链上定制 findValue 方法

```js
Array.prototype.findValue = function (callback) {
  for (const value of this) {
    if (callback(value)) return value
  }
  return undefined
}
;[1, 2, 3, 4].findValue((item) => item === 2) // 2
```

## 排序

### sort

回调函数返回值小于 0 两者位置互换，大于 0 不变

```js
let arr = [1, 3, 2, 4, 5]
// 从小到大排序
arr.sort((a, b) => a - b) // [1,2,3,4,5]
// 从大到小排序
arr.sort((a, b) => b - a) // [5,4,3,2,1]

let cart = [
  { name: "html", price: 20 },
  { name: "css", price: 25 },
  { name: "js", price: 30 },
]
//按价格从小到大排
cart = cart.sort((a, b) => a.price - b.price)
// 按价格从大到小排
cart = cart.sort((a, b) => b.price - a.price)
```

#### sort 实现

```js
function sort(array, callback) {
  for (const n in array) {
    for (const m in array) {
      if (callback(array[n], array[m]) < 0) {
        ;[array[n], array[m]] = [array[m], array[n]]
      }
    }
  }
  return array
}

arr = sort([2, 3, 1], (a, b) => a - b)
arr = sort([2, 3, 1], (a, b) => b - a)
```

## 数组循环

### for 循环

```js
let lessons = [
  { name: "html", price: 20 },
  { name: "css", price: 25 },
  { name: "js", price: 30 },
]
for (let i = 0; i < lessons.length; i++) {
  console.log(lessons[i])
}
// { name: "html", price: 20 }
// { name: "css", price: 25 }
// { name: "js", price: 30 }
```

### for ... of

拿到的值是对应元素的值

```js
let lessons = [
  { name: "html", price: 20 },
  { name: "css", price: 25 },
  { name: "js", price: 30 },
]
for (const lesson of lessons) {
  lesson.click = true
}
console.log(lessons)
/**
 [
  { name: "html", price: 20, click: true},
  { name: "css", price: 25, click: true},
  { name: "js", price: 30, click: true},
 ]
 */
```

{%note 为什么可以改变原数组呢？
这里的 lesson 是重新赋值的一个元素，可以改变原数组是因为这是直接改变内存地址中的值
%}

```js
let arr = [1, 2, 3]
for (const value of arr) {
  value = 3
}
console.log(arr) // [1,2,3]
```

### for ... in

拿到的值是对应元素的下标

```js
let lessons = [
  { name: "html", price: 20 },
  { name: "css", price: 25 },
  { name: "js", price: 30 },
]
for (const index in lessons) {
  console.log(lessons[index])
}
// { name: "html", price: 20 }
// { name: "css", price: 25 }
// { name: "js", price: 30 }
```

### forEach

forEach 可以收两个参数，第一个参数是一个回调函数，第二个参数是 this 指向。回调函数可以接受三个参数，第一个是当先循环的元素，第二个是当前循环的下标，第三个元素是原数组

```js
let lessons = [
  { name: "html", price: 20 },
  { name: "css", price: 25 },
  { name: "js", price: 30 },
]
lessons.forEach((item, index, lessons) => {
  console.log(item, index, lessons)
})
```

### interator 迭代器

```js
let lessons = [
  { name: "html", price: 20 },
  { name: "css", price: 25 },
  { name: "js", price: 30 },
]
console.log(lessons.keys().next())
```

### some & every

#### some

#### every

## 数组过滤

### filter

返回符合条件的数据数组

```js
let arr = [1, 2, 3]
console.log(arr.filter((item) => item > 2)) // [3]
```

#### filter 实现

```js
let arr = [1, 2, 3]
function filter(array, callback) {
  let newArray = []
  for (const value of array) {
    if (callback(value) === true) {
      newArray.push(value)
    }
  }
  return newArray
}
const res = filter(arr, (item) => item > 2)
console.log(res) // [3]
```

## map

返回一个操作后的数组

```js
let arr = [1, 2, 3]
let newArr = arr.map((item) => item + 2)
console.log(newArr) // [3,4,5]
```

## reduce

reduce 接收两个参数，第一个参数为一个回调函数，第二个参数是初始值

回调函数第一个值是上一次回调函数的返回值，第一次调用时 reduce 没有传递第二个参数，就默认为数组的第一个参数，第二个参数有传值就为第二个参数传递的值

```js
let arr = [1, 2, 3, 4, 5]
arr.reduce((pre, value, index, array) => {
  console.log(pre, value)
})
/**
 1,2
 undefined, 3
 undefined, 4
 undefined, 5
 */
arr.reduce((pre, value, index, array) => {
  console.log(pre, value)
}, 2)
/**
 2,1
 undefined, 2
 undefined, 3
 undefined, 4
 undefined, 5
 */

arr.reduce((pre, value, index, array) => {
  console.log(pre, value)
  return 22
}, 2)
/**
 2,1
 22, 2
 22, 3
 22, 4
 22, 5
 */
```

#### 案例：统计元素出现次数

```js
function arrayCount(array, item) {
  return array.reduce((total, cur) => {
    total += item === cur ? 1 : 0
    return total
  }, 0)
}
console.log(arrayCount([1, 2, 2, 2, 1, 1, 2], 2)) // 4
console.log(arrayCount([1, 2, 2, 2, 1, 1, 2], 1)) // 3
```

#### 案例：获取元素中的最大值

```js
function getMaxItem(array, item) {
  return array.reduce((pre, cur) => (pre > cur ? pre : cur))
}
console.log(getMaxItem([1, 2, 3, 444, 555]))
```

#### 案例：获取阅读次数最多的文章

```js
function max(array) {
  return array.reduce((pre, cur) => {
    return pre.count > cur.count ? pre : cur
  })
}

let article = [
  { title: "js基础", count: 100 },
  { title: "css基础", count: 200 },
  { title: "ts基础", count: 10 },
  { title: "html基础", count: 500 },
]
console.log(max(article))
```

#### 案例：所有文章阅读总数

```js
function count(array) {
  return array.reduce((pre, cur) => (pre += cur.count), 0)
}

let article = [
  { title: "js基础", count: 100 },
  { title: "css基础", count: 200 },
  { title: "ts基础", count: 10 },
  { title: "html基础", count: 500 },
]
console.log(count(article))
```

#### 案例：文章阅读总数大于 200 的文章名称

```js
function getTitleByCount(array, count) {
  return array
    .reduce((arr, cur) => {
      if (cur.count > count) {
        arr.push(cur)
      }
      return arr
    }, [])
    .map((item) => item.title)
}

let article = [
  { title: "js基础", count: 100 },
  { title: "css基础", count: 200 },
  { title: "ts基础", count: 10 },
  { title: "html基础", count: 500 },
]
console.log(getTitleByCount(article, 200))
```

#### 案例： 数组去重

使用 reduce

```js
let arr = [1, 2, 2, 2, 3, 34, 4, 1, 1, 1, 2, 3, 4, 5]
let result = arr.reduce((arr, cur) => {
  if (!arr.includes(cur)) {
    arr.push(cur)
  }
  return arr
}, [])
console.log(result)
```

使用扩展运算符和 Set

```js
let arr = [1, 2, 2, 2, 3, 34, 4, 1, 1, 1, 2, 3, 4, 5]
let result = [...new Set([...arr])]
console.log(result)
```
