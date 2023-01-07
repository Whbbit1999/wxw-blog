---
layout: wiki
wiki: TypeScript
title: 初识 TypeScript
---

{% link https://www.typescriptlang.org/ %}

## 为什么要学习 TypeScript

1. 为大型系统而生

   ts 是静态类型化的 js 的超集，在大型工程中有无可比拟的优势。

2. 招聘市场需求

   大量的前端团队都在使用 ts 进行系统的开发。

3. 新框架几乎都在使用 ts

## 开发前的准备

在开始使用 ts 前要有以下的准备工作：

- nodejs > 8.0，最好是在 12 版本以上
- 包管理工具： npm、yarn 或 pnpm 其一

可以现在 typescript 官方训练场测试学习测试 ts 代码
{% link https://www.typescriptlang.org/play %}
也可以在本地安装 typescript 进行项目开发

### 安装 ts

通过 npm 全局安装 ts

```shell
npm i -g typescript
```

### 创建环境

#### 手动创建

创建 ts-learn 目录用于 ts 的学习

```shell
mkdir ts-learn && cd ts-learn
```

在 ts-learn 目录下进行 node 项目初始化

```shell
npm init -y
```

进行 ts 的初始化工作

> 全局安装 ts 后会有 tsc 命令

```shell
tsc --init
```

tsc 项目初始化后，会出现 tsconfig.json 文件

```json

```

#### 使用 vite 创建

更推介这种创建方式，省去很多对 tsc 的配置，可以让我们专注在 ts 的内容中

```shell
pnpm create vite
```

选择 Vanilla , typescript 即可创建好一个 typescript 的项目。

<!-- - 基础知识
  - 原始类型
  - 枚举类型
  - 接口
  - 类
  - 函数
  - 泛型
  - 类型断言
  - 类型守卫
  - 类型兼容性
  - 交叉类型
  - 联合类型
  - 类型别名
  - 可辨识联合类型
  - 装饰器
- 进阶知识
  - 索引类型
  - 映射类型
  - 条件类型
  - infer 关键字
  - 工具类型设计
  - 编写声明文件
  - 模块与命名空间 -->
