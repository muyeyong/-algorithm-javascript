# 前端总结

## 原型链及其方法

`__prop__ 属性`

`prototype 属性`

`getPrototypeof 方法`：获取参数的原型对象

`getPrototypeOf 方法`

`getOwnPropertyDescriptor 方法`

`create 方法`

`isPrototypeOf 方法`

**补充：**

​	实例对象的`__prop__`指向原型对象

​	构造函数的`prototype`指向原型对象

​	原型对象的`constructor`指向构造函数， `__proto__`指向父级原型对象

##  JS数据类型

​	基本数据类型：number sting null undefined boolean symbol  bigInt

​	引用数据类型：object --- > array date regexp math function 

​	数据类型的判断：

​		typeof: 可以判断基本数据类型 和 引用数据类型，但 typeof null === 'object'，判断引用数据类型结果全部为 ’object'，除function（判断成'function'）外

​		instanceof: 判断该对象是否由该构造函数生产，不能判断基础类型

​		Object.property.toString.call(obj): 可以判断具体的数据类型

​	数据类转换： 强制转换 隐式转换  调用顺序： toPrimitive --> valueOf --> toString

​	Symbol.toPrimitive 优先级最高，valueOf 偏运算， toString 偏显示

​		https://juejin.cn/post/6873215243804213262

## 实现深浅拷贝 

​	浅拷贝：对于基本数据类型拷贝的是其值，对于引用数据类型拷贝的是其内存中的地址

​			Object.assign()

​			扩展运算符： ...

​			concat拷贝数组： Array.concat(terget, source)

​			slice拷贝数组：Array.slice(start, end)，包含start，不包含end，返回新的数组对象，不改变原数组

​			实现浅拷贝：关键点--》判断是不是对象(typeof 排除null)    判断是数组还是对象(Object.prototype.toString.call(obj))  赋值进行浅拷贝

​	深拷贝：改变原对象拷贝对象并不会发生改变

​		 JSON.parset()  JSON.stringfy

​		实现深拷贝：关键点--》 注意：循环引用(weakMap)    不可枚举及Symbol类型的遍历(Reflect)   使用Object.create()创建新的对象

## 常见的继承方式

​	原型链继承（基于构造函数）： 

​			构造函数：new Fun，构造函数就是这个 Fun

​			原型对象：构造函数的空对象，可以通过它给构造函数添加属性和方法

​			实例：通过构造函数构建的对象

​			new的过程：

​					1、创建一个新的对象

​					2、 将对象的 `__proto__`设置成构造函数的`prototype`

​					3、执行构造函数的代码

​					4、返回这个对象

​			obj2.prototype = new obj1()，将原型对象指向继承对象的实例

​	构造函数继承（基于构造函数）：

​			 使用call为什么可以使父类的引用属性不被共享？是因为call改变了this的指向？

​			 构造函数继承不能使用原型链上的属性 和 方法

​	组合继承（基于构造函数）：

​			将原型链继承 和 构造器继承 组合起来

​			对于子类它本身原型链上的方法和属性会丢失		

​	原型式继承： 使用 Object.create()			

​	寄生式继承： 在原型式继承的基础上给子类添加额外的方法或属性

​	寄生组合式继承：

​			原型链继承可以获取父类的属性和方法（包括原型链上的），但属性会共享。

​			构造函数继承可以私有父类的属性，但不能继承原型链上的属性和方法。

​			两者组合的话会调用两次父类构造函数（ new F()、 F.call(this) ）,可以使用Object.create(F.property)优化原型链继承

​	extends：也是使用寄生组合式继承实现

## call apply bind

​	call: 传入的参数是一系列值，立即执行

​	apply: 传入的参数是一组值，立即执行

​	bind: 传入一系列值，延迟执行


## New一个对象的过程

​	1、创建一个新的对象

​	2、 将对象的 `__proto__`设置成构造函数的`prototype`

​	3、执行构造函数的代码

​	4、返回这个对象

```javascript
var o = {};
o.__proto__ = Obj.prototype;
Obj.call(o, ...args);
return o;
```

```javascript
// 升级版本
function _new(ctor, ...args) {
    if(typeof ctor !== 'function') {
      throw 'ctor must be a function';
    }
    let obj = new Object();
    obj.__proto__ = Object.create(ctor.prototype);
    let res = ctor.apply(obj,  [...args]);

    let isObject = typeof res === 'object' && res !== null;
    let isFunction = typeof res === 'function';
    return isObject || isFunction ? res : obj;
};
```

​	在构造函数里面直接指定返回值，如果返回值是对象，那么就直接返回这个对象，如果不是对象就返回new生成的对象，总结为 new 执行后总会返回一个对象，要么是实例对象，要么是return返回的指定对象

参考：https://segmentfault.com/a/1190000021683319

## 闭包

​	什么是闭包：可以使用父级的变量，函数里面嵌套函数、 高阶函数、可以访问其他函数内部变量的函数

​	闭包的好处：可以使用其他函数内部定义的变量

​	会不会造成内存泄漏：

​	为什么产生闭包：（当前环境中存在指向父级作用域链的引用）存在作用域链引用，也就是说闭包的本质是对其他函数作用域链的引用

​	闭包的表现形式：回调函数 内嵌函数   IIFE（立即执行函数==> `(function(){})()`）

​	宏任务 、 微任务？

​	解决闭包：使用块级作用域 、立即执行函数、借助额外传参

​	**补充：**

​		常见造成**内存泄漏**：

​			全局变量： window.xxx，

​			 定时器：使用完没有被清除

​			dom： dom属性	 dom元素   事件监听: 使用完没有取消监听

```javascript
var a = {}
document.getElementById('id').diyProp = a

var a = document.getElementById('id');
document.body.removeChild(a);
// 不能回收，因为存在变量a对它的引用。虽然我们用removeChild移除了但是还在对象里保存着#的引用，即DOM元素还在内存里面。
```

​				闭包：大量使用闭包可能会造成内存泄漏

​				console：输出会保持引用

​				

## JSON 方法

​	JSON.parse: 将json字符串转换为对象，可以接受两个参数`JSON.parse(text[,reviver]),reviver返回前对所得到的的对象进行操作， 解析json对象`

​	JSON.stringify: 将js对象或值转换成JSON字符串，可以接受三个参数`JSON.parse(text[,reviver]),reviver返回前对所得到的的对象进行操作， 解析json对象`

​	如果需要实现JSON.stringify 或 JSON.parse，需要考虑值的转换，分为基本数据类型和引用数据类型

​	**JSON.stringify**     输入										输出

​									number    							  'number'

​									string										string

​									boolean									'true' / 'false'

​		基本数据类型  	null										  'null'

​									undefined								'unfefined'

​									symbol									 'undefined'

​									Infinity & NaN							'null'



​									date										转换成日期格式的字符串（Date.toJSON()）

​									function								undefined

​	引用数据类型 		regexp									'{}'

​									array										string，如果里面存在undefined function symbol转换成null

​																						

​																						如果有toJSON方法就序列化toJSON方法返回值

​								普通对象object							如果存在undefined、function、symbol则全部忽略

​																						所有以symbol为属性键的值全部忽略

## 数组API

​	改变原有数组：尾部添加：push()；尾部删除：pop()；头部删除：shift()；头部添加：unshift()；

​								排序：sort() ； 删除、指定位置新增：splice()；反转：reverse()；

​								ES6： copyWithin() ；fill()

​	不改变原有数组：返回新数组：slice()；返回合并后的新数组：concat()；返回子项：将数组转换成字符串（通过连接符） join();

​								    indexOf(); lastIndexOf()

​									ES6: includes()

​	遍历：					forEach()；reduce()；reduceRight()；map()；过滤返回新数组：filter()；every()；some(); 

​									ES6：查找返回下标：findIndex()； find()；返回迭代器对象：【 enteries(); keys()；values()】

数组的构造器： 

​			字面量: []

​			Array():

​			new Array()：创建数组

​			Array.form()；将类数组转换成数组

​			Array.of()： 创建数组

​	Array() 和 Array.of()区别：

```js
Array(8) ==> [empty * 8]
Array(8, 1) ==> [8, 1]
//Array参数不同存在歧义
Array.of(8) => [9]
Array.of(8, 1) => [8 ,1]
```

## 类数组

​	常见的类数组：

​					函数里面的参数对象arguments；

​					用querySelector获得的NodeList

​					用getElementsByTagName/ClassName/Name获得的HTMLCollection

​	什么是类数组：有length属性，且length的最大值不大于2^32

​	怎么让类数组使用数组的方法： 通过Array.form()将类数组转换成数组；改变this指向： Array.prototype.sort.call()

## 数组扁平化

​	怎么实现： 递归； 取代[];

​	实现方法： 递归、reduce、	string + 正则、直接通过toString实现，对于数组来说toString类似于 join(',')

## 数组排序

​	有哪些排序方法：

​		 冒泡排序： n^2，每一轮确定一项的位置

​		选择排序： n*logn，选出无序项里面的最值

​		快速排序:	选取一个参考值，将小于参考值的项放到参考值左边，将大于等于参考值的放到参考值右边，直到有序

​		归并排序：不断将数组折中，直到只有一项再合并排序

​		堆排序：	建树，大根堆、小根堆

​		插入排序：在有序的序列中插入无序的项

​		桶排序：？

​		基数排序：？

​		计数排序：？

​	时间复杂度：

​	空间复杂度：

## 异步编程

​	同步编程和异步编程的区别： 异步不阻塞进程，同步阻塞进程

​	异步代码编程方式： 回调函数；Promise；Generator（配个yield使用，返回迭代器）；async/await

​	**Promise**：

​			promise是一个容器保存着未来才会结束的事件

​			**内部状态：**pending 、rejected、 fulfilled

​			**造成回调地狱的原因**：多层嵌套、每个任务存在两个可能性需要单独判断

​			**promise解决回调地狱：**

​								解决多层嵌套：多层嵌套就是层级太多，主要是把它的返回值和之后的逻辑抽离出来，返回值穿透 和 回调函数延迟绑															定，返回值穿透就是将回调函数的结果传递出来，不需要在里面继续写逻辑，如果传递出来的值还是															一个promise就可以继续绑定回调函数，这就是延迟绑定。

​								解决任务的两个可能性：统一捕获错误，reject返回的错误会一直冒泡上传

​			**promise静态方法：**

​								Promise.resolve()：用于将非Promise实例包装成Promise实例返回且状态为fulfilled，如果参数是一个Promise对																	象，就直接返回，如果不是Promise对象就包装成Promise对象返回

```javascript
Promise.resolve('foo')
// 等价于
new Promise(resovle=> resolve('foo'))
```

​								Promise.reject()：类似于`Promise.reject()`，但返回Promise的状态为reject	

​	    						Promise.all()：接收一组Promise，多个Promise同时操作，当所有Promise成功时按按顺序返回每个Promise的返回															值，一个失败就进入失败处理函数

​								Promise.allSettled()：类似于`Promise.all()`接收一组Promise，但是它不管成功还是失败都会返回每个Promise的状																	  态

​								Promise.any()：接收interable可迭代对象，返回一个Promise对象，一个Promise变成fullfiled，整体Promise为															fulfilled，全部Promise为rejectde，整体Promise为rejected

​								Promise.race()：接收interable可迭代对象，返回一个Promise，哪一个Promise先改变就整体Promise就以先改变的																Promise为主

​			https://cloud.tencent.com/developer/article/1635991

​	**Generator:**  `function*(){}` 就是Generator函数，可以通过 `yield` 或 `return`返回，返回格式均为

​								`{value:xxx, down:false/true}` ,  `yield`可以中断运行，可以通`next()`继续调用，`return`直接终止运行

​							实现异步： generator 配合 thunk函数【接受一定的参数，返回定制化的函数】使用

​							自动执行： thunk函数、co函数库

​							generator/promise对比async/await：

​											generator函数的执行必须依赖迭代器，async自带迭代器，自动执行

​											如果需要generator自执行，yield后面只能是thunk函数 或 promise函数，await后面没有限制

​											`async/await` 比 `* yield`语义更好

## Promise 实现

​	不是很清楚成功or失败回调函数的作用，.then传入的值应该跟上一个then传入的处理函数传出的值相关

​		p.then().then().then()		

​	执行resolve不应该把值给返回出去吗？

​	在实现的过程中，使用`this`遇到改变指向的问题，如果使用function要提前保存`this`

![](https://i.loli.net/2021/08/19/sAzc3Ye2kRFamPr.png)

总结：resolve：使用

​			reject：

​			then：实际上实现了两个功能：回调完当前所有`resolve reject`的回调函数 以及 执行下一个 `promise`的`resolve`

​		大量使用闭包

## 垃圾回收(Chrome V8)

​	堆：内存大小不固定，不会自动释放

​	栈：自动分配相对固定大小的空间，由系统自动释放

​	**新生代(scavenge)：**		

1. 将堆内存一分为二，每个部分空间称为 semispace；
2. 两个 semispace 一个处于使用中（称为 From 空间），一个处于空闲状态（称为 To 空间）；
3. 当我们分配对象时，在 From 空间进行分配；
4. 当开始进行垃圾回收时，会检查 From 空间的存活对象，把它们复制到 To 空间，而非存活对象占用的空间被释放；
5. 完成复制后，From 空间和 To 空间角色对换。

Scavenge 的缺点是只能使用堆内存的一半，但由于只复制存活对象，并且由于生命周期短的场景中存活对象只占少部分，所以它在时间效率上不错。

当一个对象经过多次复制依然存活时，它会被认为是生命周期较长的对象，会被移动到老生代中，采用新的算法进行管理。对象从新生代移动到老生代称为晋升。

不同于单纯的 Scavenge 过程，在分代式垃圾回收的前提下，From 空间的存活对象复制到 To 空间前需要进行检查：即是否可以晋升。

晋升的两个条件：

- 对象是否经历过（一次） Scavenge 回收；
- To 空间的内存占用超过一定比例，比如 25%。设置比例是因为此次 Scavenge 回收完成后， To 空间将变成 From 空间，占用比例过高将影响后续内存的分配。

**老生代(Mark-Sweep & Mark-Compact)：**

​	老生代对象存活率比较高，采用`scavenge`效率比较低，浪费空间比较大

​	标记清除：遍历所有对象，标记活着的对象，清除没有被标记的对象，缺点可能会造成大量的内存碎片

​	标记整理：在`标记清除`后，会将活着的对象移到一侧

## JS代码怎么被浏览器引擎编译执行的

​	编译型语言：代码运行前编译器直接将代码转换成机器码，运行时不需要重新翻译，可以直接使用编译后的结果

​	解释型语言：运行时编译

​	V8引擎执行JS代码的过程：

​			将代码转换成AST(抽象语法树)

​				生成AST的过程： 

​							词法分析： 将源代码分割成最小的词法单元，称为token，例如将 `var a = 1;` 拆分为`var 、a、=、2、;`五个词法单元

​							语法分析：将词法单元转换成一个元素逐级嵌套所组成的代表程序语法结构的树，称为抽象语法树

```js
// 抽象语法树 var a = 1;
{

  "type": "Program",

  "start": 0,

  "end": 10,

  "body": [

    {

      "type": "VariableDeclaration",

      "start": 0,

      "end": 10,

      "declarations": [

        {

          "type": "VariableDeclarator",

          "start": 4,

          "end": 9,

          "id": {

            "type": "Identifier",

            "start": 4,

            "end": 5,

            "name": "a"

          },

          "init": {

            "type": "Literal",

            "start": 8,

            "end": 9,

            "value": 1,

            "raw": "1"

          }

        }

      ],

      "kind": "var"

    }

  ],

  "sourceType": "module"

}

```

​			AST转换成字节码

​			字节码转换成机器码

​			垃圾回收

## 循环遍历的方法

​	for...of

​	for...in

## 偏函数和柯里化

## 我的疑问

​	call实现深拷贝是否可以： 在实现继承的时候，可以通过构造器（借助call）实现继承，可以使父类的引用数据类型不被共享，这是不是也是拷贝的一种类型

## 实现点东西

​	a===1 && a===2 && a==3

​	add(1)(3)(...)

```javascript
for(var i=0;i<5;i++){

	setTimeout(()=>{},100)

}
// 这个问题是不是可以通过generator解决
```

## 上下文、作用域、变量对象和this

javaScript的整个阶段分为编译阶段和执行阶段，上下文就是在执行阶段创建的，js引擎创建上下文栈来管理上下文。

上下文的创建阶段会创建变量对象、作用域链以及确定this的指向。

变量对象包含入参和内部定义的变量。

作用域链规定如何查找变量。

参考： https://segmentfault.com/a/1190000013915935



## ES6

### 摘要

​	es6新引入的

​		变量声明：let const

​		新的数据结构：set map

​		数据类型： symbol

​		字符串扩展：模版字符串

​		数组扩展：新增数组方法 Array.of()   Array.from()  Array.isArray()  Array.flat() 

​		Number扩展：将parserInt 和 parsetFloat移植到Number上来

​		异步： Promise  async/await

​		类：class 以及 class的继承(extends)

​		其他： 结构运算符(...)  ??   ?.

​		代理： proxy和reflect

### Map

​	map的键跟内存中实际的地址绑定，只要内存内存不一样，就视为两个键，基本数据类型和引用数据类型都可以作为key



