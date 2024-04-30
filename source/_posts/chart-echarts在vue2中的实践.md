---
title: ECharts 在 vue2 中的实践
tags: []
categories: []
poster:
  topic: #标题上方的小字
  headline: ECharts 在 vue2 中的实践 #大标题
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-04-16 20:02:27
description:
cover: /assets/posts/chart.jpg
banner: /assets/posts/chart.jpg
references:
---

封装一个 ECharts 容器组件，在使用时可以直接传递一个 options 对象，在组件内部自动初始化基础配置和监听图表大小变化、图表数据变化后自动重新渲染。

## 封装 ECharts 容器组件

**监听图表大小变化使用了 ResizeObserver 函数监听容器大小变化，变化时调用 chart.resize() 重新渲染图表。**

{% folding child:codeblock open:true color:green 监听图表大小变化的代码 %}

```js
// 监听容器大小变化，实现图表自适应
const resizeObserver = new ResizeObserver((entries) => {
  console.log(entries, "容器大小变化")
  this.chart.resize()
})
resizeObserver.observe(this.$refs.container)
```

{% endfolding %}

{% folding child:codeblock open:false color:blue 容器组件完整代码 %}

防抖节流函数

```js DebounceThrottle.js
// 函数防抖
function debounce(fn, wait = 500) {
  let timeout = null
  return function () {
    var args = arguments
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

// 函数节流
function throttle(fn, delay = 500) {
  var lastTime
  var timer
  return function () {
    var args = arguments
    // 记录当前函数触发的时间
    var nowTime = Date.now()
    if (lastTime && nowTime - lastTime < delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        // 记录上一次函数触发的时间
        lastTime = nowTime
      }, delay)
    } else {
      lastTime = nowTime
      fn.apply(this, args)
    }
  }
}
export { debounce, throttle }
```

```html ChartContainer.vue
<template>
  <div class="container" ref="container"></div>
</template>

<script>
  import * as echarts from "echarts"
  import { SVGRenderer, CanvasRenderer } from "echarts/renderers"
  import { debounce } from "./utils/DebounceThrottle.js"

  echarts.use([SVGRenderer, CanvasRenderer])

  export default {
    data() {
      return {
        chart: null,
        resizeObserver: null,
      }
    },
    props: {
      options: {
        type: Object,
        default: () => {},
        required: true,
      },
      render: {
        type: String,
        default: "canvas",
        required: false,
        validator(type) {
          return ["canvas", "svg"].includes(type)
        },
      },
    },
    watch: {
      options: {
        handler(newOptions) {
          console.log("options update")
          this.chart.setOption(newOptions)
        },
        deep: true,
      },
    },
    methods: {},
    mounted() {
      this.chart = echarts.init(this.$refs.container, null, {
        render: this.render,
        locale: "ZH",
        useDirtyRect: true,
      })
      this.chart.setOption(this.options)

      // 监听容器大小变化，实现图表自适应
      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(
          debounce((entries) => {
            console.log(entries, "容器大小变化")
            this.chart.resize()
          })
        )
        this.resizeObserver.observe(this.$refs.container)
      }
    },
    beforeDestroy() {
      console.log("销毁")
      if (this.chart) {
        this.chart.dispose()
      }
      if (window.ResizeObserver && this.resizeObserver) {
        this.resizeObserver.unobserve(this.$refs.container)
      }
    },
  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
  }
</style>
```

{% endfolding %}

## 使用 ECharts 容器组件

组件内部监听外部传入数据变化，变化后使用 watch 更新 options。

{% folding child:codeblock open:false color:blue 圆环图表示例代码 %}

```html
<template>
  <ChartContainer :options="options" />
</template>

<script>
  import ChartContainer from "./ChartContainer.vue"
  export default {
    components: {
      ChartContainer,
    },
    props: {
      pData: {
        type: Array,
        default: [],
        required: false,
      },
    },
    data() {
      return {
        options: {},
      }
    },
    watch: {
      pData: {
        handler() {
          this.options = this.barChartOptions()
        },
        immediate: true,
      },
    },
    methods: {
      barChartOptions() {
        const data = this.pData.map((item) => {
          return {
            value: item.fieldCountNum,
            name: item.fieldName,
          }
        })
        return {
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "bottom",
            left: "center",
          },
          series: [
            {
              type: "pie",
              radius: ["35%", "60%"],
              padAngle: 3,
              itemStyle: {
                borderRadius: 5,
              },
              labelLine: {
                show: true,
              },
              data,
            },
          ],
        }
      },
    },
  }
</script>
```

{% endfolding %}
