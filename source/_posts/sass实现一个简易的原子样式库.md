---
title: sass实现一个简易的原子样式库
tags: []
categories: []
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 16:00:20
description:
cover:
banner:
---

## \_variables.scss

```scss
$colors: (
  "white": #ffffff,
  "primary": #367ee8,
  "primary-light": #e9f0ff,
  "bg": #f3f6fd,
  "gray": #ccc,
  "gray-sm-dark": #777,
  "gray-dark": #555,
  "black": #222,
  "success": #22c55e,
  "success-light": rgba(145, 191, 111, 0.25),
  "error": #dc2626,
  "error-light": #dc2626,
  "warning": rgb(211, 151, 33),
  "warning-light": #fff0e3,
  "gray-bg": rgb(241, 241, 241),
);
$spacing-base-size: 1rem;

$flex-jc: (
  start: flex-start,
  end: flex-end,
  center: center,
  between: space-between,
  around: space-around,
);
$flex-ai: (
  start: flex-start,
  end: flex-end,
  center: center,
  stretch: stretch,
);

// spacing
$spacing-types: (
  m: margin,
  p: padding,
);
$spacing-directions: (
  t: top,
  b: bottom,
  l: left,
  r: right,
);
$spacing-sizes: (
  0: 0,
  1: 0.25,
  2: 0.5,
  3: 1,
  4: 1.5,
  5: 3,
);

// border-radius
$radiu-sizes: (
  0: 0,
  1: 0.25,
  2: 0.5,
  3: 1,
  4: 1.5,
  5: 3,
);

$button-radius: 0.3rem;

$font-sizes: (
  "base": 1rem,
  "sm": 0.9rem,
  "xs": 0.8rem,
  "lg": 1.2rem,
);
```

## main.scss

```scss
@import "./_variables.scss";

@each $colorKey, $color in $colors {
  // 文字颜色
  .text-#{$colorKey} {
    color: $color;
  }

  // 背景色
  .bg-#{$colorKey} {
    background-color: $color;
  }
}

.bloder {
  font-weight: bolder;
}

// 文字对齐方式
@each $var in (left, center, right) {
  .text-#{$var} {
    text-align: $var !important;
  }
}

// text-overflow
.text-ellipsis {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// width, height
.w-screen {
  width: 100vw;
}
.h-screen {
  height: 100vh;
}
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}

// flex
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-1 {
  flex: 1;
}
.flex-grow-1 {
  flex-grow: 1;
}

@each $key, $value in $flex-jc {
  .jc-#{$key} {
    justify-content: $value;
  }
}
@each $key, $value in $flex-ai {
  .ai-#{$key} {
    align-items: $value;
  }
}

// m-0, mx-0
@each $typeKey, $type in $spacing-types {
  // .m-1
  @each $sizeKey, $size in $spacing-sizes {
    .#{$typeKey}-#{$sizeKey} {
      #{$type}: $size * $spacing-base-size;
    }
  }
  // .mx-1 , .my-1
  @each $sizeKey, $size in $spacing-sizes {
    .#{$typeKey}x-#{$sizeKey} {
      #{$type}-left: $size * $spacing-base-size;
      #{$type}-right: $size * $spacing-base-size;
    }
    .#{$typeKey}y-#{$sizeKey} {
      #{$type}-top: $size * $spacing-base-size;
      #{$type}-bottom: $size * $spacing-base-size;
    }
  }
  // .mt-1
  @each $directionKey, $direction in $spacing-directions {
    @each $sizeKey, $size in $spacing-sizes {
      .#{$typeKey}#{$directionKey}-#{$sizeKey} {
        #{$type}-#{$direction}: $size * $spacing-base-size;
      }
    }
  }
}

// border-radius

@each $sizeKey, $size in $radiu-sizes {
  .round-#{$sizeKey} {
    border-radius: $size * $spacing-base-size;
  }
}

// overflow
.hidden {
  overflow: hidden;
}

// border
$border-color: map-get($colors, "gray");
.border-0 {
  border: 0px !important;
}
@each $dir in (top, right, left, bottom) {
  .border-#{$dir} {
    border-#{$dir}: 1px solid $border-color;
  }
}

// shadow
.shadow-md {
  box-shadow: 0px 2rpx 2rpx 10rpx rgba(0, 0, 0, 0.02);
}

@each $key, $value in $font-sizes {
  .font-#{$key} {
    font-size: $value;
  }
}

.border-b {
  border-bottom: 1px solid map-get($map: $colors, $key: "gray");
}
```
