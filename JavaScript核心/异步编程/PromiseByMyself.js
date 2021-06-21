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
          const fulfilled = function(){

          }
          const rejected = function(){
              
          }
          switch (_status) {
              case PENDING:
                  this.fulfilledCallBack.push(onFulfilled)
                  this.rejectedNext.push(onRejected)
                  break;
              case FULFILLED:
                  onFulfilled(_value)
                  break;
              case REJECTED:
                  onRejected(_value)
                  break;
          }
      })
  };
}

console.log(new MyPromise((resolve, reject) => {
    console.log('aaa')
  resolve(1);
}))



