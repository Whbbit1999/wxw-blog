"use strict"

// 百度统计和google 统计
hexo.extend.injector.register("body_end", function () {
  return `
  <script async="async" src="https://www.googletagmanager.com/gtag/js?id=G-FTR5YKFFCM"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());
    gtag('config', 'G-FTR5YKFFCM');
  </script>
  `
})
