---
title: gulp压缩js文件
tags: [js, gulp, 前端工程化]
categories: [gulp]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:40:12
description:
cover:
banner:
---

## 使用 gulp 压缩 js 文件

初始化项目

```bash
npm init -y
```

安装依赖包

```bash
npm i gulp gulp-uflify gulp-rename gulp-notify
```

编写`gulpfile.js`文件

```js
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const notify = require("gulp-notify");

// 压缩js代码
function minjs() {
  return gulp
    .src("js/*.js")
    .pipe(uglify({ mangle: true, compress: true }))
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("dist/js"))
    .pipe(notify({ message: "压缩完成" }));
}

module.exports = { minjs };
```

更新 package.json script 脚本

```json
"scripts": {
	"minjs": "gulp"
}
```

使用方式：

1. 在项目根目录下创建 js 文件夹（需要压缩的文件需要放到此文件夹内）
2. 使用命令行输入 `gulp minjs`。运行成功后会在 dist/js 文件夹中生成压缩好的 js 代码并有系统级的提示

{% border 命令行 color:green %}

- `gulp-uflify` 包用于压缩 js 代码
- `gulp-rename` 用于给压缩后的文件重新命名
- `gulp-notify` 用于压缩好后进行提示（系统级提示）

{% endborder %}
