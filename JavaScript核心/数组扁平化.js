const arr = [1,[2,3],[4,[5,6]]]
console.log(...arr)

// 递归实现
const flat = (arr)=>{
    let result = []
    for(let i = 0;i<arr.length;i+=1){
        if(Array.isArray(arr[i])) result = result.concat(flat(arr[i]))
        else result.push(arr[i])
    }
    return result
}
const arr = [1,2,[3,4,[5],[6]],[7]]
console.log(flat(arr))
// reduce实现
const flat = (arr= [])=>{
    return arr.reduce((pre,next)=>{
        console.log(pre)
        return Array.isArray(next)? pre.concat(flat(next)) : pre.concat(next) // push的返回值是length
    },[])
}
const arr = [1,2,[3,4,[5],[6]],[7]]
console.log(flat(arr))
// 解构符实现 some
const flat = (arr = [])=>{
    while(arr.some(item=>Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr
}
const arr = [1,2,[3,4,[5],[6]],[7]]
console.log(flat(arr))
// es6 flat(递归层数)
const flatten = (arr=[])=>{
    return arr.flat(Infinity)
}
const arr = [1,2,[3,4,[5],[6]],[7]]
console.log(flatten(arr))

// 转成字符串
// toString  & split 实现 , toString 可以直接扁平化数组  
const flat = (arr=[])=>{
    return arr.toString().split(',')
}
const arr = [1,2,[3,4,[5],[6]],[7]]
console.log(flat(arr))

console.log([1,2,3,[4,[5,6,[7]]]].toString())
// JSON.stringify & JSON.parse & RegExp
const flat = (arr=[])=>{
    let str = JSON.stringify(arr)
    str = str.replace(/(\[|\])/g,'')
    str = `[${str}]`
    return JSON.parse(str)
}
const arr = [1,2,[3,4,[5],[6]],[7]]
console.log(flat(arr))

// 2021/08/16
 // 递归实现 [1,2,3, [2,3],7,8]
 const flatten  = (arr)=>{
    if(!Array.isArray(arr)) throw new Error('arr must bu Array Type')
    let result = []
    for(v of arr) {
       if (Array.isArray(v)){
        result =  result.concat(flatten(v))
       }else{
           result.push(v)
       }
    }
    return result
 }

 const arr = [1,2,3,[4,5,[8]]]
console.log( flatten(arr))

// 字符串实现

const flattenByString = (arr)=>{
    if(!Array.isArray(arr)) throw new Error('arr must be Array')
    let arrString =  arr.toString()
    const result = arrString.replace(/(\[|\])/g, '')
    return `[${result}]`
}

const arr = [1,2,3,[3,4,5,666]]

console.log(flattenByString(arr))

// reduce实现
const flattenByReduce = (arr)=>{
    return  arr.reduce((pre,v)=>{
        return pre.concat(Array.isArray(v)? flattenByReduce(v): v)
    },[])
}

const arr = [1,2,3,4,5,[66,77,88,[9]]]

console.log(flattenByReduce(arr))

`/(\[|\])/g`

// toString实现

const flatByToString = (arr)=>{
    return `[${arr.toString()}]`
}

console.log(flatByToString([1,2,3,4,[444,5,[88]]]))

console.log([1,2,3,5,[4,5,[555]]].join(','))

''.split