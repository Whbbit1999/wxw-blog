---
title: nest 服务提供者
tags: [nest, 服务端]
categories: [nest]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 16:15:46
description:
cover:
banner:
---

实现一些简单的 nest 服务提供者，以此了解服务提供者的作用方式。并且自定义一个 DbModule 接入 typegoose

<!-- more -->

## 类注册

```js
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MyService } from "./my/my.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MyService],
})
export class AppModule {}
```

使用：

```js
export class AppController() {
  constructor(private readonly MyService) {}
}
```

完整写法，可更改提供者名称

```js
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MyService } from "./my/my.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "myService",
      useClass: MyService,
    },
  ],
})
export class AppModule {}
```

使用：

```js
export class AppController() {
  constructor(@Inject('myService') private readonly myService) {}
}
```

## 基本数据注册

```js
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "config",
      useValue: { name: "wxw", author: "wxw" },
    },
  ],
})
export class AppModule {}
```

使用：

```js
export class AppController {
  constructor(@Inject('config') private readonly config){}
}
```

## 动态加载模块

实现根据不同的环境创建不同的服务，首先需要获取 env 环境变量

```bash
pnpm add dotenv
```

创建 `app.service.ts` 和 `my.service.ts`

根据不同环境变量动态设置服务

```js
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MyService } from "./my/my.service";
import path from "path";
import { config } from "dotenv";

config({ path: path.join(__dirname, "../.env") });

const appService = {
  provide: "appService",
  useClass: process.env.NODE_ENV === "development" ? AppService : MyService,
};
@Module({
  imports: [],
  controllers: [AppController],
  providers: [appService],
})
export class AppModule {}
```

## 自定义 DbModule 接入 typegoose

> [GitHub 仓库地址](https://github.com/Whbbit1999/dbModule)

主要代码实现

```js
// db.module.ts
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DbService } from './db.service';
import { getModelForClass, mongoose } from '@typegoose/typegoose';
import { ConfigService } from '@nestjs/config';

type ClassType = { new (...args: any[]): any };

@Module({})
export class DbModule {
  static forRoot(envKey: string, options = {}): DynamicModule {
    const providers: Provider[] = [
      {
        provide: 'DB_CONNECT',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const uri = configService.get<string>(envKey, 'MONGO_URI');
          return mongoose.connect(uri, options);
        },
      },
    ];
    return {
      module: DbModule,
      providers,
      exports: providers,
      global: true,
    };
  }
  static forFeature(models: ClassType[]): DynamicModule {
    const providers = models.map((model) => {
      return {
        provide: model.name,
        useFactory: () => getModelForClass(model),
      } as Provider;
    });
    return {
      module: DbModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
```
