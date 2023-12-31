---
layout: wiki
wiki: frontNotes
title: ts中的类
---

## 对参数进行约束

定义一个普通的类，约束其接收的参数的类型

```ts
class User {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

const user1 = new User("Whbbit", 25)
const user2 = new User("wxw", 25)

// 限制users数组的值只能是User类示例化的对象
const users: User[] = [user1, user2]
```

## public 修饰符

使用 public 修饰符表示这个函数，变量可以在函数外进行访问。默认为 public

> 在 js 中默认就可以在外部进行访问

```ts
class User {
  public name: string
  public age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  public getName() {
    return `name: ${this.name}, age: ${this.age}`
  }
}
const user1 = new User("whbbit", 25)
user1.name = "wxw"
console.log(user1.name)
console.log(user1.getName())
```

## protected 修饰符

使用 protected 后，只能在类中调用。可以对方法和属性进行约束。

```ts
class User {
  protected name: string
  protected age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  protected show() {
    console.log("show")
  }
  public getName() {
    return `name: ${this.name}, age: ${this.age}`
  }
}
const user1 = new User("whbbit", 25)
user1.name = "wxw" // ts 报错
console.log(user1.name) // ts 报错
user1.show() // ts 报错

console.log(user1.getName()) // 正常运行
```

在父类中声明的受保护的方法或属性，在子类中可以调用。但在类外部不可调用

```ts
class Person {
  protected name: string
  protected age: number
  protected show() {
    console.log("show")
  }
}
class User extends Person {
  constructor(name: string, age: number) {
    super()
    this.name = name
    this.age = age
  }
  public getInfo() {
    return this.show()
  }
}
const user1 = new User("wxw", 25)
user1.getInfo()
```

## private 私有属性

在子类或类外部都不可访问。在父类中定义的私有方法子类不可使用，不可覆盖

```ts
class Person {
  protected name: string;
  public age: number;
  private site: string;
  protected show() {
    console.log("show"， `site is ${this.site}`);
  }
}

class User extends Person {
  constructor(name: string, age: number) {
    super();
    this.name = name;
    this.age = age;
  }
  getSite() {
    console.log(this.site);
  }
  public getInfo() {
    return this.show();
  }
}
const user1 = new User("wxw", 25);
user1.getInfo();
console.log(user1.site);
```

在父类中定义的受保护的方法，在子类中可以使用，可以覆盖，但是权限只能降低为 `public` 或维持 `protected`。不能将其更改为`private`

```ts
class Person {
  protected name: string;
  public age: number;
  private site: string;
  protected show() {
    console.log("show"， `site is ${this.site}`);
  }
}

class User extends Person {
  constructor(name: string, age: number) {
    super();
    this.name = name;
    this.age = age;
  }
  getSite() {
    console.log(this.site);
  }
  private show() {
   console.log('这里是子类覆盖掉的shou方法')
  }
  public getInfo() {
    return this.show();
  }
}
const user1 = new User("wxw", 25);
user1.show()
```

## readonly

限定属性不能进行修改

```ts
class Axios {
  readonly site: string = "https://www.whbbit.cn/api"
  constructor() {}

  public get(url: string) {
    console.log(`请求地址是${url}`)
    return []
  }
}

const instance = new Axios()
console.log(instance.site)
instance.site = "https://api.com" // 报错：Cannot assign to 'site' because it is a read-only property
```

但是在构造函数初始化时可以更改

```ts
class Axios {
  readonly site: string = "https://www.whbbit.cn/api"
  constructor(site?: string) {
    this.site = site || this.site
  }

  public get(url: string) {
    console.log(`请求地址是${this.site}/${url}`)
    return []
  }
}

const instance = new Axios()
instance.get("article") // "请求地址是https://www.whbbit.cn/api/article"

const instance1 = new Axios("https://www.whbbit.cn/docs")
instance1.get("article") // "请求地址是https://www.whbbit.cn/docs/article"
```

> readonly 前可以添加 `public`、`protected`、 `private`等修饰符

## constructor 构造函数

在构造函数中接收的参数前书写修饰符，ts 会自动帮我们进行初始化操作

```ts
class User {
  constructor(public name: string, public: age: string) {}
  // 等同于
  // public name: string
  // public  age: number
  // constructor( name: string, age: number) {
    // this.name = name
    // this.age = age
  // }
}
```

## static 静态属性/方法

static 静态属性/方法只能通过构造函数调用。

使用 static 修饰属性

```ts
class Axios {
  static site: string = "whbbit.cn"
  constructor() {}
}
const instance = new Axios()
console.log(Axios.site)
console.log(instance.site) // 报错
```

上面代码编译为 js 后的代码

```js
"use strict"
class Axios {
  constructor() {}
}
Axios.site = "whbbit.cn"
const instance = new Axios()
console.log(Axios.site)
console.log(instance.site) // 报错
```

static 也可以修饰方法

```ts
class Axios {
  static site: string = "whbbit.cn"
  constructor() {}
  public static getSite() {
    return Axios.site
  }
}
const instance = new Axios()
console.log(Axios.getSite())
```

## get / set

```ts
class User {
  constructor(private _name: string) {}

  public get name(): string {
    return this._name
  }
  public set name(name: string) {
    this._name = name
  }
}
const user = new User("wxw")
console.log(user.name)
console.log((user.name = "whbbit"))
console.log(user.name)
```

使用访问器 get/set 可以在设置或获取时进行处理

```ts
type articleType = { title: string }
class Articles {
  constructor(private _lists: articleType[] = []) {}

  get articles(): articleType[] {
    return this._lists.map((article) => {
      article.title = article.title + "www.whbbit.cn"
      return article
    })
  }
  set articles(articles: articleType[]) {
    this._lists = articles
  }
}
const list = new Articles()
list.articles = [{ title: "ts中的类" }, { title: "ts断言" }]
console.log(list.articles)
```

## 单例模式实现

1. 将构造函数设置为私有
2. 定义一个静态方法用来生成实例
3. 定义一个静态属性，在静态方法中判断是否已经初始化，未初始化就进行初始化，已经初始化直接返回这个生成的实例

```ts
class Axios {
  private static instance: Axios | null = null
  private constructor() {
    console.log("构造函数方法")
  }

  static make(): Axios {
    if (Axios.instance === null) {
      Axios.instance = new Axios()
    }
    return Axios.instance
  }
}
const instance = Axios.make()
console.log(instance)
```

## 抽象类

```ts
// 抽象类
abstract class Animal {
  constructor(public name: string) {}
  abstract getName(): string
  setName(name: string) {
    this.name = name
  }
}

// 派生类
class Cat extends Animal {
  constructor(public name: string) {
    super(name)
  }
  public getName(): string {
    return this.name
  }
}

const cat = new Cat("cat")
cat.setName("dog")
```

抽象类无法被实例化

派生类中需要实现抽象类中定义的方法
