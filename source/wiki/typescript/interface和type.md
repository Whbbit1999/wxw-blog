---
layout: wiki
wiki: TypeScript
title: interface 和 type
order: 7
---

## interface

> 和 abstract 抽象类想比 interface 中不能有具体代码实现。

### 类中实现 interface

在类中要实现 `interface`，需要使用 `implements <interface name>`

```ts
interface IAnimal {
  name: string;
  getName(): void;
}
abstract class Animal {
  constructor(public name: string) {}
  setName(name: string) {
    this.name = name;
  }
}

class Cat extends Animal implements IAnimal {
  constructor(public name: string) {
    super(name);
  }
  public getName(): string {
    return this.name;
  }
}

const cat = new Cat("cat");
cat.setName("dog");
console.log(cat.getName());
```

### interface 对对象的约束

interface 对对象的约束，作用和 type 类似

> `[key: string]: any;` 表示对象的键需要是字符串类型，值的累心不做约束

```ts
interface IUser {
  name: string;
  age: number;
  site?: string;
  info(): string;
  [key: string]: any;
}

let user: IUser = {
  name: "wxw",
  age: 25,
  sex: "男",
  info() {
    return `${this.name} ${this.age}`;
  },
};
```

### 在函数中使用 interface

```ts
interface IUser {
  name: string;
  age: number;
}
function setUser(user: IUser) {
  return user;
}
setUser({ name: "wxw", age: 25 });
```

### interface 对函数的约束

```ts
interface IGetUser {
  (name: string): string;
}
const getUser: IGetUser = (name: string) => {
  return name;
};
console.log(getUser("W"));
```

### 在类中使用 interface

```ts
interface IUser {
  name: string;
  age: number;
}
class User {
  _info: IUser;
  constructor(user: IUser) {
    this._info = user;
  }
  get info() {
    return this._info;
  }
}
const user = new User({ name: "whbbit", age: 25 });
console.log(user.info);
```

### 数组中使用 interface

```ts
interface IUser {
  name: string;
  age: number;
}

const user1 = { name: "whbbit", age: 25 };
const user2 = { name: "wxw", age: 25 };

const users: IUser[] = [user1, user2];
```

### interface 结合 enum

```ts
enum SexType {
  BOY,
  GIRL,
}
interface IUser {
  name: string;
  age: number;
  sex: SexType;
}
const user1 = { name: "whbbit", age: 25, sex: SexType.BOY };
const user2 = { name: "wxw", age: 25, sex: SexType.GIRL };

const users: IUser[] = [user1, user2];
```

### interface 的继承

```ts
interface IVoice {
  voice(): void;
}
interface IAnimal extends IVoice {
  name: string;
  getName(): void;
}

// 相当于
// interface IAnimal {
//   name: string;
//   getName(): void;
//   voice(): void;
// }
```

### interface 声明合并

写一个同名 interface 就会实现 interface 的合并。

**后面的 interface 和前面的 interface 中不能有同名参数**

```ts
interface IAnimal {
  name: string;
  getName(): string;
}
interface IAnimal {
  voice(): string;
}

const cat: IAnimal = {
  getName() {
    return this.name;
  },
  name: "cat",
  voice() {
    return "miao~";
  },
};

console.log(cat.getName());
console.log(cat.voice());
```

## type

大多数情况下 type 和 interfere 使用相同

```ts
type TUser = { name: string; age: 25 };

function getUser(user: TUser): TUser {
  return user;
}

const user: TUser = {
  name: "wxw",
  age: 25,
};

console.log(getUser(user));
```

type 可以作为**基本类型的别名**使用，也可以申明**联合类型**

```ts
type IsAdmin = boolean;
type Sex = "boy" | "girl";
```

### type 和 interface 的区别

1. interface 同名会合并，type 同名会报错
2. interface 可以继承，type 使用 `&` 合并

   > type 可以使用 `&` 合并 interface 类型

```ts
type TName = { name: stirng };
type TAge = { age: number };
interface IMember = {member: boolean}

type TUser = TName & TAge & IMember;
```
