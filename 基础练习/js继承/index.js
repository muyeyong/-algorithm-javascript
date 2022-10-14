function Parent(){
    this.name = 'parent'
}

Parent.prototype.say = function(){
    return this.name
}
function Child(){
    Parent.call(this)
    this.name = 'child'
}

let child  = new Child()
let parent = new Parent()

console.log(child)
console.log(parent)


/* 
    原型链继承
    构造函数继承
    组合继承
    寄生式继承
    es6 extends
 */