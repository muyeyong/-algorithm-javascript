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