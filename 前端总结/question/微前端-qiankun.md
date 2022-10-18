# 以主应用和多个子应用组成，需要注意的是样式隔离和css隔离，各个应用间相互不影响
## 实现css隔离
    css-in-js：css样式也可以像一个组件一样，可以传入参数动态生成，https://zhuanlan.zhihu.com/p/103522819
    Shadow DOM: 可以将一个隐藏的、独立的 DOM 附加到一个元素上，https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM
    css module
## 实现js隔离
    不同的模块会操作全局对象（window），如果不进行js隔离，会导致错误
    单个模块：存在两个模块，将两个模块的值存储下来，用到那个模块就将这个模块的值赋到当前使用的对象上
    多个模块：es6 Proxy
## single-spa
    qiankun是基于single-spa实现
    主应用需要注册子应用，子应用要导出三个方法，bootstrap、mount和unmount
## 应用间通信
    action通信