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

​	原型链继承： 

​			构造函数：new Fun， 指的就是这个 Fun

​			原型对象：构造函数的空对象，可以通过它给构造函数添加属性和方法

​			实例：通过构造函数构建的对象

​			new的过程：

​					1、创建一个新的对象

​					2、 将对象的 `_proto_`设置成构造函数的`prototype`

​					3、执行构造函数的代码

​					4、返回这个对象

​			obj2.prototype = new obj1()，将原型对象指向继承对象的实例

​	构造函数继承： 使用call为什么可以使父类的引用属性不被共享？

​	extends

## New一个对象的过程

## 循环遍历的方法



