[TOC]

# 需求
缓存组件状态

# 为什么这么实现
[react/issues/12039](https://github.com/facebook/react/issues/12039)。

首先在这个`issue`里有人希望官方提供一个类似`vue`的`keep-alive`组件。

不过被官方人员否决了，理由是他们认为这个功能并不是特别公用，使用场景不够广泛。如果想要实现缓存效果，他提供了两个方案：
1. 通过`display`控制组件显示，这种方案的缺点是不能展示动画效果、对于副作用处理能力不足【比如移除一些事件监听器】
2. 通过数据进行控制，利用mobx、redux或其他数据管理方案将数据缓存和读取，这种方案的缺点是控制会比较麻烦，我们需要控制的数据除了传递给后端的数据，也包括前端的状态展示数据，有些数据是仅作为前端状态存在的。我们使用这种方案需要自己读取和缓存各类数据，相对麻烦一些，而且将一些前端状态提升到全局中也有些奇怪。

# 使用说明
## 无副作用
- 最外层使用`KeepAliveScope`组件【整个应用中只需要包裹一次】
- 需要进行缓存的组件使用`KeepAlive`包括，并提供全局唯一的`cacheKey`

用法示例：
```js
<KeepAliveScope>
    <KeepAlive cacheKey='test'>
        <Test/>
    </KeepAlive>
</KeepAliveScope>
```

## 处理副作用
使用`<KeepAlive>`组件时，销毁`<KeepAlive>`时其子组件并不会被销毁，所以不能按预期执行`mount`、`unmount`时的副作用。

关于`useKeepEffect`，它提供了类似装载和卸载时的副作用执行能力，不过实际上，说是**启用**和**关闭**缓存组件可能更合适一些。

用法示例：
```js
useKeepEffect(()=>{
    console.log(`useKeepEffect，Active！闭包值为${value}`);
    return () => {
        console.log(`useKeepEffect，unActive！闭包值为${value}`)
    }
})
```
