# 前端总结

## 原型链及其方法

`_prop_ 属性`

`prototype 属性`

`getPrototypeof 方法`：获取参数的原型对象

`getPrototypeOf 方法`

`getOwnPropertyDescriptor 方法`

`create 方法`

##  JS数据类型

​	基本数据类型：number sting null undefined boolean symbol  bigItem

​	引用数据类型：object --- > array date regexp math function 

​	数据类型的判断：

​		typeof: 可以判断基本数据类型 和 引用数据类型，但 typeof null === 'object'，判断引用数据类型结果全部为 ’object'，除function外

​		instanceof: 判断该对象是否由该构造函数生产，不能判断基础类型

​		Object.property.toString.call(obj): 可以判断具体的数据类型

​	数据类转换： 强制转换 隐式转换  调用顺序： toPrimitive --> valueOf --> toString

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

​			构造函数：new Fun， 指的就是这个 Fun

​			原型对象：构造函数的空对象，可以通过它给构造函数添加属性和方法

​			实例：通过构造函数构建的对象

​			new的过程：

​					1、创建一个新的对象

​					2、 将对象的 `_proto_`设置成构造函数的`prototype`

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

​	箭头函数里面不能使用this

## New一个对象的过程

​	1、创建一个新的对象

​	2、 将对象的 `_proto_`设置成构造函数的`prototype`

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

​	什么是闭包：可以使用父级的变量，函数里面嵌套函数、 高阶函数

​	闭包的好处：

​	会不会造成内存泄漏：

​	为什么产生闭包：

​	闭包的表现形式：

​	宏任务 、 微任务？

## 循环遍历的方法

## 偏函数和柯里化

## 我的疑问

​	call实现深拷贝是否可以： 在实现继承的时候，可以通过构造器（借助call）实现继承，可以使父类的引用数据类型不被共享，这是不是也是拷贝的一种类型



