// "use strict";

// <iframe src="//player.bilibili.com/player.html?bvid=BV1VY411Q7FS" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" class="bilibili-video"> </iframe>
// bilibili iframe style
hexo.extend.injector.register("head_end", function () {
  return `
    <style>
      .bilibili-video {
        width: 100%;
        height: 500px
      }
    </style>


    `;
});
