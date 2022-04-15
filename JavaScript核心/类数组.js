// 类数组： 函数的参数对象arguments ; 用 getElementsByTagName/ClassName/Name 获得的 HTMLCollection；用 querySelector 获得的 NodeList。
// 类数组可以使用数组的方法
// 类数组转换成数组的方法： Array.prototype.slice.call()  展开运算符(...) Array.from()  

// HTMLCollection ： 接口表示一个包含了元素（元素顺序为文档流中的顺序）的通用集合
// NodeList ： 对象是节点的集合
// HTMLCollection是早期模型，只包含HTML元素，拥有 length属性、item方法和namedItem方法，获取的接口有document.getElementsByClassName, document.getElementsByTagName
// NodeList比较新的模型，相比HTMLCollection更加完善，不光可以获取html元素还可以获取text节点和comment，拥有length、entries、forEach、item、keys、values，获取的接口有document.querySelectorAll

console.log([1,2,3,4,5].slice(1,2));
console.log([1,2,3,4,5].splice(2));

console.log(Array.prototype.slice.call({0:'1',1:'2',length:2}))