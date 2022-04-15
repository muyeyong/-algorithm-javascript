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


