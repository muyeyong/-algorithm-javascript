let eventEmitter = {
  list: {},
  cached: {},
  //订阅
  on(key, fn) {
    if (!this.list[key]) {
      this.list[key] = [];
    }
    console.log(this.list[key].indexOf(fn))
    if (this.list[key].indexOf(fn) != -1) return; //防止多次订阅
    this.list[key].push(fn);
    if (this.cached[key])
      for (let i = 0, content; content = this.cached[key][i]; i++) {
        fn.apply(this, content);
      }
  },
  //发布
  emit() {
    let key = Array.prototype.shift.call(arguments);
    if (!this.list[key] || this.list[key].length <= 0) return;
    for (let i = 0, fn; fn = this.list[key][i++];) {
      fn.apply(this, arguments);
    }
    if (!this.cached[key]) this.cached[key] = [];
    this.cached[key].push(arguments);
  },
  //一次订阅
  once(key, fn) {
    let on = function () {
      fn.apply(this, arguments);
      this.off(key, on);
    }
    this.on(key, on);
  },
  //取消订阅
  off(key, obj) {
    if (!this.list[key] || this.list[key].length <= 0) return;
    for (let i = 0, fn; fn = this.list[key][i]; i++) {
      if (fn === obj) {
        this.list[key].splice(i, 1);
        break;
      }
    }
  }
}

function fn1(content) {
  console.log('One ', content);
}

function fn2(content) {
  console.log('Two ', content)
}
eventEmitter.emit('listen', '哈哈哈')
eventEmitter.on('listen', fn1);
eventEmitter.on('listen', fn2);