## Esmodule 和 commonjs的区别

Esmodule:

​	 export、 export default 和 import {}  、import obj

​	 普通导入导出需要确定的名字或使用{}，默认导入导出名称随意

CommonJs:

​	module.exports

​	require

区别：

​	esmodule 输出的是值的引用，esmodule不能直接修改引用值；commonjs输出的是值的拷贝

​	commonjs同步加载，esmodule异步加载，可能涉及同步请求

​	cjs运行时加载，esm编译时加载，esm是静态的

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

非阻塞io是立即完成的，同时发射这个事件并写好这个事件的处理函数，底层io处理完之后并执行这个事件的处理函数

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

process.nextTick可以类比setAnimationFrom，会在下一次循环之前执行

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

### buffer

```js
// 使用buffer进行二进制存储
// 创建buffer
Buffer.from([]) // 指定创建buffer的内容
Buffer.alloc(len) // 创建指定长度的buffer
Buffer.allocUnsafe(len) // 可能包含旧数据

// buffer读写
buffer.write(string[, offset[, length]][, encoding])
buffer.toString([encoding[, start[, end]]])

// 对于buffer的读写还是不方便，引入protocol-buffers，可以规定数据类型、初始值
// produce.proto
message Product {
  requires float price = 18
}
// index.js
const schemas = protocol(fs.readFileSync('./product.proto')) // 读取配置文件
const buffProduct = schemas.Product.encode({ price: 90 }) // 编码
schemas.Product.decode(buffProduct) // 解码

```

### 全双工 半双工 单工

```js
/* net 创建tcp连接 
	客服端： const socket = new net.Socket({})  通过scoket套接字进行连接 --> socket.connect({}) 通信 --> socket.write()
	客户端： const server = net.createServer((socket) => {
		socket.on('data', buffer => {
			//通信
		})
	})  
	server.listen(3000)
**/
// 单工-- 数据只支持在一个方向上传输 （客户端 到 服务端 ）or （服务端 到 客户端）
 
// 半双工 -- 同一时间内只能单向传输数据

// 全双工 -- 可以同时进行双向数据传输
	时序问题：发送与返回不一定对得上
  包不完整：粘包
  解决办法： 设置seq包的唯一标志， 发送前写入body的长度，放置读取body不对
```

## 模板引擎

```js
const vm = require('vm')
const context = vm.createContect({}) // 上下文
vm.runInContect('function(){}', context) // 在指定上下文中执行
```

## Graphql

```
api数据查询
```

## react前后端同构

```js
// 需要使用babel 转义react
/* 将React代码转换成字符串, 通过ReactDom.renderToString(<A />)
怎么将function 组件转换成 string，上面那个方法只能转换class组件
  如果要将function 组件使用 renderToString可以这样写 ===> renderToString(React.creteElement(App)) */

```







