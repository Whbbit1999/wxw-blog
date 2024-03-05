---
topic: nest
title: nestjs入门
tags: [nest, node, 服务端]
categories: [代码人生, 后端技术]
poster:
  topic:
  headline: nestjs入门
  caption: 常用模块安装和使用
  color: #fff
references:
date: 2022-12-12 15:23:45
description:
cover: /assets/posts/nest-cover.png
banner: /assets/posts/nest-topic-cover.png
---

nestjs 开发手册

<!-- more -->

## 安装

```bash
npm i -g @nestjs/cli
```

## 创建项目

```bash
nest new <project-name>
```

## nestjs 开发依赖

### orm - prisma

```bash
pnpm add prisma-binding @prisma/client
```

```bash
pnpm add -D prisma
```

### mock 数据

```bash
pnpm add mockjs
```

```bash
pnpm add -D @types/mockjs
```

### 配置文件

```bash
pnpm add @nestjs/config
```

### 校验

```bash
pnpm add class-validator class-transformer
```

### 密码加密

bcrypt 依赖 python 环境

```bash
pnpm add bcrypt
```

或者下载 bcryptjs

```bash
pnpm add bcryptjs
```

```bash
pnpm add -D @types/bcryptjs
```

#### bcrypt 使用

使用 bcrypt 加密密码

```ts
import { hashSync } from "bcryptjs"
// hasnSync(要散列的值，加密等级)
// val ? hashSync(val) : val;

// 对比密码是否一致
```

### jwt

```bash
pnpm add @nestjs/jwt
```

```.env
SECRET = 22222
```

```ts jwt.module.ts
import {JwtModule} from '@nestjs/jwt'
@Global()
@Module({
  imports: [JwtModule.registerAsync({
    useFactory() {
      return {
        secret: process.env.SECRET,
      }
    }
  })],
  providers: [],
  exports: [JwtModule]
})
```

### passport 验证

#### 安装依赖

```bash
pnpm add @nestjs/passport passport passport-local passport-jwt
```

```bash
pnpm add -D @types/passport @types/passport-local @types/passport-jwt
```

#### 使用

> 进行登录时的校验并颁发 token

```ts local.strategy.ts
import { Strategy, IStrategyOptions } from "passport-local"
import { PassportStrategy } from "@nestjs/passport"
import { compareSync } from "bcryptjs"

export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  //local为策略的名称，默认为passport-local ,-后面的local。可以自定义名称，自定义名称后，使用AuthGuard需要指定对应的名称
  constructor(@InjectModel(User) private userModel: ReturnModelType<typeof User>) {
    super({
      usernameField: "username",
      passwordField: "password",
    } as IStrategyOptions)
  }

  // 策略执行
  async validate(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).select("password")

    // 用户不存在
    if (!user) {
      throw new BadRequestException("用户名不正确")
    }
    // 密码不存在
    if (!compareSync(password, user.password)) {
      throw new BadRequestException("密码错误")
    }

    return user
  }
}
```

```ts jwt.strategy.ts
import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { compareSync } from "bcryptjs"

export class LocalStrategy extends PassportStrategy(Strategy, "jwt") {
  //jwt为策略的名称，默认为passport-jwt ,-后面的jwt。可以自定义名称，自定义名称后，使用AuthGuard需要指定对应的名称
  constructor(@InjectModel(User) private userModel: ReturnModelType<typeof User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    } as StrategyOptions)
  }

  // 策略执行
  async validate(id) {
    return await this.userModel.findById(id)
  }
}
```

```ts login.dto.ts
export class LoginDto {
  username: string
  password: string
}
```

```ts auth.module.ts
import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from "./local.strategy"
import { JwtStrategy } from "./jwt.strategy"

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}
```

```ts auth.controller.ts
import { Post, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { LoginDto } from "./login.dto.ts"
import { JwtService } from "/jwt.module"
export class AuthController {
  constructor(private jwtService: JwtService) {}
  @Post("login")
  @UseGuards(AuthGuard("local"))
  async login(@Body() dto: LoginDto, @Req() req) {
    return {
      token: this.jwtService.sign(String(req.user._id)),
    }
  }

  @Post("user")
  @UseGuards(AuthGuard("jwt"))
  async user(@Req() req) {
    return req.user
  }
}
```

### token 颁发

```bash

```

日期处理

```bash
pnpm add dayjs
```

swagger 集成

```bash
pnpm add
```

```bash
pnpm add prisma-binding @prisma/client mockjs @nestjs/config class-validator class-transformer argon2 @nestjs/passport passport passport-local @nestjs/jwt passport-jwt lodash multer dayjs express redis @nestjs/throttler
```

```bash
pnpm add -D prisma typescript @types/node @types/mockjs @nestjs/mapped-types @types/passport-local @types/passport-jwt @types/express @types/lodash @types/multer @types/node
```
