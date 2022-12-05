---
title: vue3响应式系统
tags: []
categories: []
poster:
  topic: 标题上方的小字
  headline: 大标题
  caption: 标题下方的小字
  color: 标题颜色
date: 2022-12-04 15:43:03
description:
cover:
banner:
---

跟着尤大实现一下 vue3 的响应式系统

<!-- more -->

# Vue.js

[官网地址(中文)](https://cn.vuejs.org/)

## 响应式

```js
let activeEffect;
class Dep {
  subscribers = new Set();

  define() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach((effect) => {
      effect();
    });
  }
}

function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

let targetMap = new WeakMap();
function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}
const reactiveHandlers = {
  get(target, key, receiver) {
    const dep = getDep(target, key);
    dep.define();
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    const dep = getDep(target, key);
    const result = Reflect.set(target, key, value, receiver);
    dep.notify();
    return result;
  },
};
function reactive(raw) {
  return new Proxy(raw, reactiveHandlers);
}

// 使用
const state = reactive({
  count: 0,
});
watchEffect(() => {
  console.log(state.count);
});
state.count++;
```

## 虚拟 dom / 渲染

```html
<style>
  .red {
    color: red;
  }
  .green {
    color: green;
  }
</style>

<div id="app"></div>

<script>
  function h(tag, props, children) {
    return { tag, props, children };
  }

  function mount(vnode, container) {
    const el = (vnode.el = document.createElement(vnode.tag));
    // props
    if (vnode.props) {
      for (const key in vnode.props) {
        const value = vnode.props[key];
        el.setAttribute(key, value);
      }
    }
    // children
    if (vnode.children) {
      if (typeof vnode.children === "string") {
        el.textContent = vnode.children;
      } else {
        vnode.children.forEach((child) => {
          mount(child, el);
        });
      }
    }
    container.appendChild(el);
  }

  const vdom = h("div", { id: "hello", class: "red" }, [
    h("span", null, "hello"),
  ]);

  mount(vdom, document.getElementById("app"));

  function patch(n1, n2) {
    if (n1.tag === n2.tag) {
      const el = (n2.el = n1.el);
      // props
      const oldProps = n1.props || {};
      const newProps = n2.props || {};

      for (const key in newProps) {
        const oldVal = oldProps[key];
        const newVal = newProps[key];
        if (newVal !== oldVal) {
          el.setAttribute(key, newVal);
        }
      }

      for (const key in oldProps) {
        if (!(key in newProps)) {
          el.removeAttribute(key);
        }
      }

      // children
      const oldChildren = n1.children;
      const newChildren = n2.children;
      if (typeof newChildren === "string") {
        if (typeof oldChildren === "string") {
          if (newChildren !== oldChildren) {
            el.textContent = newChildren;
          }
        } else {
          el.textContent = newChildren;
        }
      } else {
        if (typeof oldChildren === "string") {
          el.innerHTML = "";
          newChildren.forEach((child) => {
            mount(child, el);
          });
        } else {
          const commonLength = Math.min(oldChildren.length, newChildren.length);
          for (let i = 0; i < commonLength; i++) {
            patch(oldChildren[i], newChildren[i]);
          }
          if (newChildren.length > oldChildren.length) {
            newChildren.slice(oldChildren.length).forEach((child) => {
              mount(child, el);
            });
          }
          if (newChildren.length < oldChildren.length) {
            oldChildren.slice(newChildren.length).forEach((child) => {
              el.removeChild(child.el);
            });
          }
        }
      }
    } else {
      // replace
    }
  }

  const vdom2 = h("div", { id: "hello", class: "green" }, [
    h("span", null, "change!"),
  ]);
  patch(vdom, vdom2);
</script>
```

## 两者结合组成 mini-Vue

```html
<div id="app"></div>

<script>
  function h(tag, props, children) {
    return { tag, props, children };
  }

  function mount(vnode, container) {
    const el = (vnode.el = document.createElement(vnode.tag));
    // props
    if (vnode.props) {
      for (const key in vnode.props) {
        const value = vnode.props[key];
        if (key.startsWith("on")) {
          el.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
          el.setAttribute(key, value);
        }
      }
    }
    // children
    if (vnode.children) {
      if (typeof vnode.children === "string") {
        el.textContent = vnode.children;
      } else {
        vnode.children.forEach((child) => {
          mount(child, el);
        });
      }
    }
    container.appendChild(el);
  }

  function patch(n1, n2) {
    if (n1.tag === n2.tag) {
      const el = (n2.el = n1.el);
      // props
      const oldProps = n1.props || {};
      const newProps = n2.props || {};

      for (const key in newProps) {
        const oldVal = oldProps[key];
        const newVal = newProps[key];
        if (newVal !== oldVal) {
          el.setAttribute(key, newVal);
        }
      }

      for (const key in oldProps) {
        if (!(key in newProps)) {
          el.removeAttribute(key);
        }
      }

      // children
      const oldChildren = n1.children;
      const newChildren = n2.children;
      if (typeof newChildren === "string") {
        if (typeof oldChildren === "string") {
          if (newChildren !== oldChildren) {
            el.textContent = newChildren;
          }
        } else {
          el.textContent = newChildren;
        }
      } else {
        if (typeof oldChildren === "string") {
          el.innerHTML = "";
          newChildren.forEach((child) => {
            mount(child, el);
          });
        } else {
          const commonLength = Math.min(oldChildren.length, newChildren.length);
          for (let i = 0; i < commonLength; i++) {
            patch(oldChildren[i], newChildren[i]);
          }
          if (newChildren.length > oldChildren.length) {
            newChildren.slice(oldChildren.length).forEach((child) => {
              mount(child, el);
            });
          }
          if (newChildren.length < oldChildren.length) {
            oldChildren.slice(newChildren.length).forEach((child) => {
              el.removeChild(child.el);
            });
          }
        }
      }
    } else {
      // replace
    }
  }

  // reactive
  let activeEffect;
  class Dep {
    subscribers = new Set();

    depend() {
      if (activeEffect) {
        this.subscribers.add(activeEffect);
      }
    }

    notify() {
      this.subscribers.forEach((effect) => {
        effect();
      });
    }
  }

  function watchEffect(effect) {
    activeEffect = effect;
    effect();
    activeEffect = null;
  }

  const targetMap = new WeakMap();
  function getDep(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      depsMap = new Map();
      targetMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);
    if (!dep) {
      dep = new Dep();
      depsMap.set(key, dep);
    }
    return dep;
  }
  const reactiveHandlers = {
    get(target, key, receiver) {
      const dep = getDep(target, key);
      dep.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const dep = getDep(target, key);
      const result = Reflect.set(target, key, value, receiver);
      dep.notify();
      return result;
    },
  };
  function reactive(raw) {
    return new Proxy(raw, reactiveHandlers);
  }

  const App = {
    data: reactive({
      count: 22,
    }),
    render() {
      return h(
        "div",
        {
          onClick: () => {
            this.data.count++;
          },
        },
        String(this.data.count)
      );
    },
  };
  function mountApp(component, container) {
    let isMounted = false;
    let prevVdom;
    watchEffect(() => {
      if (!isMounted) {
        prevVdom = component.render();
        mount(prevVdom, container);
        isMounted = true;
      } else {
        const newVdom = component.render();
        patch(prevVdom, newVdom);
        prevVdom = newVdom;
      }
    });
  }
  mountApp(App, document.getElementById("app"));
</script>
```
