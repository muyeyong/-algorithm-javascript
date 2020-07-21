//改进版本
yourMessage = {};

yourMessage.messageList = {};

yourMessage.on = function (key, fn) {
  if (!this.messageList[key]) this.messageList[key] = [];
  this.messageList[key].push(fn);
}

yourMessage.emit = function () {
  let key = Array.prototype.shift.call(arguments);
  if (!this.messageList[key] || this.messageList[key].length <= 0) return;
  for (var i = 0, fn; fn = this.messageList[key][i++];) {
    fn.apply(this, arguments);
  }
}

yourMessage.on('欢迎', function (name) {
  console.log(`欢迎, ${name}`)
})

yourMessage.on('哈哈', function (name) {
  console.log(`哈哈，${name}`)
})

yourMessage.emit('欢迎', '马达话')
yourMessage.emit('哈哈', '勤大妈')

