## MVC , MVP 和 MVVM

​	MVC：

​		视图(view)：用户界面

​		控制器(Controller)：业务逻辑

​		模型(model)：数据保存

​	通信方式：`view`传递指令到`controller`，`controller`完成业务逻辑后，要求`model`改变状态，`model`将新的数据发送到`view`，所有						的通信都是单向的

MVP：

​	将`MVC`中的`controler`改名为`presenter`，同时改变通信方向。

​	通信方式：各部分之间的通信，都是双向的。 View 与 Model 不发生联系，都通过 Presenter 传递。View 非常薄，不部署任何业务逻						辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。

MVVM：		

​	将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。唯一的区别是，它采用双向绑定（data-binding）：View的变动，自	动反映在 ViewModel，反之亦然。

### vue2.x实现双向数据绑定

​	通过数据劫持（Object.defineProperty） + 发布订阅模式实现

1. 使用Object.defineProperty劫持预定义的数据
2. 获取锚点下的html文本，例如`el: '#app'`
3. 将数据绑定到规定格式的html上，例如`{{xxx}}`
4. 使用发布订阅模式将数据跟视图双向绑定

## 生命周期

​	beforeCreate

​	created

​	beforeMount

​	mountd

​	beforeUpdate

​	updated

​	beforeDestroy

​	destroy

## nextTick

​	浏览器多进程，CPU进程跟web密切相关，CPU进程包含多个线程

​	数据改变后，页面可能没有刷新

​     MutationObserver接口提供了监视对DOM树所做更改的能力

​	页面渲染： 宏任务 > 渲染 > 宏任务 > 渲染

​	task执行优先级：

​		Promise -> MutationObserver -> setImmediate -> setTimeout

​	宏任务执行后，dom就已经更新？只是还没有渲染， 微任务就可以拿到dom