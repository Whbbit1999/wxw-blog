---
menu_id: friends
beaudar:
  "issue-term": "友链"
---

{% banner 赛博好友 bg:/assets/more/friends-banner.jpg %}
{% navbar active:/about/ [留言](#comments)%}
{% endbanner %}

{% quot 各位大佬的博客 el:h2 %}
{% friends friends %}

{% quot 来自GitHub的朋友 el:h2 %}

可以去[友链](https://github.com/Whbbit1999/wxw-blog-friends/issues/new/choose)自助添加

{% friends api:https://raw.githubusercontent.com/Whbbit1999/friends/output/v2/data.json %}
