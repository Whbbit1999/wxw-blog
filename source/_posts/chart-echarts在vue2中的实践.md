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

容器组件代码如下：

```html ChartContainer.vue
<template>
  <div class="container" ref="container"></div>
</template>

<script>
  import * as echarts from "echarts"
  import { SVGRenderer, CanvasRenderer } from "echarts/renderers"
  echarts.use([SVGRenderer, CanvasRenderer])

  export default {
    data() {
      return {
        chart: null,
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
      const resizeObserver = new ResizeObserver((entries) => {
        console.log(entries, "容器大小变化")
        this.chart.resize()
      })
      resizeObserver.observe(this.$refs.container)
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

## 使用 ECharts 容器组件

组件内部监听外部传入数据变化，变化后使用 watch 更新 options。

圆环图表示例代码如下：

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
