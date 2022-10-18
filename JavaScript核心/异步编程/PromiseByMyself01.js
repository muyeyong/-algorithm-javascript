const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


class MyPromise {
  constructor(handle) {
    this.value = undefined
    this.status = PENDING
    this.rejectedCallback = []
    this.fulfilledCallback = []
    try {
      handle(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
  resolve(val) {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = val
    this.fulfilledCallback.forEach(callback => {
      callback(val)
    })
  }
  reject(err) {
    if (this.status !== REJECTED) return
    this.status = REJECTED
    this.value = err
    this.rejectedCallback.forEach(callback => {
      callback(err)
    })
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) return reject(new Error('error'))
    if (x instanceof MyPromise) {
      if (x.status === PENDING) {
        x.then(y => this.resolvePromise(promise2, y, resolve, reject), reject)
      } else { 
        x.then(resolve, reject)
      }
    } else {
      resolve(x)
    }
  }
  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((onFulfilledNext, onRejectedNext) => {
      switch (this.status) {
        case FULFILLED:
          const result = onFulfilled(this.value)
          this.resolvePromise(promise2, result, onFulfilledNext, onRejectedNext)
          // onFulfilledNext(result)
          break;
        case REJECTED:
          const error = onRejected(this.value)
          this.resolvePromise(promise2, error, onFulfilledNext, onRejectedNext)
          // onRejectedNext(error)
          break;
        case PENDING: 
          this.fulfilledCallback.push(val => {
            const result = onFulfilled(val)
            this.resolvePromise(promise2, result, onFulfilledNext, onRejectedNext)
            // onFulfilledNext(result)
          })
          this.rejectedCallback.push(error => {
            const err  = onRejected(error)
            this.resolvePromise(promise2, err, onFulfilledNext, onRejectedNext)
            // onRejectedNext(err)
          })
          break;
       }
    })
    return promise2
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
  
})
p1.then((res) => {
  console.log(res)
  return 2
}).then(res => {
  console.log(res)
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(3)
    }, 1000)
  })
}).then(res => {
  console.log(res)
})


 /* 
 如果返回的是一个promise，需要等待这个promise返回结果才能进行下一步
 怎么去等待，然后还需要保持执行的顺序
 promise.then 可以获取promise的结果，保持执行顺序的话就将resolve reject传入
 */


 