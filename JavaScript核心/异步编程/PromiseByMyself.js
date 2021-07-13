// 自定义实现Promise
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
const isFunction = (fn)=> typeof fn === 'function'
class MyPromise {
  constructor(handle) {
    if(!isFunction(handle)){
        throw 'handle in not function'
    }
    this.fulfilledCallBack = [];
    this.rejectedCallBack = [];
    this._status = PENDING;
    this._value = undefined;
    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
     this._reject(error);
    }
  }
  _resolve = function (val) {
    if (this._status !== PENDING) return;
    this._status = FULFILLED;
    this._value = val;
    for (let i = 0; i < this.fulfilledCallBack.length; i += 1) {
      this.fulfilledCallBack[i](val);
    }
  };
  _reject = function (err) {
    if (this._status !== PENDING) return;
    this._status = REJECTED;
    this._value = err;
    for (let i = 0; i < this.rejectedCallBack.length; i += 1) {
      this.rejectedCallBack[i](val);
    }
  };
  _then = function (onFulfilled, onRejected) {
      const {_status,_value} = this
      return new MyPromise((onFulfilledNext,onRejectedNext)=>{
          const fulfilled = function(val){
              try {
                if(typeof onFulfilled !== 'function'){
                    onFulfilledNext(val)
                }else{
                    let res = onFulfilled(val)
                    if(res instanceof MyPromise)
                        res._then(onFulfilledNext,onRejectedNext)
                    else onFulfilledNext(res)
                }
              } catch (error) {
                  onRejected(error)
              }
           
          }
          const rejected = function(err){
                try {
                    if(typeof onRejected !== 'function'){
                        onRejectedNext(err)
                    }else{
                        let res = onRejected(err)
                        if(err instanceof MyPromise){
                            res._then(onFulfilledNext,onRejectedNext)
                        }else{
                            onRejectedNext(err)
                        }
                    }
                } catch (error) {
                    onRejectedNext(error)
                }
          }
          switch (_status) {
              case PENDING:
                  this.fulfilledCallBack.push(onFulfilled)
                  this.rejectedCallBack.push(onRejected)
                  break;
              case FULFILLED:
                  fulfilled(_value)
                  break;
              case REJECTED:
                  rejected(_value)
                  break;
          }
      })
  };
}

let p1 = new MyPromise((re,rj)=>{
    setTimeout(()=>{
        re('P1')
    },2000)
})
p1._then(res=>{
    console.log(res)
})



