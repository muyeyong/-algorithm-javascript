## Esmodule 和 commonjs的区别

Esmodule:

​	 export、 export default 和 import {}  、import obj

​	 普通导入导出需要确定的名字或使用{}，默认导入导出名称随意

CommonJs:

​	module.exports

​	require

区别：

​	esmodule 输出的是值的应用，emodule不能直接修改引用值；commonjs输出的是值的拷贝

​	commonjs同步加载，esmodule异步加载，可能涉及同步请求

​	cjs运行是加载，esm编译时加载，esm是静态的

## exports 和 module.exports 区别

​	exports 可以同来导出键值对象，module.exports 可以导出任意值

​	分析：

​		node最终导出的是module.exports对象，但是exports与module.exports共用一个对象，所以exports导出键值对象是有效的，但是exports导出一个新的对象就会无效。

## 非阻塞I/O 和 事件驱动

```js
fs.readFile('1.txt', () => {

}) 非阻塞io
fs.readFileSync('1.txt', () => {
  
}) 阻塞io
```

非阻塞io是立即完成的，同时发射这个事件并写好这个事件的处理函数，底层io处理完之后并执行这个事件

libuv是由线程池和事件循环组成的，负责所有io任务的分发和执行，处理非阻塞io会由一个线程处理，处理完之后放入事件循环等待被执行

## 事件循环

node事件循环分为六个阶段

​	timer -- 处理setTimeout setInterval 的回调

​	I/O callback -- 处理i/o callback回调

​	idle -- node内部

​	pull -- 查看timer里面是否还存在未处理的回调，处理新的i/o

​	check -- 处理 setImmediate回调

​	close callback -- 处理socket close回调

node每个阶段都存在各自的任务队列，包含宏任务和微任务，在node11版本执行完一个宏任务就立刻执行所有微任务，node10及以下版本执行完所有宏任务才会执行微任务。

process.nextTick可以类比setAnimationFram，会在下一次循环之前执行

## node的多进程架构

主从模式（Master-Worker）： 一个主进程下多个子进程

## 创建子进程的方法

spawn: 启动子程序执行命令

exec：启动子程序执行命令，可以在指定超时时间

execFile：执行文件

fork：与spawn类似，执行文件

## spawb stdion选项

stdio可以用来指定子进程的标准输入和输出，默认情况下子进程的stdIn stdout 和 stderr全部重定向到childProcess对象上

## 守护进程

监听子进程的exit事件，如果杀死了就重新启动

## 确认子进程还活着

 怎么与子进程通信？

进程通信

## 网络相关的

### 创建简单的http服务

```js
http.createServer((request, response) => {
  // 处理逻辑
}).listen(3000)
```

### 使用express 中间件

```js
//express 中间件可以进入另一段逻辑，但是不支持异步
const express = require('express')
const app = express()
app.get((req, res, next) => {
  next() // 进入第二段逻辑，执行完回到这里
}, function(req, res) {
  // 第二段逻辑
}, function(){
  // 第三段逻辑
})
app.listen(3000)
```

### 使用koa 中间件

```js
// koa 中间件支持异步 async await
// koa 需要new ==> new Koa()，express只需要调用 ==> express()

const Koa = require('koa')
const app = new Koa()
app.use(async(ctx, next) => { // response request 全部挂载在ctx上
  await xxx
})
app.use(async(ctx, next) => {
  await xxx
}) // 使用新的中间件都需要使用use
app.listen(3000)
```



