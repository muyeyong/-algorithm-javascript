## 对虚拟dom的理解

虚拟dom是对真实dom的映射，设计出虚拟dom的目的是为了在dom变动的情况下，修改效率、性能更高。使用虚拟dom还可以实现可中断的更新

虚拟dom === reactElement？

怎样实现可中断的更新？

****

提高开发效率： 

+ 使用js开发的时候，需要关注如何更新dom，使用react开发的时候，只需要告诉raect需要让视图处于什么状态，不必要去完成属性操作、事件处理、dom更新
+ 虚拟dom配合diff算法，可以帮助我们计算如何跟高效的更新，批量更新

跨浏览器兼容：实现自己的事件机制，抹平了浏览器的差异 ==》 合成事件？ 

跨平台兼容：跟不同的渲染器使用，可以抹平平台差异 ==》 pc：react-render 、reactNative ?



## 谈谈你对react的理解

 react 是一个ul框架，数据驱动ul更新 UI = fu(data)，通过单向数据流使ui发生变化，

开发效率更高，专注数据流驱动ui变化

****



## 怎样避免raect生命周期的坑 / react hook使用注意的地方

生命周期有哪些

hook有哪些



## React fiber 架构

fiber架构是为了解决react不能中断更新设计的，为每次更新设置固定的时间，如果在固定时间内没有完成更新，相应的fiber节点会保存

未完成的更新，使得可中断更新得以实现。diff算法？

***



问题是为了解决递归渲染

怎么解决的：

​	将fiber树的更新创建设计成一个可中断的过程，将大任务分隔成小任务，以beginWork开始，completeWork结束

+ 任务分隔

​		reconciliation 阶段：生成fiber树，是一个可以拆分的阶段

​		commit 阶段：将fibe树渲染到页面上，不能拆分

+ 分散执行

​		小任务分散到浏览器空闲的时间执行，api： requestIdleCallback---> 低优先级  requestAnimationFrame --> 高优先级

+ 优先级策略

## createElement过程

reactDom.createElemnt 会将dom对象，转变成reactElemnt对象，怎样转变的？ jsx？

***

jsx在运行时候的返回结果就是react element

## 调和阶段setState内部都干了什么 useState??

reconciler 更新的过程

粗略： setState将需要更新的任务注册到sceduler等待调度，调度 =》创建fiber节点， 等待渲染？

***



## setState



## react事务机制

reactdom启动，react-reconciler 协调 react-scheduler 和 react-render，生成新的视图

合成事件？

## react组件 和 渲染更新的过程

比如说点击这个div，触发渲染是怎样的过程： 事件传递？重新创建fiber树（对比更新，改变fiber树），交给react-render渲染

## diff算法是如何运作的

diff算法是基于fiber树实现的，在决定是否需要复用dom时使用。diff算法的过程是只对比同一层次的old fiber 和 new fiber，使用fiber节点的key和type进行对比，对比的过程分为两部分：遍历new fiber找出是否存在可复用的old fiber，第二次，将~~new fiber~~变成Map的数据结构，遍历old fiber，找出map中是否存在对于的fiber，打标记 update placement detec

***

***不是新旧fiber比较***，`fiber`对象与`ReactElement`对象相比较，给新增 移动 和删除的节点设置fiber.flags，对于删除的节点还需要将其添加到父节点的effect上去

分为两次循环：

​	 第一次遍历最长公共部分，如果key相等就复用，继续比较，key不相等就跳出遍历，如果newChildren遍历完，oldFiber剩余的打上删除标记（delection），oldFiber节点遍历完，newChildren打上新增标记（placement）

​	 第二次遍历：优先复用 oldFiber 序列中的节点，oldFiber剩余序列加入到一个map中. 目的是为了第二次循环能顺利的找到可复用节点

## 合成事件的原理

监听全部的原生事件

****



为什么需要合成事件

​	兼容性和跨平台

​	统一挂载在rootfiber上，较少内存消耗

实现：

​	监听原生事件：对齐dom元素和fiber元素

​	搜集listeners：遍历fiber树，收集所有监听本事件的listener函数

​	派发合成事件：构造合成事件，遍历listeners

## jsx语法糖的本质

对象？ reactElement对象？

***

本质就是一个对象

## 为什么react元素有一个$$typeof属性

$$typeof记录的是fiber节点的类型，div text.... 在更新的时候对不同的type进行不同的处理

****

目的是为了防止 XSS（跨站脚本攻击） 攻击。因为 Synbol 无法被序列化，所以 React 可以通过有没有 $$typeof 属性来断出当前的 element 对象是从数据库来的还是自己生成的。如果没有 $$typeof 这个属性，react 会拒绝处理该元素。

## Virtual Dom 的工作原理是什么

同virtual dom 与真实dom节点的映射，优化dom更新

****

虚拟dom的原理是通过js对象来模拟DOM节点

fiber是虚拟dom的升级

## react有哪些性能优化的手段

memo包裹组件，自定义渲染逻辑

useCallback

****

使用useMemo

在列表需要平凡改动时，使用唯一id作为key

使用css样式显示隐藏组件，而不是通过条件判断显示隐藏组件

使用suspense 和 lazy进行懒加载

## Redux实现原理解析

分为state 、dispatch、xxx  xxx，状态的变更只能通过 dispatch ---> 

***

radux的整个工作流程是单向数据流

为什么需要redux：解决非父子组件间的通信问题

redux设计理念：`Redux`是将整个应用状态存储到一个地方上称为`store`,里面保存着一个状态树`store tree`,组件可以派发(`dispatch`)行为(`action`)给`store`,而不是直接通知其他组件，组件内部通过订阅`store`中的状态`state`来刷新自己的视图

数据更改只能通过派发action，action会被reducer读取，进而根据action内容的不同对数据进行修改、生成新的state，这个state会更新到store，进而驱动视图层做出对应的改变
中间件：用来加工dispatch的工厂函数

​为什么需要中间件： 数据源到目标数据做处理

## 谈谈你对状态管理的理解

状态管理就是对数据流的管理，对于多个组件需要共享的状态，需要提升到全局的状态，某些状态只是在父子 兄弟之间使用可以通过props传入，组件间的通信有哪些？？ props  回调？？

****

flux

redux

mobox

dva：现在用的

## connect原理分析

状态绑定？

****

connect的作用是是连接react组件和redux store

原理：在原应用组件上包裹一层，是的整个应用成为Provider的子组件

## react hook

~~hook是为了解决function component不能实现数据持久化提出的~~，react hook可以分为3类： 

状态hook ： useState  useMemo useCallback useRedux  useContext

副作用hook：useEffect useLayoutEffect

组合hook：useTranstion

useProvider

hook怎样实现数据持久化? 有没有自定义实现hook？

***

为什么提出hook：组件难以复用；复杂组件变得难以理解，生命周期跟业务嵌套太深；

## 受控组件 和 非受控组件

受控组件：固定的输入保持固定的输出

非受控组件：输入对应的输出不一致

怎么使用：在拆分组件的过程中，倾向于非受控组件包裹受控组件

***

受控组件： 组件的值和值的改变都可以被控制

非受控组件： 组件自己维护了值设置和改变的流程

可以使用input举例：

```js
<input value={} onChange={}/> //受控组件，控制了input的值和其改变
<input /> //非受控组件，浏览器自定义了值和其改变
```



## 如何避免ajax数据请求重新获取

ajax全称？

重新获取是什么意思？重复发送

源头：写业务的时候注意，设置不让点击之类的

doubunce throu: 抖动 节流？

记录发送的请求，出现重复的就取消发送，怎样取消一个请求的发送

## 组件间的通信

父子 兄弟 跨级别

props ==>  回调函数 
context

## 类组件与函数组件的区别

为什么需要函数组件

类组件可以维护自身状态，函数组件不能

函数组价复用性更高

## 如何设计react组件

分析组件的功能，考虑灵活性和健壮性

灵活性：传入的参数

健壮性： 异常处理的处理

举个例子：设计一个图片预览组件，包含图片预览 、快捷操作（放大、缩小。。），对于快捷操作可能会新增，暴露事件出去，让用户自己组合，传入的可能不是图片链接，异常处理

## 组件的协调及(不)可控组件

组件间的功能、通信以及数据共享

A组件需要B组件的某些数据：共用一份数据
A组件需要B组件的某个功能：

## react-router的原理及其工作方式

工作方式： history hash ？

工作原理： 

****

hash模式是通过监听hash值的变化做出对应的渲染
存在需要重定向
history模式依赖html5 History API，主要依赖pushState 和 replaceState，两个都会更新url，但不会刷新页面，刷新页面的时候，会出现404的原因是，浏览器会把整个url当做一个静态资源区访问，这里就需要后台配置，当资源不

## react17带来了那些改变

concurrent模式，支持可中断更新

hook

***

重构jsx转换逻辑，不需要主动引入react

事件系统重构，放弃document做事件中心管控，使用rootFiber（应用根节点）；放弃事件池，问题出现在事件处理函数执行完毕的时候，对应的合成事件对象内部的所有属性都会被置空，意味着事件逻辑执行完毕，我们就拿不到事件对象了。

lane模型的引入，之前使用的是expirationTime来描述任务优先级

## react18带来了那些改变



## 怎么判断一个组件是function component 还是 class component

React 会顺着原型链检查`isReactComponent`这个属性

https://luckyoneday.github.io/post/1-translate-tell-class-from-function/
