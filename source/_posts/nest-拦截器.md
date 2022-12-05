---
title: nest 拦截器
tags: [node, nest, 服务端]
categories: [nest]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 16:14:54
description:
cover:
banner:
---

实现几个常用的 nest 拦截器

<!-- more -->

## 全局响应拦截器

```js
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, ServiceUnavailableException } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    const request = ctx.getRequest<FastifyRequest>()

    request.log.error(exception)

    // 非 HTTP 标准异常处理
    response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: new ServiceUnavailableException().getResponse(),
    })
  }
}

```

## 全局 HTTP 响应拦截器

```js
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { BusinessExceptions } from './business.exception.filter'

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    const request = ctx.getRequest<FastifyRequest>()
    const status = exception.getStatus()

    if (exception instanceof BusinessExceptions) {
      const error = exception.getResponse()
      response.status(HttpStatus.OK).send({
        data: null,
        status: error['code'],
        extra: {},
        message: error['message'],
        success: false,
      })
      return
    }
    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    })
  }
}

```

## 自定义拦截器

```js
import { HttpException, HttpStatus } from '@nestjs/common'
import { BUSINESS_ERROR_CODE } from './business.error.codes'
type BusinessError = {
  code: number
  message: string
}

export class BusinessExceptions extends HttpException {
  constructor(err: BusinessError | string) {
    if (typeof err === 'string') {
      err = {
        code: BUSINESS_ERROR_CODE.COMMON,
        message: err,
      }
    }
    super(err, HttpStatus.OK)
  }

  static throwForbidden() {
    throw new BusinessExceptions({
      code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
      message: '抱歉哦，您无此权限！',
    })
  }
}
```
