let yourMsg = {};
yourMsg.peopleList = [];
yourMsg.listen = function (fn) {
    this.peopleList.push(fn);
}
yourMsg.triger = function () {
    for(var i = 0,fn;fn=this.peopleList[i++];){
        fn.apply(this,arguments);
    }
}

yourMsg.listen(function (name) {
    console.log(`${name}收到了你的消息`);
})
yourMsg.listen(function (name) {
    console.log('哈哈');
})

yourMsg.triger('张三');
yourMsg.triger('李四');

