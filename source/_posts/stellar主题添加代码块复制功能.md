---
title: stellar主题添加代码块复制功能
tags: [hexo]
categories: [代码人生, 静态站点]
# poster:
#   topic:
#   headline: stellar主题添加代码块复制功能
#   caption:
#   color:
references:
  - title: ""
    url: ""
date: 2023-01-31 13:07:10
description:
cover:
banner:
---

给 stellar 主题添加代码块复制功能

<!-- more -->

{% image https://whbbit-blog.oss-cn-beijing.aliyuncs.com/202301311342006.png %}

我们可以利用 hexo 的[注入器](https://hexo.io/zh-cn/api/injector)来完成这个功能

项目根目录下新建一个 `scripts` 文件，添加`codeCopy.js`文件（文件名可以随意取）。添加如下代码

> 创建的 `scripts` 文件夹中的文件会被 hexo 自动加载

```js /scripts/codeCopy.js
"use strict";

// code block copy
hexo.extend.injector.register("body_end", function () {
  return `
  <style>
    .highlight {
      position: relative;
    }
    .highlight .code .copy-btn{
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px 0.5rem;
      opacity: 0.25;
      font-weight: 700;
      color: var(--theme);
      cursor: pointer;
      transination: opacity 0.3s;
    }
    .highlight .code .copy-btn:hover{
      color: var(--text-code);
      opacity: 0.75;
    }
    .highlight .code .copy-btn.success {
      color: var(--swiper-theme-color);
      opacity: 0.75;

    }
    
  </style>
  <script>
    const codeElementArr = document.querySelectorAll('.code')
    codeElementArr.forEach(code => {
      const codeBeforeWidth = window.getComputedStyle(code, '::before').width.split('px')[0]
      const codeBeforePadding = window.getComputedStyle(code, '::before').padding.split(' ').pop().split('px')[0]
  
      // copy btn 
      const codeCopyBtn = document.createElement('div')
      codeCopyBtn.classList.add('copy-btn')
      codeCopyBtn.style.right = Number(codeBeforeWidth) + Number(codeBeforePadding) * 2 + 'px'
      codeCopyBtn.innerText = '复制代码'
      code.appendChild(codeCopyBtn)
  
      codeCopyBtn.addEventListener('click', async () => {
        const currentCodeElement = code.children[0]?.innerText
        await copyCode(currentCodeElement)


        codeCopyBtn.innerText = '复制成功'
        codeCopyBtn.classList.add('success')

        setTimeout(() => {
          codeCopyBtn.innerText = '复制代码'
          codeCopyBtn.classList.remove('success')
        },1000)
      })
    })
    
    async function copyCode(currentCode) {
      console.log(currentCode)
      console.log('复制代码')
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(currentCode)
        } catch (error) {
          // 未获得用户许可
          console.error(error)
        }
      } else {
        console.error('当前浏览器不支持此api')
      }
    }
  </script>
  `;
});
```
