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

## 2020-02-10

### 为什么不适用iframe

​	1:全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。

​	2:每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程

### 流程

```js
//主应用注册子应用
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:7100',
    container: '#yourContainer',
    activeRule: '/yourActiveRule',
  },
  {
    name: 'vue app',
    entry: { scripts: ['//localhost:7100/main.js'] },
    container: '#yourContainer2',
    activeRule: '/yourActiveRule2',
  },
]);

start();
// activeRule： 可以通过路由切换不同的字应用，如果不与路由相关联可以手动挂载
import { loadMicroApp } from 'qiankun';

loadMicroApp({
  name: 'app',
  entry: '//localhost:7100',
  container: '#yourContainer',
});

//子应用提供相应的钩子函数
bootstrap： 只会调用一次，一般用来全局变量初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
mount：每次进入都会调用，通常我们在这里触发应用的渲染方法
unmount： 切出/卸载调用，一般用来卸载微应用实例
```

### 通信详细

#### action通信

```js
// qiankun提供initGlobalState用于全局通信
const action = initGlobalState({})
/**
	action包含三个方法： setGlobalState（设置新的全局状态，会通知订阅者触发变化） onGlobalStateChange(() => {})（注册订阅者）
		offGlobalStateChange（取消观察者函数）
*/
```

子应用也可以调用action提供的方法是应为在注册子应用的时候，将action作为props传入子应用

```js
// 主应用
registerApps([
  {
    ...
    props: { action }
  }
])

// 子应用
render(props) {
  if (props?.action) {
    // 将acton存储起来
  }
}
```

##### 总结

用过发布订阅实现，本质上还是利用全局对象处理，如果存在多个全局变量，其中某个改变了，但那些对其依赖的观察者也会调用回掉函数。

#### share通信

在主应用和子应用中通过状态管理库（redux、mobx）进行状态管理，主应用和子应用各自维护一套状态管理，如果是在微前端的环境下，主应用的管理器覆盖子应用的管理器

##### 总结

使用了状态管理器可以进行全局状态追踪

子应用有独立的运行能力

子应用无法随意更改主应用的变量

子应用无需了解主应用的状态池的细节

