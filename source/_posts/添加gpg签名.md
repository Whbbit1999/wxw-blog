---
title: 添加gpg签名
tags: [gpg签名]
categories: [代码人生]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - title: 使用 GPG 签名你的 Git Commit
    url: https://mogeko.me/posts/zh-cn/065/
  - title: 生成新 GPG 密钥
    url: https://docs.github.com/zh/authentication/managing-commit-signature-verification/generating-a-new-gpg-key
  - title: 阮一峰 GPG入门教程
    url: https://www.ruanyifeng.com/blog/2013/07/gpg.html
date: 2023-01-16 14:53:13
description:
cover:
banner:
---

最近在提交 vue-devui 组件库 pr 时，被要求添加 gpg 签名。之前对这部分没有任何了解，正好了解一下，顺便写一下关于配置 gpg 需要注意的东西和配置的完整步骤。

<!-- more -->

## 安装 gpg

```shell
brew install gpg
```

确认是否安装成功：输入`gpg -h` 后，没有报错并有 gpg 相关的帮助文档的话就安装成功了。

## 生成 gpg 密钥

1. 输入生成 gpg 密钥对的命令

```shell
gpg --full-generate-key
```

2. 提示要生成的加密类型，或者直接 enter 默认
3. 提示要生成的密钥大小，直接 enter 默认
4. 输入密钥的有效时常，直接 enter 默认（不会过期）
5. 验证是否输入正确，确认之前输入的是否是自己想要的，如果是就确认
6. 输入用户信息：按照提示输入真实姓名、邮箱（和 GitHub 绑定的邮箱）
7. 提示输入密码：在查看生成的公钥会用到
8. 命令行输入 `gpg --list-secret-keys --keyid-format=long`，展示所有生成的 gpg 密钥
9. 获取要上传至 GitHub 的密钥 id： sec rsa3072/xxx 中的 xxx 就是对应的密钥 id

```txt
sec   rsa3072/xxx 2023-01-16 [SC]
      xxx
uid                   [ 绝对 ] xxx (github use) <xxx@xx.com>
ssb   rsa3072/xxx 2023-01-16 [E]
```

10. 输入 `gpg --armor --export 3AA5C34371567BD2` 查看生成的公钥

11. 复制以 -----BEGIN PGP PUBLIC KEY BLOCK----- 开头并以 -----END PGP PUBLIC KEY BLOCK----- 结尾的 GPG 密钥。
    > 注意： 一定要将打印出的所有内容都粘贴，包括 `-----BEGIN PGP PUBLIC KEY BLOCK-----` 和 `-----END PGP PUBLIC KEY BLOCK-----`。不然添加会失败
12. 在 GitHub 中添加
    {% link https://docs.github.com/zh/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account %}

## 添加 git 处理

配置让 git 使用 gpg 进行签名

```shell
git config --global user.signingkey <密钥ID>
```

设置 git 全局使用该密钥加密 commit

```shell
git config --global commit.gpgsign true
```

设置 git 全局使用该密钥进行加密 tag

```shell
 git config --global tag.forcesignannotated true
```

## 报错处理

### 报错`gpg failed to sign the data`

使用 zsh 需要添加`export GPG_TTY=$(tty)`

1.  `sudo vi ~/.zshrc`

2.  添加配置

```txt
export GPG_TTY=$(tty)
```

3. 重新加载 zsh 配置文件 `source ~/.zshrc`

### 提交时一直报错

如果您之前设置了 pinentry 和 gpg，但它突然停止工作：
检查您的 gpg 是否有效：

```shell
echo "test" | gpg --clearsign
```

如果它说`gpg: signing failed: No pinentry`，只需重新启动 gpg 守护程序客户端，它会不时卡住：

```shell
gpgconf --kill gpg-agent
```

现在它应该可以工作了：

可以运行`echo "test" | gpg --clearsign` 先，会提示输入密码，输入密码后再次进行代码提交就 ok 了。

---

实在不行就使用 `git config --global commit.gpgsign false && git config --global tag.forcesignannotated false` 直接关闭全局 gpg 加密
