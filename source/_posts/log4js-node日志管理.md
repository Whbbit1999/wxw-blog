---
title: log4js node日志管理
tags: [node, 服务端]
categories: [node]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - title: 给大家演示下log4js使用 一款node日志管理工具
    url: https://www.bilibili.com/video/BV1DQ4y1N7Nv/?vd_source=6e32730b05dc719c9f21598867bef69d
date: 2022-12-19 14:45:33
description:
cover:
banner:
---

log4js 是一款 nodejs 日志管理工具

<!-- more -->

## 源码地址

GitHub 地址： https://github.com/log4js-node/log4js-node
文档地址： https://log4js-node.github.io/log4js-node/appenders.html

## 安装

```
npm i log4js
```

```
pnpm i log4js
```

```
yarn add log4js
```

## 简易使用说明

### 日志等级

- trace
- debug
- info
- warn
- error
- fatal

#### 使用

```js main.js
const log4js = require("log4js");
const logger = log4js.getLogger();

logger.trace("trace");
logger.debug("debug");
logger.info("info");
logger.warn("warn");
logger.error("error");
logger.fatal("fatal");
```

### 控制输出的日志级别

一下控制日志输出级别大于 debug 的输出到控制台

```js main.js
const log4js = require("log4js");
const logger = log4js.getLogger();

log4js.level = "warn";

logger.trace("trace");
logger.debug("debug");
logger.info("info");
logger.warn("warn"); // 会在控制台输出
logger.error("error"); // 输出
logger.fatal("fatal"); // 输出
```

### 控制日志输出至文件

以下示例表示日志文件输出为 all.log 文件中，文件根据每日日期进行分割，输出 debug 以上级别日志

```js main.js
const log4js = require("log4js");

log4js.configure({
  appenders: {
    console: { type: "console" },
    file: { type: "file", filename: "log.log" },
    dayfile: {
      type: "dateFile",
      filename: "all.log",
      pattern: ".yyyyMMdd",
    },
  },
  categories: {
    default: {
      appenders: ["console", "dayfile"],
      level: "debug", // 显示什么级别及以上日志
    },
  },
});

const logger = log4js.getLogger();
logger.trace("trace");
logger.debug("debug");
logger.info("info");
logger.warn("warn");
logger.error("error");
logger.fatal("fatal");
```

```log all.log
[2022-12-19T14:41:40.330] [DEBUG] default - debug
[2022-12-19T14:41:40.331] [INFO] default - info
[2022-12-19T14:41:40.331] [WARN] default - warn
[2022-12-19T14:41:40.331] [ERROR] default - error
[2022-12-19T14:41:40.332] [FATAL] default - fatal
```
