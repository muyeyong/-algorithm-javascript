//基础版本
yourMessage = {};

yourMessage.messageList = [];

yourMessage.on = function (fn) {
    yourMessage.messageList.push(fn);
}

yourMessage.emit = function () {
    for (var i = 0, fn; fn = yourMessage.messageList[i++];) {
        fn.apply(this, arguments); //=使用call 和 使用 bind 不一样
    }
}

yourMessage.on(function (name) {
    // console.log(Object.prototype.toString.call(name1))
    console.log(`欢迎, ${name}`)
})

yourMessage.on(function () {
    console.log('哈哈哈')
})

yourMessage.emit('花大姐', '马达话')
yourMessage.emit('勤大妈')


