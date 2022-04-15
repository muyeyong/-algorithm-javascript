// new 原理介绍
    //  创建一个空对象
    //  改变this的指向
    //  执行构造函数的代码
    //  返回新对象

// new 升级
// const _new = function(ctor, ...args){
//     if(ctor )
// }

Function.prototype.myBind = function(context, ...args){
    if(!context) context = window
    else context = Object(context)
    // return (...args1)=> this.call(context, ...args, ...args1)
    const sym = Symbol()
    context[sym] = this
    const result = function(...args1){
      return  context[sym](...args,...args1)
    }
    // delete context[sym]
    return result
}

const greet = function(){
    console.log('do do do', this.name)
}

const B = {
    name: '嘛嘛嘛'
}

const B1 = greet.myBind(B)
B1()

Function.prototype.myCall = function(context, ...args){
    if(!context) context = window
    else context = Object(context)
    const sym = Symbol()
    context[sym] = this
    const result = context[sym](...args)
    delete context[sym]
    return result
}

const say = function(){
    console.log(this.name)
}

const A = {
    name: '哈哈哈'
}

say.myCall(A)
// bind

Function.prototype.myBind = function(context, ...args){
    if(!context) context = window
    else context = Object(context)
    // return (...args1)=> this.call(context, ...args, ...args1)
    const sym = Symbol()
    context[sym] = this
    const result = function(...args1){
      return  context[sym](...args,...args1)
    }
    // delete context[sym]
    return result
}

const greet = function(){
    console.log('do do do', this.name)
}

const B = {
    name: '嘛嘛嘛'
}

const B1 = greet.myBind(B)
B1()


// 
console.log(Math.max(1,2,3))


function aa(){
    this.say = function(){
        console.log('aa')
    }
}
const bb = {
    name: 'hhh1'
}

function _new(ctor, ...args) {
    if(typeof ctor !== 'function') {
      throw 'ctor must be a function';
    }
    let obj = new Object();
    obj.__proto__ = Object.create(ctor.prototype);
    let res = ctor.apply(obj,  [...args]);

    let isObject = typeof res === 'object' && res !== null;
    let isFunction = typeof res === 'function';
    console.log('res', res)
    return isObject || isFunction ? res : obj;
};

const aa1 = _new(aa)
aa1.say()
