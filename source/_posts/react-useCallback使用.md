---
title: react useCallback使用
tags: [react]
categories: [代码人生, 前端技术]
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
references:
  - title: "react useCallback"
    url: "https://beta.reactjs.org/reference/react/useCallback#usecallback"
date: 2023-02-09 18:11:51
description:
cover:
banner:
---

近日在写 React 轮播图组件时遇到自动轮播的问题，在多方请教后，使用 useCallback 解决

<!-- more -->

轮播图组建需要自动轮播，我想到了使用 setTimeout 来解决 setInterval 可能越来越快的问题。心里想着：这我还不轻松拿下{% emoji blobcat blobcatfingerguns %}？一番奋战后于是就有了以下代码

```tsx
const Swiper: React.FC<SwiperProps> = (props) => {
  const {
    autoplay,
    duration,
  } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>();
  const childrenLength = React.Children.count(children);

  function next() {
    if (currentIndex > childrenLength - 2) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prev() {
    if (currentIndex <= 0) {
      setCurrentIndex(childrenLength - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  // TODO autoplay
  function autoPlay() {
    if (autoplay) {
      Array(React.Children.count(children))
        .fill(0)
        .forEach(() => {
          return new Promise((resolve) => {
            const timerId = setTimeout(() => {
              next();
            }, duration);
            setTimer(timerId);
            resolve(true);
          });
        });
    }
  }

  useEffect(() => {
    autoPlay(); // error
    return () => {
      if (autoplay) clearTimeout(timer);
    };
  }, [timer, currentIndex, autoplay]);

  return (
    ...组建内容
  );
};

Swiper.defaultProps = {
  ...
};

export default Swiper;
```

{% note 报错 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render%}
这时会报错且页面不能加载（报错详情见上文）{% emoji blobcat blobcat0_0 %}。在我询问了群里的大佬后，得知有一个 useCallback 貌似可以解决我的问题。

{% image /assets/posts/7721675935071_.pic.jpg %}

于是按着大佬的思路，我做了如下改造:

使用 useCallback 将 next 和 autoPlay 进行了一次包装。

> 为什么要使用 useCallback 将 next 函数也进行改造呢？
> {% note 警告 不使用 useCallback 将 next 进行包裹会有如下报错： Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render %}

```tsx
 const next = useCallback(() => {
    if (currentIndex > childrenLength - 2) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }
  }, [currentIndex, childrenLength]);

  useEffect(() => {
    // autoPlay();  // error
  const autoPlay = useCallback(() => {
    const timer = setTimeout(() => {
      next();
      autoPlay();
    }, duration);

    return () => {
      if (autoplay) clearTimeout(timer);
    };
  }, [timer, currentIndex, autoplay]);
  }, [duration, next, autoplay]);

  useEffect(() => {
    if (autoplay) {
      autoPlay();
    }
  }, [autoplay, autoPlay]);
```

嘿嘿，有问题不能自己死磕，还是得问问{% emoji blobcat ablobcatrainbow %}！
