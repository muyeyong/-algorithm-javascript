
// const _ = require('lodash')

const { slice } = require("lodash")

// var person = [{name: 'kevin'}, {name: 'daisy'}]

// var prop = curry(function (key, obj) {
//     return obj[key]
// })

// var name = person.map(prop('name'))
// console.log(name)

/* 
    柯里化是特殊的偏函数
    sum(1)(2)(3) ===> partial(sum,1,2)(3)
 */

 //传入的参数超过fn处理？
var curry = fn =>
    judge = (...args) =>
        args.length === fn.length
            ? fn(...args)
: (arg) => judge(...args, arg)

const add = (a,b)=>{
    return a+b
}

const addCurry = curry(add)

console.log(addCurry(1)(2))

/////////

var curry = fn =>
    judge = (...args) =>
        args.length === fn.length
            ? fn(...args)
: (arg) => judge(...args, arg)

const persons = [{name:'a'}, {name: 'b'}]

const prop = curry(function(key,obj){
    return obj[key]
})
console.log(persons.map(prop('name')))
////////////////////

const add = (x,y,z)=>{
    return x + y + z
}

const sub_curry = (fn, ...args)=>{
    return (...arg)=> fn(...args,...arg)
}

const curry = (fn, ...args)=>{ // 如果这里传length（原始函数的参数个数），那么参数就要通过arguments获取？
    const length = fn.length
    const argsLength = [...args].length
    if( argsLength < length ) {
        return curry.bind(null, (sub_curry(fn, ...args))) // (sub_curry(fn, ...args)) 改变了原函数传参
    }else if( argsLength === length) {
        return fn(...args)
    }else if( argsLength > length) {
        const availableArgs = [...args].splice(0,length)
        const leftArgs = [...args].splice(length)
        return curry.bind(null,(sub_curry(fn, ...leftArgs)))
    }
}

const currAdd = curry(add,1,2)


console.log(currAdd(3))

/* 
 通过length控制
 */
function add (x,y,z){
    return x + y + z
}

const sub_curry = (fn, ...args)=>{
    return (...arg)=> fn(...args,...arg)
}
// function sub_curry(fn) {
//     var args = [].slice.call(arguments, 1);
//     return function() {
//         return fn.apply(this, args.concat([].slice.call(arguments)));
//     };
// }

const curry = (fun,length)=>{
   const  len =  length || fun.length
   const slice = Array.prototype.slice
   return function(){
    const argsLength = arguments.length
    console.log('arguments', arguments)
    if( argsLength < len) {
     const combined = [fun].concat(slice.call(arguments))
     return curry(sub_curry.apply(this, combined), len - argsLength)
    }else {
     return fun.apply(this, arguments)
    }
   }
}

const curryAdd = curry(add)

// console.log(curryAdd(1,2)(3))

const f1 = curryAdd(1)(2)

console.log(f1(3))

/////
function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}

function curry(fn, length) {

    length = length || fn.length;

    var slice = Array.prototype.slice;

    return function() {
        if (arguments.length < length) {
            var combined = [fn].concat(slice.call(arguments));
            return curry(sub_curry.apply(this, combined), length - arguments.length);
        } else {
            return fn.apply(this, arguments);
        }
    };
}
var fn = curry(function(a, b, c) {
    return [a, b, c];
});

console.log(fn("a", "b", "c")) // ["a", "b", "c"]
