const Promise = require("./实现Promise");
const { reject } = require("lodash");

function* gen() {
   
    console.log("enter");
    let a = yield 1;
    let b = yield (function () {return 2})();
    return 3;
  }
  var g = gen()           // 阻塞住，不会执行任何语句
  console.log(g.next())
  console.log(g.next())
  console.log(g.next())
  console.log(g.next())  

  // thunk 实现generator 自实现
function doSome(str){
   return function(cb){
        setTimeout(function(){
            cb(str)
        }, 1000)
   } 
}

function * gen(){
    const data1 = yield doSome('str1')
    console.log('str1',data1)
    const data2 = yield doSome('str2')
    console.log('str2', data2)
}
const g = gen()

// g.next().value(()=>{
//     console.log('我是1的回调')
//     g.next().value(()=>{
//         console.log('我是2的回调')
//     })
// })

// 自动执行
function run(g){
    const next = (data)=>{
        const res = g.next(data)
        if(res.done) return
        res.value(next)
    }
    next()
}
run(g)

// generator 配合 promise
function iPromise(data){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(data)
        },1000)
    })
}

function * gen(){
    const data1 = yield iPromise('promise1')
    console.log('data1', data1)
    const data2 = yield iPromise('promise2')
    console.log('data2', data2)
}

function run(g){
    const next=(data)=>{
        const res = g.next(data)
        if(res.done) return
        res.value.then(next)
    }
    next()
}
run(gen())

  