//新增once 和 off
let eventEmitter = {
  list: {},
  //订阅
  on(key, fn) {
      if (!this.list[key]) {
          this.list[key] = [];
      }
      this.list[key].push(fn);
  },
  //发布
  emit() {
      let key = Array.prototype.shift.call(arguments);
      if (!this.list[key] || this.list[key].length <= 0) return;
      for (let i = 0, fn; fn = this.list[key][i++];) {
          fn.apply(this, arguments);
      }

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

eventEmitter.once('listen', fn1);
eventEmitter.once('listen', fn2);

eventEmitter.emit('listen', '哈哈哈')

//eventEmitter.off('listen', fn1);
eventEmitter.emit('listen', '哈哈哈')

