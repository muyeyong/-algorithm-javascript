let Animal = function(){}

let dog = new Animal()

// console.log(dog instanceof Animal)

// let cat = new String('cat')
// console.log(cat instanceof String)

// console.log('cat' instanceof String)

// 自己实现

function myInstanceof(left,right){
    if(!right || !right.prototype) return console.error('发生错误了')
    if(typeof left !== 'object' || left === null) return false
    let proto 
    do{
        proto = Object.getPrototypeOf(left)
        if(proto  === null) return false
    }while(proto !== right.prototype)
    return true
}

myInstanceof('aaa',null)

console.log(myInstanceof(dog,Animal))
console.log(myInstanceof('dog',String))

console.log(String.prototype)

