## 做出的提升
    编译阶段：
        静态提升
        diff算法优化
        事件监听缓存
        ssr优化
    使用Tree shanking 源码体积更小
    使用Proxy重写响应式
        可以监听属性新增、删除
        可以监听数组索引和length
## diff算法的优化
vue2的话使用的是双端比较，包含头头比较、尾尾比较、新头旧尾比较和旧头新尾比较
vue3的话优化了比较过程，引入了最长递增子序列，头头比较和尾尾比较之后，确定混乱的部分，将新虚拟节点在老虚拟节点的位置找出来，通过这个计算出相对位置没有变化的部分。



兄弟虚拟节点怎么连接的？

```javascript
h('div', {}, [ h('span', {}), h('span', {})])
```

​	h函数创建虚拟节点的时候就已经指定了



比较的时候只有三个指针？

​	i指向全部的头，e1指向旧尾，e2指向新尾

[参考](https://juejin.cn/post/7010594233253888013)