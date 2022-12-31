"use strict";

// 百度统计和google 统计
hexo.extend.injector.register("body_end", function () {
  return `<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?31181a38d70c8faf2c5bed0d93cab07b";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
  </script>

  <script async="async" src="https://www.googletagmanager.com/gtag/js?id=G-FTR5YKFFCM"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());
    gtag('config', 'G-FTR5YKFFCM');
  </script>
  `;
});
