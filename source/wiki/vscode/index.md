---
layout: wiki
wiki: vscode
title: vscode基础使用指南
order: 1
---

{% link https://code.visualstudio.com/ desc:true %}

## 为什么是 vscode

vscode 是微软开源的免费的文本编辑器，被广泛地在前端工作中使用。它提供了丰富的插件供人们进行代码编写和文字工作。

可以满足我们平时的工作和学习，最吸引人的是它完全免费。

## 基础配置

我们可以进行一些简单的配置来让 vscode 更加好用。在 settings.json 中可以做一些配置

```json
"editor.formatOnSave": true
```

上面这段配置表示在保存时进行代码格式化

```json
"editor.bracketPairColorization.enabled": true,
"editor.bracketPairColorization.independentColorPoolPerBracketType": true
```

上面这段配置表示开启括号对着色，可以让不同层级的括号展示不同的颜色。
