---
title: 申请https证书并部署至nginx服务器
tags: [服务器, Nginx]
categories: [代码人生, Linux/运维]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - "[阿里云服务器 nginx 上部署 SSL 证书实现 https 访问](https://xmuli.tech/posts/70a6b02f/)"
  - "[在Nginx或Tengine服务器上安装证书](https://help.aliyun.com/document_detail/98728.htm?spm=a2c4g.11186623.0.0.22fc4af0YHDew5)"
date: 2022-12-15 15:01:33
description:
cover:
banner:
---

申请免费的 https 证书并部署至 nginx 服务

<!-- more -->

在部署了本站后，每天看着浏览器左侧的红色锁头都不是很爽，正好借着这次机会分享一下在阿里云申请 https 证书并部署至阿里云 ubuntu 服务器的过程。

## 申请

在阿里云网站查找 ssl 证书，点击点击 `选购ssl证书`

![](https://whbbit-blog.oss-cn-beijing.aliyuncs.com/202212151507911.png)

找到免费证书
![](https://whbbit-blog.oss-cn-beijing.aliyuncs.com/202212151509202.png)

如果你没有就点击购买
![](https://whbbit-blog.oss-cn-beijing.aliyuncs.com/202212151510721.png)

购买成功后，点击创建证书，点击证书申请，在弹出的抽屉里填写你的网站信息
![](https://whbbit-blog.oss-cn-beijing.aliyuncs.com/202212151513404.png)

点击下一步，按照提示完成 DNS 解析。

验证成功后，注意查收阿里云短信/邮箱发送的 ssl 证书申请成功提示。

成功后，点击下载对应服务的 ssl 证书文件。

![](https://whbbit-blog.oss-cn-beijing.aliyuncs.com/202212151516102.png)

将下载好的压缩包在本地解压待用。

## 使用 ssh 工具链接服务器，上传文件至服务器

**这一步需要传输文件**，你可以和我一样使用 vscode 的 ssh 插件

以下是插件列表

- ms-vscode-remote.remote-ssh
- ms-vscode-remote.remote-ssh-edit
- ms-vscode.remote-explorer
- Natizyskunk.sftp

安装好后，点击侧边栏出现的图标，添加服务器即可。

将解压好的文件夹里的文件

- xxx.key
- xxx.pem

上传至服务器 `/usr/share/nginx/cert` 文件夹中，若无 cert 文件，手动创建该文件夹即可。

**这里可能会遇到权限问题，需要重新输入密码，需要关注 vscode 弹出的输入框**

## 配置 nginx

进入对应 nginx 配置文件中

```bash
vim /etc/nginx/sites-available/default
```

找到对应站点配置项，我这里是将 www.whbbit.cn 和 whbbit.cn 域名跳转至 https 服务

```nginx
server {
  listen 80;
  server_name www.whbbit.cn whbbit.cn;
  return https://$server_name$request_uri;
}
```

配置 ssl 证书

```nginx
server {
  listen 443 ssl;
  server_name www; # 证书申请时的域名

  # 这段是阿里云官网上粘贴的，注意ssl_certificate和ssl_certificate_key最好写你上传ssl证书文件的绝对路径
  root html;
  index index.html;
  ssl_certificate /usr/share/nginx/cert/9001033_www.whbbit.cn.pem;
  ssl_certificate_key /usr/share/nginx/cert/9001033_www.whbbit.cn.key;
  ssl_session_timeout 5m;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3; #表示使用的TLS协议的类型，您需要自行评估是否配置TLSv1.1协议。
  ssl_prefer_server_ciphers on;

  location / {
    root /xxxx; # 你网站静态文件所在目录
    index index.html index.htm;
  }
}
```

配置完成后，运行

```
nginx -t
```

查看配置项是否有问题。没有报错后运行

```
nginx -s reload
```

重新启动 ngin 服务。这时，在浏览器输入 `whbbit.cn` 或 `www.whbbit.cn` 会自动跳转至 `https://www,whbbit.cn`。 而且浏览器地址栏中的红色锁头编程了灰色。

## 在配置过程中遇到的坑

1. 阿里云官网教程在不懂 luinx 系统的我来说比较晦涩且有一些配置项和 ubuntu 服务器有区别，在对照学习时需要注意系统是否和官网的一致
2. 第三方博客省去了部分的配置细节，具体也需要对照官方教程进行补全。

> 目前为止，按照我这样配置重复配置另一个域名也没有遇到问题。您可以自己去试一下，我所使用的服务器如下

```
系统  阿里云 ubuntu 20.04
```
