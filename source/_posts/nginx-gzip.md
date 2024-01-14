---
title: Nginx gzip配置
# cover: code
# banner: code
categories: [代码人生, Linux/运维]
date: 2022-12-03
tag: [Nginx, Linux, 服务器]
references:
---

想让网站访问快一些吗？可以试试这个

<!-- more -->

## 参数

| 名称              | 默认配置                     | 作用域                              | 作用                                                                                                                                                 |
| ----------------- | ---------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| gzip              | gzip: off                    | http\server\location\if in location | 设置是否开启对后端响应的 gzip 压缩，然后返回压缩内容给前端                                                                                           |
| gzip_types        | gzip_types text/html;        | http\server\location                | 指定哪些文件启用 gzip 压缩                                                                                                                           |
| gzip_comp_level   | gzip_comp_level 1;           | http\ server\ location              | 指定 gzip 压缩的级别，默认为 1，该值可设置的范围是 1-9，1 为最小化压缩(处理速度快),9 为最大化压缩(处理速度慢)，数字越大压缩的越好，也越占用 CPU 时间 |
| gzip_min_length   | gzip_min_length 20;          | http, server, location              | 设定进行 gzip 压缩的阈值，当后端 response 的 Content-Length 大小小于该值则不进行 gzip 压缩                                                           |
| gzip_http_version | gzip_http_version 1.1;       | http, server, location              | 设定进行 gzip 压缩的最小 http 版本                                                                                                                   |
| gzip_proxied      | gzip_proxied off;            | http, server, location              | 根据 request 或响应的相关 header 的值来决定是否进行 gzip                                                                                             |
| gzip_static       | gzip_static off;             | http, server, location              | 开启之后，接到(静态文件)请求会到 url 相同的路径的文件系统去找扩展名为".gz"的文件，如果存在直接把它发送出去，如果不存在，则进行 gzip 压缩，再发送出去 |
| gzip_disable      |                              | http, server, location              | 正则匹配 User-Agent 中的值，匹配上则不进行 gzip                                                                                                      |
| gzip_buffers      | gzip_buffers 32 4k 或 16 8k; | http, server, location              | 设置用于压缩后端 response 的 buffer 的数量和每个的大小，默认每个 buffer 大小为一个内存页，根据平台不同可能是 4k 或 8k                                |

## 配置文件示例

> gzip 可以在 http, server, location 中和配置，配置到 http 下是全局配置，只要是使用当前 nginx 服务器的站点都会开启 gzip

这里是 `nginx.conf`配置文件里的设置，你可以根据需求把对应的参数注释去掉

```nginx
http {
  ##
  # Gzip Settings
  ##

  gzip on;
  # gzip_vary on;
  # gzip_proxied any;
  # gzip_comp_level 6;
  # gzip_buffers 16 8k;
  # gzip_http_version 1.1;
  # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

下面是`doc.whbbit.cn`的配置

```nginx
http {
  ##
  # Gzip Settings
  ##

  gzip on;
  # gzip_vary on;
  # gzip_proxied any;
  gzip_comp_level 6;
  # gzip_buffers 16 8k;
  # gzip_http_version 1.1;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

{% note color:cyan 查看配置文件是否正确： 可以使用`nginx -t` 查看配置文件是否正确  %}
