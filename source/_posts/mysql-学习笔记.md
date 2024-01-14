---
title: mysql 学习笔记
tags: []
categories: [代码人生, 数据库]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
date: 2023-04-07 10:47:23
description:
cover:
banner:
---

## 数据维护

### 修改表名

```sql
ALERT TABLE stu RENAME stus;

--- or
RENAME TABLE stus to stu;
```

### 修改字符集

```sql
---
CREATE table stu_bak SELECT * FROM stu;
ALERT table stu_bak charset utf8;
ALERT table stu charset gbk;
```

## 多表关联

### 一对多

### 多对一

### 多对多
