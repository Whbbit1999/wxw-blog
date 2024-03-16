---
topic: ts
title: ts 装饰器
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: ts 装饰器 #大标题
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-03-17 00:27:44
description:
cover: /assets/posts/ts.jpeg
banner: /assets/posts/ts.jpeg
references:
---

> **代码来自[后盾网](houdunren.com)**

**装饰器为 ts 提供了强大的代码复用功能**

<!--
## 装饰器和继承的区别
- 装饰器比继承更加灵活
-->

使用装饰器需要在 tsconfig.json 中修改

> 装饰器是试验性的功能，需要在配置文件中开启

```json tsconfig.json
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

## 类装饰器 `ClassDecorator`

相当于在原型对象上添加属性

**类装饰器只有一个参数**，是构造函数。

```ts
const moveDecorator: ClassDecorator = (target: Function) => {
  console.log(target)
  target.prototype.getPosition = (): { x: number; y: number } => {
    return { x: 20, y: 20 }
  }
}

@moveDecorator
class Player {}

@moveDecorator
class Tank {}

const player = new Player()
console.log(player.getPosition())
```

## 装饰器语法糖 `@`

不使用语法糖，需要传递类到对应的函数中。使用语法糖不需要手动调用。

```ts
const moveDecorator: ClassDecorator = (target: Function) => {
  console.log(target)
  target.prototype.getPosition = (): { x: number; y: number } => {
    return { x: 20, y: 20 }
  }
}

// 不使用语法糖
class Player {}
moveDecorator(Player)

// 使用语法糖
@moveDecorator
class Tank {}

const player = new Player()
console.log(player.getPosition())
```

## 装饰器叠加

可以使用多个装饰器

```ts
const moveDecorator: ClassDecorator = (target: Function) => {
  target.prototype.getPosition = () => {
    console.log("获取位置")
  }
}
const MusicDecorator: ClassDecorator = (target: Function) => {
  target.prototype.playMusic = () => {
    console.log("音乐播放")
  }
}

@moveDecorator
class Player {}

const player = new Player()
player.getPosition()

@MusicDecorator
@moveDecorator
class Tank {}

const tank = new Tank()
tank.playMusic()
tank.getPosition()
```

### 实例：全局消息响应

```ts
const MessageDecorator: ClassDecorator = (target: Function) => {
  target.prototype.sendMessage = (message: string, type: "success" | "error" = "success") => {
    return {
      message,
      type,
    }
  }
}

@MessageDecorator
class LoginController {
  login() {
    console.log("登录业务处理")
    setTimeout(() => {
      this.sendMessage("登录成功")
    }, 2000)
  }
}
new LoginController().login()
```

## 装饰器工厂

**根据不同的条件返回不同的装饰器**

```ts
const MusicDecorator = (type: string): ClassDecorator => {
  switch (type) {
    case "player":
      return (target: Function) => {
        target.prototype.playMusic = () => {
          console.log("play player music")
        }
      }
    case "tank":
      return (target: Function) => {
        target.prototype.playMusic = () => {
          console.log("play tank music")
        }
      }
    default:
      return (target: Function) => {
        target.prototype.playMusic = () => {
          console.log("play other music")
        }
      }
  }
}

@MusicDecorator("player")
class Player {}
new Player().playMusic()

@MusicDecorator("tank")
class Tank {}
new Tank().playMusic()
```

## 方法装饰器

```ts
const ShowDecorator: MethodDecorator = (...args: any[]) => {
  console.log(args)
  /**
   打印参数： 
     [0]: 如果是静态函数就是构造函数，如果是普通方法就是其原型对象
     [1]: 使用装饰器的方法名称
     [2]: 方法属性的描述
  [
    User: {},  
    "show", 
    {
      "value": [Function (anonymous)] // 函数的内容
      "writable": true,  
      "enumerable": false, 
      "configurable": true
    }
  ]
   */
}
class User {
  @ShowDecorator
  public show() {}
}
```

可以使用函数装饰器更改函数的内容

```ts
const ShowDecorator: MethodDecorator = (...args: any[]) => {
  console.log(args)
  args[2].value = () => {
    console.log("ShowDecorator changed")
  }
}
class User {
  @ShowDecorator
  public show() {
    console.log("show function ")
  }
}

new User().show() // 打印 "ShowDecorator changed"，函数内容已经被更改
```

上面那样使用数组接收后调用不是很直观，我们可以使用变量名接收方法装饰器参数

`const ShowDecorator: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => { ... };`

```ts
const ShowDecorator: MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  descriptor.value = () => {
    console.log("ShowDecorator changed")
  }
}
class User {
  @ShowDecorator
  public show() {
    console.log("show function ")
  }
}

new User().show() // 打印 "ShowDecorator changed"，函数内容已经被更改
```

调用装饰器时，也可以更改静态方法的内容

```ts
const ShowDecorator: MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  descriptor.value = () => {
    console.log("ShowDecorator changed")
  }
}
class User {
  @ShowDecorator
  public static show() {
    console.log("show function ")
  }
}

User.show() // 打印 "ShowDecorator changed"，函数内容已经被更改
```

调用 `writable = true` 控制方法不能重新声明

```ts
const ShowDecorator: MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  descriptor.value = () => {
    console.log("ShowDecorator changed")
  }
  descriptor.writable = false
}
class User {
  @ShowDecorator
  public static show() {
    console.log("show function ")
  }
}

User.show() // 打印 "ShowDecorator changed"，函数内容已经被更改
User.show = () => {
  console.log("重写show方法")
}
User.show()
```

### 示例：模拟代码高亮

可以先使用变量将函数内容保存起来，在自定义操作后直接调用保存的函数

```ts
const HighlightDecorator: MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const method = descriptor.value
  descriptor.value = () => {
    return `<div style="background: red;">${method()}</div>`
  }
}
class User {
  @HighlightDecorator
  public show() {
    return "js code "
  }
}
new User().show()
```

### 示例：结合装饰器工厂实现延迟执行

```ts
const SleepDecorator = (times: number = 2000): MethodDecorator => {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const method = descriptor.value
    descriptor.value = () => {
      setTimeout(() => {
        method()
      }, times)
    }
  }
}
class User {
  @SleepDecorator(3000)
  public show() {
    console.log("wxw")
  }
}
new User().show()
```

### 示例：全局异常处理

```ts
const ErrorDecorator: MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const method = descriptor.value

  descriptor.value = () => {
    try {
      method()
    } catch (e) {
      // 函数中抛出的错误在这里进行处理
      console.log("%c异常处理", "color: green;")
      console.log(`%c${e}`, "color: red")
    }
  }
}

class User {
  @ErrorDecorator
  find() {
    throw new Error("出错了")
  }
}
new User().find()
```

### 示例：根据权限限制访问

可以根据传入的权限数组进行判断用户是否有访问权限

```ts
type UserType = { name: string; isLogin: boolean; permissions: string }
const user = {
  name: "wxw",
  isLogin: true,
  permissions: ["admin", "member"],
}
const AccessDecorator = (keys: string[]): MethodDecorator => {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const method = descriptor.value
    const validate = () => keys.every((k) => user.permissions.includes(k))
    descriptor.value = () => {
      // 控制用户登录并且有权限才可访问
      if (user.isLogin && validate() === true) {
        console.log("验证通过")
        method()
        return
      } else {
        console.log("验证失败")
        return false
      }
    }
  }
}

class User {
  @AccessDecorator(["admin"])
  find() {
    console.log("find function")
  }
}
new User().find()
```

## 属性装饰器

接收的参数

- args[0]: `target` 静态参数就是构造函数，普通参数就是其原型对象
- args[1]: `propertyKey` 属性名称
- args[2]: undefined

```ts
const PropDecorator: PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
  console.log(target, propertyKey)
}
class User {
  public username: string
}
```

### 实例：使用属性装饰器动态改变对象属性

将属性改为全部大写

```ts
const UpperDecorator: PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
  let value: string = undefined

  //在这里使用Object.defineProperty对原数据进行更改
  Object.defineProperty(target, propertyKey, {
    get() {
      return value.toUpperCase()
    },
    set(v) {
      value = v
    },
  })
}

class Article {
  @UpperDecorator
  public title: string | undefined
}

const article = new Article()
article.title = "article title"
console.log(article.title)
```

## 参数装饰器

接收的参数

- args[0]: `target` 静态参数就是构造函数，普通参数就是其原型对象
- args[1]: `propertyKey` 属性名称
- args[2]: `parameterIndex` 参数所在的位置，从 0 开始计数

```ts
const ParamDecorator: ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
  console.log(target, propertyKey, parameterIndex)
}
class User {
  show(id: number, @ParamDecorator user: { name: string }) {}
}
```

<!-- ### 实例：使用参数装饰器完成数据验证 -->

{% note 装饰器执行顺序:
  <b>参数装饰器 -> 方法装饰器</b>
%}
