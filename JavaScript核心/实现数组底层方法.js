// push

Array.prototype.myPush = function(...args){
    let o = Object(this)
    let len = o.length >>> 0 // 无符号位移？
    let argsLen = args.length >>> 0
    console.log(len, argsLen)
    for(let i=0;i<argsLen;i++){
        o[len+i] = args[i]
    } 
    o.length = len + argsLen
    return o.length
}

console.log([1,2,3].myPush(4,5,6))

// pop

Array.prototype.myPop = function(){
    let O = Object(this)
    let len = O.length
    if(len <=0 ) throw 'Array is Empty'
    const target = O[len-1]
    delete O[len-1]
    O.length--
    return target
}

console.log([1,2,3,4].myPop())

// map

Array.prototype.myMap = function(callback, thisArg){
    if(typeof callback !== 'function') throw TypeError('callback not a function')
    let O = Object(this)
    let len = O.length
    const result = []
    for(let i=0;i<len;i++) {
       result[i] = callback.call(thisArg, O[i],i,O)
    }
    return result
}

const thisArg = {
    count: 5
}
console.log([1,2,3,4].myMap(function(item){
    return item * this.count
},thisArg) )

// reduce
Array.prototype.myReduce = function(callback, initValue){
    if(typeof callback !== 'function') {
        throw TypeError('callback not a function')
    }
    const O = Object(this)
    let len = O.length
    let i = 0
    if(!initValue) {
        for(;i<len;i++) {
            if(O[i]){
                initValue = O[i]
                break
            }
        }
    }

    for(;i<len;i++) {
        initValue = callback(initValue, O[i])
    }
    return initValue
}

console.log([1,2,3,4].myReduce(function(x,y){
    return x * y
}))

