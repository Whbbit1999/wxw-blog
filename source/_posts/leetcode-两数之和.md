---
title: leetcode 两数之和
tags: [JavaScript, 算法, leetcode]
categories: [代码人生]
poster:
  topic: #标题上方的小字
  headline: leetcode 两数之和 #大标题
  caption: #标题下方的小字
  color: #标题颜色
date: 2024-05-18 11:00:25
description:
cover: /assets/posts/algorithm.png
banner: /assets/posts/algorithm.png
references:
---

## 题目描述

{% mark 简单 color:green %}
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

### 示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

### 示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]

### 示例 3：

输入：nums = [3,3], target = 6
输出：[0,1]

### 提示：

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
只会存在一个有效答案

**跳转至当前题目 {% button leetcode https://leetcode.cn/problems/two-sum/description/ %}**

## 解题思路：

利用 Map 存储数组中的元素和索引，遍历数组，对于每个元素，计算它的补数（target - nums[i]），如果 Map 中存在这个补数，则找到了两个元素的和，返回它们的索引；否则，将当前元素和它的索引存入 Map。

{% hashtag 时间复杂度：O(n) %}
{% hashtag 空间复杂度：O(n)%}

## 代码如下：

```js
const towSum = (nums, target) => {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (map.has(complement)) {
      return [map.get(complement), i]
    } else {
      map.set(nums[i], i)
    }
  }
  return []
}
```
