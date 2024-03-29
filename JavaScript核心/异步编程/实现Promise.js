const { reject } = require("lodash");

function test(flag) {
  const p = new Promise((resolve, reject) => {
    if (flag) resolve("success");
    reject("fail");
  });
  return p;
}
test(false)
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log(err);
    }
  )
  .catch((err) => {
    console.log("err");
  });

// 为什么需要使用队列存储函数？
const p1 = new Promise((resovle, reject) => {
  setTimeout(() => {
    resovle("success");
  }, 1000);
});
p1.then((data) => {
  console.log("then1", data);
});
p1.then((data) => {
  console.log("then2", data);
});
// 执行顺序研究
// 判断变量否为function
const isFunction = (variable) => typeof variable === "function";
// 定义Promise的三种状态常量
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
let p1 , p2
class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    // 添加状态
    this._status = PENDING;
    // 添加状态
    this._value = undefined;
    // 添加成功回调函数队列
    this._fulfilledQueues = [];
    // 添加失败回调函数队列
    this._rejectedQueues = [];
    // 执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }
  // 添加resovle时执行的函数
  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return;
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while ((cb = this._fulfilledQueues.shift())) {
          cb(value);
        }
        // console.log('resolve', p1, p2)
      };
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while ((cb = this._rejectedQueues.shift())) {
          cb(error);
        }
      };
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
      if (val instanceof MyPromise) {
        val.then(
          (value) => {
            this._value = value;
            this._status = FULFILLED;
            runFulfilled(value);
          },
          (err) => {
            this._value = err;
            this._status = REJECTED;
            runRejected(err);
          }
        );
      } else {
        this._value = val;
        this._status = FULFILLED;
        runFulfilled(val);
      }
    };
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }
  // 添加reject时执行的函数
  _reject(err) {
    if (this._status !== PENDING) return;
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED;
      this._value = err;
      let cb;
      while ((cb = this._rejectedQueues.shift())) {
        cb(err);
      }
    };
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }
  // 添加then方法
  then(onFulfilled, onRejected) {
    const { _value, _status } = this;
    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      let fulfilled = (value) => {
        console.log('then fulfilled')
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            let res = onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      };
      // 封装一个失败时执行的函数
      let rejected = (error) => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      };
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);
          break;
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    });
  }
  // 添加catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  // 添加静态resolve方法
  static resolve(value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }
  // 添加静态reject方法
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value));
  }
  // 添加静态all方法
  static all(list) {
    return new MyPromise((resolve, reject) => {
      /**
       * 返回值的集合
       */
      let values = [];
      let count = 0;
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(
          (res) => {
            values[i] = res;
            count++;
            // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
            if (count === list.length) resolve(values);
          },
          (err) => {
            // 有一个被rejected时返回的MyPromise状态就变成rejected
            reject(err);
          }
        );
      }
    });
  }
  // 添加静态race方法
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
  finally(cb) {
    return this.then(
      (value) => MyPromise.resolve(cb()).then(() => value),
      (reason) =>
        MyPromise.resolve(cb()).then(() => {
          throw reason;
        })
    );
  }
}

 p1 = new MyPromise((resolve, reject) => {
  //   setTimeout(()=>{
  //       console.log('step1')
  //       resolve('One')
  //   },1000)
  // console.log('step1')
  resolve("One");
})
 p2 = p1.then(res=>{
  // setTimeout(()=>{
  //   console.log(res)
  //   return 'Tow'
  // },1000)
  // console.log('p1', res)
  return 'Tow'
}) // p2的resolve是怎么触发的
p2.then((res)=>{
  // console.log('p2', res)
})  // 最后还会输出一个Promise 是怎么回事？

// Promise 和 then 是一起的，如果Promise里面处理的是异步操作，会将then里面的处理方法放到处理队列里面去，如果Promise处理的是
// 同步代码，就会直接执行

// 2021/08/18
/*
 promise存在状态的变化， 
*/
const t = new Promise((resolve, reject)=>{
  resolve(1)
})
const t2 = t.then(res=>{
  console.log('success', res)
  return 2
}, err=>{
  console.log('err', err)
})

t2.then(res=>{console.log('t2', res)})
Promise.then()
Promise.resolve()
// then的第二个参数 和 catch比较
  // const p1 = Promise.reject('bug bug bug!!!')
  const p1 = Promise.resolve('success success success!!!')

  p1.then(res=>{
    console.log('res', res)
    throw 'bug bug bug!!'
  },err=>{
    console.log('err', err)
  }).catch(err=>{
    console.log('catch', err)
  })

   /* 重新写一个Promise 
      promise有三个状态: pending fulfilled rejected
      resolve reject
      then: 传入两个处理函数 支持链式调用 异常情况处理
      catch
   */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const isFunction = fun => typeof fun === 'function'
class MyPromise {
  constructor(handle){
    this._value = undefined
    this._status = PENDING
    this._fulfilledQueues = []
    this._rejectedQueues = []
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }
   _resolve(value){
    const run = ()=>{
      if(this._status !== PENDING) return 
      const runFulfilled = (val)=>{
        let cb
        while(cb = this._fulfilledQueues.shift() ){
          cb(val)
        }
      }
      const runRejected = (val)=>{
        let cb
        while(cb = this._rejectedQueues.shift()){
          cb(val)
        }
      }
      if(value instanceof MyPromise) {
        value.then(res=>{
          this._status = FULFILLED
          this._value = res
          runFulfilled(res)
        }, reason=>{
          this._status = REJECTED
          this._value = reason
          runRejected(reason)
        })
      }else{
        this._value = value
        this._status = FULFILLED
        runFulfilled(value)
      }
    }
    // run()
     setTimeout(run, 0) // 跟宏任务 微任务有关？
  } 

  _reject(reason){
    const run = ()=>{
      if(this._status !== PENDING) return
      this._value = reason
      this._status = REJECTED
      let cb
      while(( cb = this._rejectedQueues.shift())){
        cb(reason)
      }
    }
    setInterval(run, 0)
  }
  /* 
    onResolved onRejected 必须是函数，否则忽略
    如果上一个promise处于pending,则将onResolved onRejected将入回调队列
    如果是fulfilled rejected需要执行回调，返回一个promise
    返回新的promise的状态根据上一个的返回值
   */
   then(onResolved, onRejected){
    const {_status, _value } = this
    return new MyPromise((nextResolved, nextRejected)=>{
      // onResolved = isFunction(onResolved)? onResolved : (v)=>{}
      // onRejected = isFunction(onRejected) ? onRejected: (v)=>{}
      const handleFulfill = (val)=>{
        if(!isFunction(onResolved)){
          nextResolved(val)
        }else {
          const res =  onResolved(val)
          if(res instanceof MyPromise) {
             res.then(nextResolved, nextRejected)
          }else{
             nextResolved(res)
          }
        }
      }
      const handleReject  = (val)=>{
        if(!isFunction(onRejected)){
            nextRejected(val)
        }else{
          const res = onRejected(val)
          if(res instanceof MyPromise) {
            res.then(nextResolved, nextRejected)
          }else{
            nextResolved(res)
          }
        }
      }
      switch (_status) {
        case PENDING:
          this._fulfilledQueues.push(handleFulfill)
          this._rejectedQueues.push(handleReject)
          break;
        case FULFILLED:
          handleFulfill(_value)
          break;
        case REJECTED: 
          handleReject(_value)
          break;
      }
    })
  } 
}

const p1 = new MyPromise(function(resolve, reject){
  // setTimeout(()=>{
  //   resolve(1)
  // },3000)
  resolve(1) // 使用了setTimeout 不会立即执行
  console.log('111')
})
// p1的状态决定p2  _status 的取值
const p2 = p1.then(res=>{ // 注册微任务
  // setTimeout(()=>{
  //   console.log(res)
  //   return 2
  // },200)
  // console.log('22', res)
  console.log('222')
  return 2
}) 

p2.then((res)=>{  // 不管后面
  console.log('333')
  // console.log('p2', res)
}) // 什么时候启动p2的then回调

console.log(p2 instanceof MyPromise)



// 正牌promise
new Promise((resolve, reject)=>{
  resolve(1)
}).then((res)=>{
  // setTimeout(()=>{
  //   console.log(res)
  //   return 2
  // }, 1000)
  console.log('22', res)
  return 2
}).then((res)=>{
  console.log('33',res)
})