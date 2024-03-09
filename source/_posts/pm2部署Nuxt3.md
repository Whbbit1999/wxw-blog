---
title: pm2部署Nuxt3
tags: []
categories: []
date: 2023-12-05 18:02:30
description:
cover: /assets/posts/nuxt.jpg
banner: /assets/posts/nuxt.jpg
poster:
  # topic: 标题上方的小字
  headline: "pm2部署Nuxt3"
  # caption: 标题下方的小字
  # color: #fff
---

1. 使用 `pnpm run build` 打包，默认会在项目根目录中生成一个 `.output` 文件夹。
   > .output 目录包含该项目打包后所需的全部内容，无需像 `Nuxt2` 将整个文件夹拷贝到对应目录中
2. 将 `.output` 文件上传至服务器中，这里假设为 `portal` 文件夹中

3. 进入对应目录中，配置 `ecosystem.config.js` 文件

```bash
cd portal && touch ecosystem.config.js
```

```js ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "test-portal",
      exec_mode: "fork",
      instances: 1,
      interpreter: "/opt/homebrew/bin/node", // 这里需要换成服务器中或者本地高版本Node bin目录
      script: ".output/server/index.mjs",
      ignore_watch: ["node_modules", "public", "logs"], // 不用监听的文件
      merge_logs: true, // 设置追加日志而不是新建日志
      log_date_format: "YYYY-MM-DD HH:mm:ss", // 指定日志文件的时间格式
      min_uptime: "60s", // 应用运行少于时间被认为是异常启动
      max_restarts: 30, // 最大异常重启次数
      restart_delay: 60, // 异常重启情况下，延时重启时间
      env_production: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
}
```

编写 `start-nuxt.sh` 脚本

```bash
touch start-nuxt.sh
```

```shell
#!/bin/bash

echo "pm2 starting"

pm2 start ecosystem.config.js --env production

echo 'pm2 started'
```

`portal` 目录文件结构

```
├── ecosystem.config.js
├── .output
└── start-nuxt.sh
```

启动

```bash
sh start-nuxt.sh
```

停止服务

```bash
pm2 stop test-portal
```

## 可能遇到的问题

使用 pm2 部署 Nuxt3 应用时报错 `[nuxt] [request error] [unhandled] [500] The requested module 'vue' does not provide an export named 'unref'`

可能是由于本地 Node 版本过低导致，升级至 18.x 或最新版本即可

如果本地有多个 node 版本，并使用 nvm 控制版本切换。可以按照下面的步骤进行更改:

1. 可以使用 nvm use [node 版本] 切换 node 版本
2. which node 查看当前使用 node 版本的 bin 目录
3. 修改 ecosystem.config.js 的 interpreter

这时，pm2 `exec_mode` 只能使用 fork 模式，并且只能由单核运行。
